import TestImageComponent from '../TestImageComponent';
import TestAsideComponent from '../TestAsideComponent';
import TestResultComponent from '../TestResultComponent';
import FullScreenLoaderContainer from '../../containers/FullScreenLoaderContainer';
import TherapistTestFooterComponent from '../TherapistTestFooterComponent';
import useTestComponent from './useTestComponent';
import { Fragment } from 'react';
import OnKeyPressComponent from '../KeyPressComponent';

const TherapistTestComponent = props => {
	const { data, DataPointer, session, hideInEvaluation } = props;
	const {
		diagnostic,
		skipToTheNextPage,
		childSelectedImage,
		updateCurrentSession,
		skipToThePreviousPage,
		compareToGetAnswerStatus,
		storeFinalResultAnswerAndNotes,
		storeResultAnswerPhonetic
	} = useTestComponent(props);

	if (data?.length == 0) return <FullScreenLoaderContainer />;

	return (
		<Fragment>
			<OnKeyPressComponent next={skipToTheNextPage} previous={skipToThePreviousPage}>
				{!hideInEvaluation && (
					<TestImageComponent
						{...props}
						selectAnswer={an => compareToGetAnswerStatus(an)}
						questionData={data[DataPointer]}
						childSelectedImage={childSelectedImage}
					/>
				)}
				<div className="resultshow">
					{hideInEvaluation ? (
						<div className="grid-x">
							<div className="cell small-3">
								<aside>
									<TestImageComponent
										{...props}
										selectAnswer={an => compareToGetAnswerStatus(an)}
										questionData={data[DataPointer]}
										childSelectedImage={childSelectedImage}
									/>
									<TestAsideComponent questionData={data[DataPointer]} {...props} />
								</aside>
							</div>

							<div className="cell small-9">
								<TestResultComponent
									{...props}
									diagnosticId={diagnostic?.id}
									hideInEvaluation={hideInEvaluation}
									storeSyllableData={answer => storeResultAnswerPhonetic({ answer: answer })}
									storeCurrentSlideNote={e =>
										data[DataPointer] != e.target.value &&
										storeFinalResultAnswerAndNotes({
											result: { notes: e.target.value }
										})
									}
									questionData={data[DataPointer]}
									selectAnswer={answer =>
										data[DataPointer]?.selected_answer != answer &&
										storeFinalResultAnswerAndNotes({ result: { answer } })
									}
									selectExtendedAnswer={event => storeFinalResultAnswerAndNotes({ extended: event })}
								/>
							</div>
						</div>
					) : (
						<div className="orbit">
							<div className="orbit-wrapper">
								<ul className="orbit-container">
									<li
										className={` is-active orbit-slide ${
											data[DataPointer]?.selected_answer
												? data[DataPointer]?.selected_answer == 'correct'
													? 'answered correct'
													: 'answered incorrect'
												: ''
										}`}
									>
										<div className="grid-x">
											<div className="cell small-4">
												<aside>
													{hideInEvaluation && (
														<TestImageComponent
															{...props}
															selectAnswer={an => compareToGetAnswerStatus(an)}
															questionData={data[DataPointer]}
															childSelectedImage={childSelectedImage}
														/>
													)}
													<TestAsideComponent questionData={data[DataPointer]} {...props} />
												</aside>
											</div>

											<div className="cell small-8">
												<TestResultComponent
													{...props}
													diagnosticId={diagnostic?.id}
													hideInEvaluation={hideInEvaluation}
													storeSyllableData={answer =>
														storeResultAnswerPhonetic({ answer: answer })
													}
													storeCurrentSlideNote={e =>
														data[DataPointer] != e.target.value &&
														storeFinalResultAnswerAndNotes({
															result: { notes: e.target.value }
														})
													}
													questionData={data[DataPointer]}
													selectAnswer={answer =>
														data[DataPointer]?.selected_answer != answer &&
														storeFinalResultAnswerAndNotes({ result: { answer } })
													}
													selectExtendedAnswer={event =>
														storeFinalResultAnswerAndNotes({ extended: event })
													}
													selectExtrasQuestionsAnswer={event =>
														storeFinalResultAnswerAndNotes({ extraContent: event })
													}
													selectClassificationAdditionalOptionAnswer={event =>
														storeFinalResultAnswerAndNotes({ additionalContent: event })
													}
												/>
											</div>
										</div>
									</li>
								</ul>
								<TherapistTestFooterComponent
									{...props}
									currentSlide={DataPointer}
									skipToTheNextPage={skipToTheNextPage}
									updateCurrentSession={updateCurrentSession}
									sessionPaused={session?.status === 'paused'}
									skipToThePreviousPage={skipToThePreviousPage}
									trainingSession={session?.started === 'training'}
									sessionFinished={Math.trunc(session?.process_percent) == 100}
								/>
							</div>
						</div>
					)}
				</div>
			</OnKeyPressComponent>
		</Fragment>
	);
};

export default TherapistTestComponent;
