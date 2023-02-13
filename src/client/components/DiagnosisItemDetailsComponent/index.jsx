import React from 'react';
import { useSelector } from 'react-redux';
import { calculateAgePerMonth, getDistance, progressRing } from '../../../shared/helpers/properties';
import { selectChildDetails } from '../../../store/reducers/child.reducer';
import { t } from 'i18next';

import DiagnosisSessionListComponent from '../DiagnosisSessionListComponent';

import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';

function DiagnosisItemDetailsComponent({
	item,
	show,
	showPopup,
	setShowInfo,
	selectedChild,
	diagnosticSessions,
	GlobalSecuritiesSate,
	action_diagnosis_newSession
}) {
	const currentUser = useSelector(selectChildDetails);
	const showInfo = () => {
		setShowInfo({
			show: true,
			selectedItem: item.id
		});
	};
	const openTestPageViewInNewWindow = async (diagnostic, childId) => {
		action_diagnosis_newSession({
			diagnosticId: '' + diagnostic?.id,
			diagnosticTitle: diagnostic.title,
			childId: childId,
			userId: '' + GlobalSecuritiesSate?.userId
		});
	};

	let percent = Math.round((item.durationInMin / 60) * 100) || 0;
	const { strokeDasharray, strokeDashoffset } = progressRing(percent, 10);
	return (
		<div className={`cell expand ${show ? 'show' : ''}`} data-ref={'currentRow'}>
			<div className={`container distance-${getDistance(item.id)}`}>
				<div className="scroll">
					<div className="grid-x">
						<div className="cell medium-6">
							{calculateAgePerMonth(currentUser?.birthdate) < item.ageMin ||
							calculateAgePerMonth(currentUser?.birthdate) > item.ageMax ? (
								<div className="callout warning">{t('diagnosis_details_out_side_the_age')}</div>
							) : (
								<>
									<a
										className="button start-test"
										onClick={() => openTestPageViewInNewWindow(item, selectedChild)}
									>
										<span className="entypo-video"></span> {t('diagnosis_details_start_new_test')}
									</a>
								</>
							)}
						</div>
						<div className="cell medium-6 text-right">
							<a className="button outline open-info" onClick={showInfo}>
								<span className="entypo-info-circled"></span> {t('diagnosis_details_information')}
							</a>
						</div>
						<div className="cell text-right">
							<div className="duration">
								<span className="text">
									<span className="label">{t('diagnosis_details_duration_env')}</span>
									<span className="time">
										{item.durationInMin} {t('diagnosis_details_minutes')}
									</span>
								</span>
								<span className="progress-ring">
									<svg>
										<circle
											r="10"
											cx="20"
											cy="20"
											strokeDasharray={strokeDasharray}
											strokeDashoffset={strokeDashoffset}
										/>
									</svg>
								</span>
							</div>
						</div>
						<div className="cell">
							<p>
								<strong>{t('diagnosis_details_final_tests')}</strong>
							</p>
							<DiagnosisSessionListComponent
								t={t}
								openTestPageViewInNewWindow={openTestPageViewInNewWindow}
								showPopup={showPopup}
								diagnosticSessions={diagnosticSessions.filter(session => session.diagnostic == item.id)}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WithReduxConnector(DiagnosisItemDetailsComponent, state => ({
	GlobalSecuritiesSate: state.GlobalSecuritiesSate
}));
