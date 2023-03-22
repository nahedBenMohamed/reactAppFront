import moment from 'moment';
import { useState, createRef } from 'react';
import config from '../../../config';

const PDSSResultAudioComponent = ({ records,  handleShowDelete }) => {
	const [selectedAudio, setSelectedAudio] = useState({
		played: false,
		range: 0,
		id: ''
	});

	const handlePlay = element => event => {
		setSelectedAudio({
			played: !selectedAudio.played,
			range: element.audioRef.current.currentTime,
			id: element.id
		});
		element.audioRef.current.play();
	};

	const handlePause = element => event => {
		setSelectedAudio({ ...selectedAudio, played: !selectedAudio.played });
		element.audioRef.current.pause();
	};

	const handleChangeRange = element => event => {
		if (selectedAudio.id !== element.id)
			setSelectedAudio({
				id: element.id
			});
		element.audioRef.current.currentTime = event.target.value;
	};

	const handleTimeUpdate = element => event => {
		setSelectedAudio({ ...selectedAudio, range: element.audioRef.current.currentTime });
	};

	const handleEnded = () => {
		setSelectedAudio({ ...selectedAudio, played: !selectedAudio.played, range: 0 });
	};
	return records.map((element, v) => {
		let obj = { ...element };
		obj.audioRef = createRef();
		return (
			<li key={v}>
				<div className="grid-x">
					<div className="cell small-4">
						<p>{moment(obj.created).format('DD.MM.YYYY HH:mm')}</p>
						<audio
							ref={obj.audioRef}
							src={`${config.API_Config.BackEnd_ORIGIN}/${obj.filepath}${obj.filename}`}
							className="binded"
							onTimeUpdate={handleTimeUpdate(obj)}
							onEnded={handleEnded}
						></audio>
					</div>
					<div className="cell small-1">
						<a
							className={selectedAudio.played && selectedAudio.id !== obj.id ? 'play' : 'pause'}
							onClick={!selectedAudio.played ? handlePlay(obj) : handlePause(obj)}
						>
							<span
								className={`entypo entypo-${
									selectedAudio.played && selectedAudio.id === obj.id ? 'pause' : 'play'
								}`}
							></span>
						</a>
					</div>
					<div className="cell small-2">
						<p>{moment.utc(obj.duration_in_seconds * 1000).format('HH:mm:ss')}</p>
					</div>
					<div className="cell small-4">
						<input
							type="range"
							className="audio-slider"
							min="0"
							value={obj.id === selectedAudio.id ? selectedAudio.range : 0}
							step="0.01"
							onChange={handleChangeRange(obj)}
							max={obj.duration_in_seconds}
						/>
					</div>
					<div className="cell small-1">
						<a className="remove" onClick={handleShowDelete(obj)}>
							<span className="entypo-trash"></span>
						</a>
					</div>
				</div>
			</li>
		);
	});
};

export default PDSSResultAudioComponent;
