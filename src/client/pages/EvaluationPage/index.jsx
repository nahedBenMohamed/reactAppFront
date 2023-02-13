import React from 'react';
import PropTypes from 'prop-types';

import WithRouter from '../../../shared/helpers/hooks/HOC';
import { useOutletContextHook } from '../../../shared/helpers/hooks/useOutletContextHook';
import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';
import EvaluationAsidePage from './EvaluationAsidePage';
import useEvaluation from './useEvaluation';
import EvaluationBodyContainer from '../../containers/EvaluationBodyContainer';

function EvaluationPage(props) {
	useOutletContextHook(props.t('evaluation'), false);
	const {
		analysesList,
		childList,
		selectChild,
		handleChange,
		diagnosticSessions,
		handleSelectSession,
		selectedSession,
		handleShowSession,
		activeSession,
		diagnosticContents,
		selectedDiagnosis,
		HandleScrollToTop,
		handleClickTab,
		tabSelected,
		resultData,
		loader
	} = useEvaluation(props);

	return (
		<div className="padding" id="analysis">
			<EvaluationAsidePage
				t={props.t}
				analysesList={analysesList}
				childList={childList}
				selectedChild={selectChild}
				handleChange={handleChange}
				selectedDiagnosis={selectedDiagnosis}
				HandleScrollToTop={HandleScrollToTop}
			>
				<EvaluationBodyContainer
					analysesList={analysesList}
					t={props.t}
					selectedChild={selectChild}
					export_page={props.export_page}
					profile_page={props.profile_page}
					result_page={props.result_page}
					diagnosticSessions={diagnosticSessions}
					handleSelectSession={handleSelectSession}
					selectedSession={selectedSession}
					handleShowSession={handleShowSession}
					activeSession={activeSession}
					diagnosticContents={diagnosticContents}
					handleClickTab={handleClickTab}
					tabSelected={tabSelected}
					analysesResult={resultData}
					loader={loader}
				/>
			</EvaluationAsidePage>
		</div>
	);
}
EvaluationPage.prototype = {
	action_evaluation_getAll: PropTypes.func.isRequired,
	action_user_getAllChild: PropTypes.func.isRequired,
	action_diagnosis_getSessions: PropTypes.func.isRequired,
	action_evaluation_update: PropTypes.func.isRequired,
	action_diagnosis_getDiagnosticContent: PropTypes.func.isRequired,
	action_evaluation_getResultScore: PropTypes.func.isRequired,
	GlobalEvaluationState: PropTypes.object.isRequired,
	GlobalUserState: PropTypes.object.isRequired,
	diagnosisState: PropTypes.object,
	SecuritiesState: PropTypes.object
};
export default WithReduxConnector(WithRouter(EvaluationPage), state => ({
	evaluationState: state.GlobalEvaluationState,
	userState: state.GlobalUserState,
	SecuritiesState: state.GlobalSecuritiesSate,
	diagnosisState: state.GlobalDiagnosisState
}));
