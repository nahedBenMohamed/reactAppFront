import { createRef, useEffect, useState } from 'react';
import PDSSAudioComponent from '../PdssAudioComponent';
import useExtendedDIagnostic from './useExtendedDIagnostic';

const TestResultComponent = ({ questionData, t, storeCurrentSlideNote, selectAnswer, diagnosticId, session }) => {
	const { selected_answer, currentSlide_note } = questionData;
	const noteRef = createRef();
	const { ShowExtendedQuestions, MapDataToExtendedQuestionView } = useExtendedDIagnostic({
		questionData,
		diagnosticId,
		t
	});
	const [tooltip, setToolTip] = useState(false);

	const handleHover = () => {
		setToolTip(!tooltip);
	};

	useEffect(() => {
		if (questionData.hide_notes == 'no') noteRef.current.value = currentSlide_note;
	}, [questionData, currentSlide_note]);

	return (
		<div className="results">
			<div className="container">
				<div className="quick">
					{questionData.diagnostic !== 5 && questionData.diagnostic !== 10 && (
						<h3>
							<span
								className="test-tooltip has-tip"
								data-tooltip
								onMouseEnter={handleHover}
								onMouseLeave={handleHover}
							>
								{t('diagnosis_session_test_label_assistance')}
								{tooltip && (
									<div
										className="tooltip bottom align-left"
										style={{ width: '21rem', maxWidth: '21rem', top: '40px' }}
									>
										{t('diagnosis_session_test_description_results')}
									</div>
								)}
							</span>
						</h3>
					)}

					{questionData.hide_quick_result == 'no' && (
						<div className="grid-x grid-margin-x">
							<div className="cell small-6">
								<a
									onClick={() => selectAnswer('correct')}
									className={`button correct ${selected_answer === 'correct' && 'selected'}`}
									title="{{ attribute(langs, cookie.lang).test.title_btn_correct }}"
								>
									<span className="entypo-check"></span>
									{t('diagnostic_test_mode_therapist_btn_correct')}
								</a>
							</div>

							<div className="cell small-6">
								<a
									onClick={() => selectAnswer('incorrect')}
									className={`button incorrect ${selected_answer === 'incorrect' && 'selected'}`}
									title="{{ attribute(langs, cookie.lang).test.title_btn_incorrect }}"
								>
									<span className="entypo-cancel"></span>
									{t('diagnostic_test_mode_therapist_btn_incorrect')}
								</a>
							</div>
						</div>
					)}

					{questionData.hide_notes == 'no' && (
						<div className="notes">
							<div className="cell">
								<textarea
									ref={noteRef}
									onBlur={storeCurrentSlideNote}
									placeholder={t('diagnostic_test_mode_therapist_placeholder_notes')}
									defaultValue={currentSlide_note}
								/>

								<div className="speech_recognition">
									<span className="entypo entypo-mic"></span>
								</div>
							</div>
						</div>
					)}

					{questionData.hide_audio == 'no' && <PDSSAudioComponent session={session.session} />}
				</div>
				<ShowExtendedQuestions hide={selected_answer === 'correct'}>
					{questionData?.question_ids?.split(',').map((QID, QID_index) => (
						<MapDataToExtendedQuestionView
							data={QID}
							dataType={questionData?.question_types.split(',')[QID_index]}
							content={questionData}
						/>
					))}
				</ShowExtendedQuestions>
			</div>
		</div>
	);
};

export default TestResultComponent;
