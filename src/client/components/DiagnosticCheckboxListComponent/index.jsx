import React from 'react';
import PdssCheckBoxListComponent from '../../components/PdssCheckBoxListComponent';
import { useState } from 'react';
import { useEffect } from 'react';
import PdssOptionCheckBoxComponent from '../../components/PdssOptionCheckBoxComponent';

export default function DiagnosticCheckboxListComponent({ t, classDesignation, analysesList, selectedChild }) {
	const [checked, setChecked] = useState({});
	const handleChange = (target, value) => {
		setChecked(prev => ({
			...prev,
			[target]: value
		}));
	};

	const allUnchecked = Object.values(checked).every(value => value === true);
	const isOnechecked = Object.values(checked).some(value => value === true);
	let indexSubTest = analysesList ? analysesList.indexOf(analysesList[0]) + 1 : 0;
	const testEnded = element =>
		element.tvalue || (element.has_sublabel == 'yes' && analysesList[indexSubTest].tvalue != null);
	let isOneTestEnded = analysesList && analysesList.some(testEnded) === true ? true : false;
	let countChecked = 0;

	useEffect(() => {
		setChecked({});
	}, [selectedChild]);
	let exportStatus = false;
	return (
		<div>
			<ul className={classDesignation}>
				{analysesList &&
					analysesList.map((item, index) => {
						if (item.type === 'label') {
							let checkBoxStatus =
								item.tvalue || (item.has_sublabel == 'yes' && analysesList[index + 1].tvalue)
									? true
									: false;

							if (checkBoxStatus == true) {
								countChecked++;
							}
							let checkBoxId = 'diagnostic_' + item.diagnostic;
							return (
								<PdssCheckBoxListComponent
									key={index + selectedChild}
									id={checkBoxId}
									label={checkBoxId}
									status={checkBoxStatus}
									name={item.name}
									selectedChild={selectedChild}
									checked={
										Object.keys(checked).includes(checkBoxId) ? checked[checkBoxId] : checkBoxStatus
									}
									handleChange={handleChange}
								/>
							);
						}
					})}
			</ul>
			{
				(exportStatus =
					Object.keys(checked).length == 0
						? !isOneTestEnded
						: !isOnechecked && allUnchecked == false && Object.keys(checked).length == countChecked)
			}
			{!exportStatus ? (
				<>
					<p>{t('label_options')}</p>
					<ul className="export-select options">
						<PdssOptionCheckBoxComponent
							defaultValue={'yes'}
							id={'option_export_detail'}
							label={'option_export_detail'}
							name={t('label_export_option_detail')}
						/>
					</ul>
				</>
			) : null}

			<a href="test.pdf" disabled={exportStatus} className="button export-pdf" target="_blank">
				{t('btn_export')}{' '}
			</a>
		</div>
	);
}
