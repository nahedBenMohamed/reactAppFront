import { useEffect, useState } from 'react';
import ImageTestViewComponent from '../ImageTestViewComponent';

const TestImageComponent = ({
	questionData,
	selectAnswer,
	diagnosticId,
	MainDivContentReference,
	childSelectedImage,
	childMode,
	hideInEvaluation
}) => {
	const [answer, setAnswer] = useState({ id: '', clicked: false });
	const handleImageTestItemClick = item => {
		selectAnswer(item);
		setAnswer({
			id: item,
			clicked: true
		});
	};

	useEffect(() => {
		if (!childMode) {
			if (childSelectedImage?.current) {
				setAnswer({
					id: childSelectedImage?.current,
					clicked: true
				});
				childSelectedImage.current = null;
			}
		}
	}, [childSelectedImage?.current]);

	return (
		<div className={hideInEvaluation ? 'image' : 'testshow'}>
			<div className="slides-container">
				<div className="orbit" role="region" aria-label="Kindansicht">
					<div className="orbit-wrapper">
						<ul className="orbit-container">
							<li className={'is-active ' + (hideInEvaluation ? '' : 'orbit-slide')}>
								<div className="grid-x align-center align-middle">
									<ImageTestViewComponent
										questionData={questionData}
										handleImageTestItemClick={handleImageTestItemClick}
										selectDirectlyFinalAnswer={selectAnswer}
										diagnosticId={diagnosticId}
										answer={answer}
										childMode={childMode}
										hideInEvaluation={hideInEvaluation}
									/>
								</div>
							</li>
						</ul>
					</div>
					{!hideInEvaluation && (
						<a
							className="btn-fullscreen"
							onClick={() =>
								MainDivContentReference.current.classList.value.includes('fullscreen')
									? MainDivContentReference.current.classList.remove('fullscreen')
									: MainDivContentReference.current.classList.add('fullscreen')
							}
						>
							<span className="entypo-resize-full"></span>
						</a>
					)}
				</div>
			</div>
		</div>
	);
};

export default TestImageComponent;
