import moment from 'moment';
import { useEffect, useRef, useState } from 'react';
import { useTimer } from '../../../shared/helpers/hooks/Timer';
import PDSSResultAudioComponent from '../PDSSResultAudioComponent';
import { bindActionCreators } from '@reduxjs/toolkit';
import * as Actions from '../../../store/actions';
import { connect, useSelector } from 'react-redux';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import { selectRecords } from '../../../store/reducers/record.reducer';
const PDSSAudioComponent = props => {
	const {action_record_create, action_record_getAllBySession, t , session } = props;

	const { seconds, start, stop } = useTimer();
	const [url, setUrl] = useState('');
	const [play, setPlay] = useState(false);
	const recorder = useRef(null);
	const records = useSelector(selectRecords);
	useEffect(() => {
		action_record_getAllBySession(session);
	}, []);
	const getAudio = async () => {
		try {
			let stream = await navigator.mediaDevices.getUserMedia({ audio: true });
			recorder.current = new MediaRecorder(stream);
			start();
			recorder.current.start();
			setPlay(!play);
		} catch (e) {
			console.log('error getting stream', e);
		}
	};

	const stopRecorder = async () => {
		if (play) {
			let chunks = [];
			let blob;
			recorder.current.ondataavailable = e => {
				let formData = new FormData();
				chunks.push(e.data);
				if (recorder.current.state === 'inactive') {
					blob = new Blob(chunks, { type: 'audio/webm' });
					let testAudioRecord = URL.createObjectURL(blob);
					setUrl(testAudioRecord);
					formData.append('session', session);
					formData.append('diagnostic_content', blob.size);
					formData.append('duration_in_seconds', seconds);
					formData.append('record', blob);
					action_record_create(formData).then(()=>action_record_getAllBySession(session))
					
				}
			};
			stop();
			recorder.current.stop();
			setPlay(!play);
		}
	};
	return (
		<div className="quick">
			<div
				className={`audio ${play && 'recording'}`}
				data-seconds-since-record-started="0"
			>
				<div className="grid-x grid-margin-x">
					<div className="cell small-7">
						<p className="label">
							{t('diagnosis_session_record_audio_label')}
						</p>
					</div>
					<div className="cell small-5 text-right">
						<p className="duration">
							{moment
								.utc(seconds * 1000)
								.format('HH:mm:ss')}
						</p>
						<a
							className="record"
							title={t('diagnosis_session_record_start_btn_label')}
							onClick={
								!play ? getAudio : stopRecorder
							}
						>
							<span className="entypo-mic"></span>
						</a>
					</div>
					<div className="cell">
						<div className="records">
							<ul>
								{records && (
									<PDSSResultAudioComponent
										url={url}
										records={records}
										session={session}
										{...props}
									/>
								)}
								{play && (
									<li>{t('diagnosis_session_new_record_started')}</li>
								)}
							</ul>
						</div>
					</div>
					<div className="cell">
						<div className="callout alert">
							<p>
								{t('diagnosis_session_record_delete_info')}

							</p>
						</div>
					</div>
				</div>
			</div>
		</div>

	);
};

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}
const mapStateToProps = state => ({
	recordState: state.GlobalRecordsState
});
export default connect(mapStateToProps, mapDispatchToProps)(WithRouter(PDSSAudioComponent));
