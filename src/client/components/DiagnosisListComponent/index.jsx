import React from 'react';
import DiagnosisItemComponent from '../DiagnosisItemComponent';

function DiagnosisListComponent({ diagnosis, selectedChild, setShowInfo, diagnosticSessions, showPopup }) {
	// divide diagnosis into array of two elements
	diagnosis = diagnosis.reduce(function (result, value, index, array) {
		if (index % 2 === 0) result.push(array.slice(index, index + 2));
		return result;
	}, []);
	return (
		<div className="grid-x grid-margin-x">
			{diagnosis &&
				diagnosis.map((items, index) => {
					return (
						<DiagnosisItemComponent
							key={index}
							firstItem={items[0]}
							secondItem={items[1]}
							selectedChild={selectedChild}
							setShowInfo={setShowInfo}
							diagnosticSessions={diagnosticSessions}
							showPopup={showPopup}
						/>
					);
				})}
		</div>
	);
}

export default DiagnosisListComponent;
