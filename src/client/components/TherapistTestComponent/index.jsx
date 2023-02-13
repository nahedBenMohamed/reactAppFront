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
		storeFinalResultAnswerAndNotes
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
					<div className="orbit">
						<div className="orbit-wrapper">
							<ul className="orbit-container">
								<li
									className={` is-active ${
										data[DataPointer]?.selected_answer
											? data[DataPointer]?.selected_answer == 'correct'
												? 'answered correct'
												: 'answered incorrect'
											: ''
									} ${hideInEvaluation ? '' : 'orbit-slide'}`}
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
												storeCurrentSlideNote={e =>
													storeFinalResultAnswerAndNotes({ notes: e.target.value })
												}
												selectAnswer={answer =>
													storeFinalResultAnswerAndNotes({ answer: answer })
												}
												questionData={data[DataPointer]}
											/>
										</div>
									</div>
								</li>
							</ul>
							{!hideInEvaluation && (
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
							)}
						</div>
					</div>
				</div>
			</OnKeyPressComponent>
		</Fragment>
	);
};

export default TherapistTestComponent;
