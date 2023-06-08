import React from 'react';
import { useSelector } from 'react-redux';
import { selectDiagnosis } from '../../../store/reducers/diagnosis.reducer';
import DiagnosisItemComponent from '../DiagnosisItemComponent';

function DiagnosisListComponent() {
	const diagnosis = useSelector(selectDiagnosis);
	// divide diagnosis into array of two elements
	const diagnosisList =
		diagnosis &&
		diagnosis.reduce(function (result, value, index, array) {
			if (index % 2 === 0) result.push(array.slice(index, index + 2));
			return result;
		}, []);
	return (
		<div className="grid-x grid-margin-x">
			{diagnosisList &&
				diagnosisList.map((items, index) => {
					return (
						<DiagnosisItemComponent
							key={index}
							firstItem={items[0]}
							secondItem={items[1]}
						/>
					);
				})}
		</div>
	);
}

export default DiagnosisListComponent;
