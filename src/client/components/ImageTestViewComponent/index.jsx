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
		case 6:
		case 7:
		case 9:
			return (
				<div className="grid-y align-center">
					<div className="cell small-10">
						<img src={`/${questionData?.image}`} alt="" />
					</div>
				</div>
			);
		default:
			return <div />;
	}
}
export default ImageTestViewComponent;
