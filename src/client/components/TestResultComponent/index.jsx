/* eslint-disable  */
import { createRef, useEffect, useState } from 'react';
import PDSSAudioComponent from '../PdssAudioComponent';
import useExtendedDIagnostic from './useExtendedDIagnostic';

const TestResultComponent = ({
	questionData,
	t,
	storeCurrentSlideNote,
	diagnosticId,
	session,
	hideInEvaluation,
	selectExtendedAnswer,
	selectClassificationAdditionalOptionAnswer,
	selectExtrasQuestionsAnswer,
	selectAnswer
}) => {
	const { selected_answer, currentSlide_note } = questionData;
	const noteRef = createRef();
	const { ShowExtendedQuestions, MapDataToExtendedQuestionView, MapTheExtraQuestionWithNeededViewPortal } =
		useExtendedDIagnostic({
			questionData,
			diagnosticId,
			t,
			session,
			hideInEvaluation,
			selectClassificationAdditionalOptionAnswer,
			selectExtrasQuestionsAnswer,
			selectExtendedAnswer
		});
	const [tooltip, setToolTip] = useState(false);

	const handleHover = () => {
		setToolTip(!tooltip);
	};
	useEffect(() => {
		if (questionData.hide_notes == 'no') noteRef.current.value = currentSlide_note;
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionData, currentSlide_note]);
	
	const handleHideRender = () => {
		let shouldHide = false;
		if (selected_answer === 'correct') {
			shouldHide = true;
		} else if (questionData?.hide_in_tests) {
			if (!hideInEvaluation && !questionData?.hide_in_tests?.includes('no')) {
				shouldHide = true;
			}
		} else if (!hideInEvaluation && questionData?.hide_in_tests === null) {
			shouldHide = true;
		} else {
			shouldHide = false;
		}
		return shouldHide
	};
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
								{t('diagnosis_session_test_subheadline_results')}
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
									title={t('true_button')}
								>
									<span className="entypo-check"></span>
									{t('diagnostic_test_mode_therapist_btn_correct')}
								</a>
							</div>

							<div className="cell small-6">
								<a
									onClick={() => selectAnswer('incorrect')}
									className={`button incorrect ${selected_answer === 'incorrect' && 'selected'}`}
									title={t('false_button')}
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

					{questionData.hide_audio == 'no' && (
						<PDSSAudioComponent
							session={session}
							selectAnswer={selectAnswer}
							slideAlreadyAnswered={diagnosticId == 2 || selected_answer === 'incorrect'}
							questionData={questionData}
							hideInEvaluation={hideInEvaluation}
						/>
					)}
				</div>

				<ShowExtendedQuestions
					hide={
						handleHideRender()
					}
				>
					{questionData?.question_ids?.split(',').map((QID, QID_index) => (
						<MapDataToExtendedQuestionView
							data={QID}
							defaultAnswers={
								typeof questionData.extendedResult === 'string'
									? JSON.parse(questionData.extendedResult)
									: questionData.extendedResult
							}
							answer_id={questionData?.answer_ids.split(',')?.[QID_index]}
							dataType={questionData?.question_types.split(',')[QID_index]}
							content={questionData}
							session={session}
							display={
								hideInEvaluation ? true : questionData?.hide_in_tests?.split(',')[QID_index] === 'no'
							}
							key={QID}
						/>
					))}

					<MapTheExtraQuestionWithNeededViewPortal
						extraContent={
							questionData.diagnostic == 5 ||
							questionData.diagnostic === 10 ||
							questionData.diagnostic === 9
								? questionData?.extraContent?.slice().sort((a, b) => a.question_id - b.question_id)
								: []
						}
					/>
				</ShowExtendedQuestions>
			</div>
		</div>
	);
};

export default TestResultComponent;
