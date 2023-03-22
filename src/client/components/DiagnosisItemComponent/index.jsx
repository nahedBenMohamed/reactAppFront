import React, { useState } from 'react';
import { getDistance } from '../../../shared/helpers/properties';
import DiagnosisItemDetailsComponent from '../DiagnosisItemDetailsComponent';

function DiagnosisItemComponent({ firstItem, secondItem, setShowInfo, showPopup, selectedChild, diagnosticSessions }) {
	const [itemOptions, setItemOptions] = useState({
		show: false,
		selectedItem: ''
	});
	const handleClick = item => e => {
		e.stopPropagation();
		setItemOptions({
			show: itemOptions.selectedItem.id === item.id ? !itemOptions.show: true,
			selectedItem: item
		});
	};
	return (
		<>
			<div className="cell medium-6">
				<a
					className={`diagnostic-button ${getDistance(firstItem.id)}`}
					data-id={firstItem.id}
					onClick={handleClick(firstItem)}
				>
					<p className="title">{firstItem.title}</p>
					<p className="subtitle">{firstItem.subTitle}</p>
				</a>
			</div>
			<div className="cell medium-6">
				<a
					className={`diagnostic-button ${getDistance(secondItem.id)}`}
					data-id={secondItem.id}
					onClick={handleClick(secondItem)}
				>
					<p className="title">{secondItem.title}</p>
					<p className="subtitle">{secondItem.subTitle}</p>
				</a>
			</div>
			<DiagnosisItemDetailsComponent
				selectedChild={selectedChild}
				item={itemOptions.selectedItem}
				show={itemOptions.show}
				setShowInfo={setShowInfo}
				diagnosticSessions={diagnosticSessions}
				showPopup={showPopup}
			/>
		</>
	);
}

export default DiagnosisItemComponent;
