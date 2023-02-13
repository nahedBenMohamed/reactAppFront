import React from 'react';
import DiagnosisSessionItemComponent from '../DiagnosisSessionItemComponent';
import DiagnosisSessionTabsComponent from '../DiagnosisSessionTabsComponent';

function DiagnosisSessionListComponent(props) {
	const {
		t,
		diagnosticSessions,
		openTestPageViewInNewWindow,
		searchValue,
		showPopup,
		inProfile,
		hideOption,
		handleSelectSession,
		selectedSession,
		handleShowSession,
		activeSession,
		diagnosticContents,
		handleClickTab,
		tabSelected,
		analysesResult,
		loader
	} = props;

	return (
		<>
			<ul>
				<li className="headline ">
					{inProfile ? (
						<p className="in-profile">{t('label_in_profile')}</p>
					) : (
						<p className="title">{t('diagnosis_details_title')}</p>
					)}
					<p className="datetime">{t('diagnosis_details_date_time')}</p>
					<p className="duration">{t('diagnosis_details_duration')}</p>
					<p className="status">{t('diagnosis_details_status')}</p>
					<p className="bar">{t('diagnosis_details_bar')}</p>
					{!hideOption ? <p className="options text-right">{t('diagnosis_details_option')}</p> : null}
				</li>

				{diagnosticSessions && diagnosticSessions.length > 0 ? (
					diagnosticSessions.map((diagnosisSession, index) => {
						let useInProfile = diagnosisSession.use_in_profile === 'yes' ? diagnosisSession.session : null;
						return (
							<DiagnosisSessionItemComponent
								openTestPageViewInNewWindow={openTestPageViewInNewWindow}
								key={index}
								searchValue={searchValue}
								diagnosisSession={diagnosisSession}
								t={t}
								showPopup={showPopup}
								hideOption={hideOption}
								inProfile={inProfile}
								handleSelectSession={handleSelectSession}
								handleShowSession={handleShowSession}
								activeSession={activeSession}
								selectedSession={selectedSession === '' ? useInProfile : selectedSession}
							/>
						);
					})
				) : (
					<li>
						<p>{t('diagnosis_Expand_label_no_tests')}</p>
					</li>
				)}
			</ul>
			{activeSession?.session && (
				<DiagnosisSessionTabsComponent
					diagnosticContents={diagnosticContents}
					diagnosisSession={activeSession}
					t={t}
					handleClickTab={handleClickTab}
					tabSelected={tabSelected}
					analysesResult={analysesResult}
					loader={loader}
				/>
			)}
		</>
	);
}

export default DiagnosisSessionListComponent;
