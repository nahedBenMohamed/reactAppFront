import React from 'react';
import DiagnosisSessionListComponent from '../../components/DiagnosisSessionListComponent';
import PdssWarningMessageComponent from '../../components/PdssWarningMessageComponent';

function ResultEvaluationPage({
	diagnosticSessions,
	t,
	handleSelectSession,
	selectedSession,
	handleShowSession,
	activeSession,
	diagnosticContents,
	handleClickTab,
	tabSelected,
	analysesResult,
	loader
}) {
	if (diagnosticSessions && diagnosticSessions.length > 0)
		return (
			<div className="tests">
				<h3>{t('label_test_session')}</h3>
				<div className="scroll">
					<DiagnosisSessionListComponent
						t={t}
						diagnosticSessions={diagnosticSessions}
						hideOption={true}
						inProfile={true}
						handleSelectSession={handleSelectSession}
						selectedSession={selectedSession}
						handleShowSession={handleShowSession}
						activeSession={activeSession}
						diagnosticContents={diagnosticContents}
						handleClickTab={handleClickTab}
						tabSelected={tabSelected}
						analysesResult={analysesResult}
						loader={loader}
					/>
				</div>
			</div>
		);
	else return <PdssWarningMessageComponent message={t('evaluation_callout_no_results')} />;
}

export default ResultEvaluationPage;
