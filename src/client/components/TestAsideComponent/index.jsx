import { createRef, useState } from 'react';
import useTestAsideComponent from './useTestAsideComponent';

const TestAsideComponent = props => {
	const { questionData, t, hideInEvaluation } = props;
	const { target_item, instruction, instruction_audio } = questionData;
	const { TargetItem } = useTestAsideComponent(props);

	const [tooltip, setToolTip] = useState(false);

	const handleHover = () => {
		setToolTip(!tooltip);
	};

	const slideUp = e => {
		if (e.target.parentNode.classList.value.includes('full')) {
			e.target.parentNode.classList.remove('full');
			e.target.childNodes[0].className = 'entypo-up-open';
		} else {
			e.target.parentNode.classList.add('full');
			e.target.childNodes[0].className = 'entypo-down-open';
		}
	};
	const audioRef = createRef();
	return (
		<>
			{!hideInEvaluation && (
				<a onClick={slideUp} className="slide-up">
					<span
						className="entypo-up-open"
						onClick={e => {
							e.stopPropagation();
						}}
					></span>
				</a>
			)}

			<label>
				{t('diagnostic_test_mode_therapist_label_instruction')}
				{!hideInEvaluation && (
					<span
						onClick={() => audioRef?.current?.play()}
						className="entypo-sound audio-output"
						title={t('diagnosis_session_test_title_btn_audio')}
					></span>
				)}
			</label>
			{!hideInEvaluation && <audio ref={audioRef} src={'/' + instruction_audio}></audio>}

			<p dangerouslySetInnerHTML={{ __html: instruction }} />
			{hideInEvaluation && <br />}
			{questionData.target_item && <label>{t('diagnosis_session_test_label_answer')}</label>}

			<TargetItem questionData={questionData} />
			{questionData.assistance && (
				<label>
					<span
						class="test-tooltip has-tip"
						onMouseEnter={handleHover}
						style={{ top: 'calc(100% + -5.3505rem)' }}
						onMouseLeave={handleHover}
					>
						{t('diagnosis_session_test_label_assistance')}
						{tooltip && (
							<div
								className="tooltip top  align-left"
								style={{ width: '21rem', maxWidth: '20rem', fontWeight: '700' }}
							>
								{questionData.assistance.replace({ '%" %': '"' })}
							</div>
						)}
					</span>
				</label>
			)}
		</>
	);
};

export default TestAsideComponent;
