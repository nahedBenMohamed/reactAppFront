import moment from 'moment';
import React from 'react';
import reactStringReplace from 'react-string-replace';

import routes from '../../../config/routes';
import { CryptoProviders, getItemsFromCookies } from '../../../shared/helpers/properties';
import NavItemComponent from '../NavItemComponent';

function DiagnosisSessionItemComponent(props) {
	const {
		t,
		diagnosisSession,
		handleShowSession,
		activeSession,
		searchValue,
		showPopup,
		inProfile,
		hideOption,
		handleSelectSession,
		selectedSession
	} = props;
	// here Add handle show popup
	const handleShowPopup = e => {
		e.preventDefault();
		showPopup(diagnosisSession.session);
	};

	const resumeSession = () => {
		window.open(
			`${routes.test_pages.navigationPath}?id=${diagnosisSession.diagnostic}&child=${
				diagnosisSession.child
			}&token=${CryptoProviders(
				JSON.stringify({
					child: diagnosisSession.child,
					diagnosticId: diagnosisSession.diagnostic,
					diagnosisTitle: diagnosisSession.title,
					CFToken: getItemsFromCookies('token')
				})
			).hashIt()}&session=${diagnosisSession.session}`,
			'_blank',
			'toolbar=0,location=0,menubar=0'
		);
	};

	return (
		<li
			key={diagnosisSession.id}
			data-ref={diagnosisSession.diagnostic}
			data-session={diagnosisSession.session}
			className={
				inProfile && diagnosisSession.status !== 'finished'
					? 'not-selectable'
					: activeSession?.session === diagnosisSession.session
					? 'active'
					: inProfile
					? 'highlighted'
					: ''
			}
			onClick={e => (diagnosisSession.status === 'finished' ? handleShowSession(e, diagnosisSession) : null)}
		>
			{inProfile ? (
				<p
					className="in-profile"
					onClick={e => {
						diagnosisSession.status === 'finished' && handleSelectSession(e, diagnosisSession.session);
					}}
				>
					<span
						className={'checkmark' + (selectedSession === diagnosisSession.session ? ' checked' : '')}
					></span>
				</p>
			) : searchValue ? (
				<p className="title">
					{reactStringReplace(diagnosisSession.title, searchValue, (match, i) => (
						<span className="highlight">{searchValue}</span>
					))}
				</p>
			) : (
				<p className="title">{diagnosisSession.title}</p>
			)}
			<p className="datetime">{moment(diagnosisSession.date_initialized).format('DD.MM.YYYY HH:mm')}</p>
			<p className="duration">{moment.utc(diagnosisSession.seconds_since_start * 1000).format('HH:mm:ss')}</p>
			<p className="status">
				{t(`diagnosis_Expand_status_${diagnosisSession.status}`)}{' '}
				{diagnosisSession.started === 'training' ? ' (Training)' : null}
			</p>
			<p className="process">
				<span className="percent">{diagnosisSession.process_percent}%</span>
				<span className="bg">
					<span className="bar" style={{ width: `${diagnosisSession.process_percent}%` }}></span>
				</span>
			</p>
			{!hideOption ? (
				<p className="options text-right">
					<NavItemComponent className="resume-test" icon="video" action={resumeSession} />
					<NavItemComponent className="remove-test" icon="trash" action={handleShowPopup} />
				</p>
			) : null}
		</li>
	);
}

export default DiagnosisSessionItemComponent;
