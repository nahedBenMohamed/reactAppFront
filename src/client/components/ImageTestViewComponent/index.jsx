import React from 'react';

function ImageTestViewComponent({
	diagnosticId,
	questionData,
	selectDirectlyFinalAnswer,
	answer,
	childMode,
	handleImageTestItemClick,
	hideInEvaluation
}) {
	switch (diagnosticId) {
		case 1:
		case 4:
			return (
				<div className="grid-x align-center align-middle">
					{questionData?.image?.split(',').map(item => {
						return (
							<div
								className="cell small-3 image-padding image-select"
								style={{ cursor: 'pointer' }}
								onClick={() => !hideInEvaluation && handleImageTestItemClick(item)}
								key={item}
							>
								<img
									src={`/${item}`}
									style={answer.clicked && answer.id === item ? { transform: `scale(1.1)` } : {}}
									alt=""
								/>
							</div>
						);
					})}
				</div>
			);
		case 2:
			return (
				<div className="grid-y align-center">
					<div className="cell small-10">
						<img src={`/${questionData?.image}`} alt="" />
					</div>
				</div>
			);
		case 3:
			return (
				<div className="grid-y align-center">
					<div className="cell small-10">
						<img src={`/${questionData?.image}`} alt="" />
					</div>

					{childMode && (
						<div className="cell small-2">
							<a
								class="button button-select correct"
								onClick={() =>
									selectDirectlyFinalAnswer(
										questionData.target_item == 'Ja' ? 'correct' : 'incorrect'
									)
								}
							>
								<span className="entypo-check"></span>
							</a>
							<a
								class="button button-select incorrect"
								onClick={() =>
									selectDirectlyFinalAnswer(
										questionData.target_item == 'Nein' ? 'correct' : 'incorrect'
									)
								}
							>
								<span className="entypo-cancel"></span>
							</a>
						</div>
					)}
				</div>
			);
		case 10:
			return (
				<div className="cell medium-6">
					<div className="grid-x">
						{questionData?.image?.length > 0 &&
							questionData?.image?.split(',')?.map(imgSrc => (
								<div className="cell small-6 image-padding">
									<img src={`/${imgSrc}`} alt="" />
								</div>
							))}
					</div>
				</div>
			);

		default:
			return (
				<div className="grid-y align-center">
					<div className="cell small-10">
						<img src={`/${questionData?.image}`} alt="" />
					</div>
				</div>
			);
	}
}
export default ImageTestViewComponent;
