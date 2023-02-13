import React from 'react';
import AnalysesProfileComponent from '../../components/AnalysesProfileComponent';

import PdssWarningMessageComponent from '../../components/PdssWarningMessageComponent';
import ExportEvaluationPage from '../../pages/EvaluationPage/ExportEvaluationPage';
import ResultEvaluationPage from '../../pages/EvaluationPage/ResultEvaluationPage';

function EvaluationBodyContainer({
	t,
	export_page,
	handleSelectSession,
	analysesList,
	diagnosticSessions,
	selectedChild,
	result_page,
	selectedSession,
	handleShowSession,
	activeSession,
	diagnosticContents,
	handleClickTab,
	tabSelected,
	analysesResult,
	loader
}) {
	return (
		<div className={'cell medium-8 '}>
			{selectedChild === '' ? (
				<PdssWarningMessageComponent message={t('call_out_no_child_selected')} />
			) : export_page ? (
				<ExportEvaluationPage t={t} analysesList={analysesList} selectedChild={selectedChild} />
			) : result_page ? (
				<ResultEvaluationPage
					t={t}
					diagnosticSessions={diagnosticSessions}
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
			) : (
				<>
					<p>
						<strong>{t('label_profile_full')}</strong>
					</p>
					<AnalysesProfileComponent analysesList={analysesList} t={t} format="full" />
				</>
			)}
		</div>
	);
}

export default EvaluationBodyContainer;
