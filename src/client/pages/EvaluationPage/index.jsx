import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import WithRouter from '../../../shared/helpers/hooks/HOC';
import { useOutletContextHook } from '../../../shared/helpers/hooks/useOutletContextHook';
import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';
import EvaluationAsidePage from './EvaluationAsidePage';
import useEvaluation from './useEvaluation';
import EvaluationBodyContainer from '../../containers/EvaluationBodyContainer';

function EvaluationPage(props) {
	useOutletContextHook(props.t('evaluation'), false);
	const { action_evaluation_getDataToExport, evaluationState } = props;
	const [ids, setIds] = useState({});
	function handleListChange(newList) {
		setIds(newList);
		localStorage.setItem('diagnosticsToExport', newList);
	}
	const { analysesList, childList, handleChange, HandleScrollToTop, selectChild, analysisScores } = useEvaluation(props);
    
    useEffect(() => {
		if (selectChild) {
			action_evaluation_getDataToExport( {childId: selectChild, diagnosticId: ''});
		}
   }, [selectChild]);

   useEffect(() => {
			setIds([...new Set(analysisScores?.evaluations?.map(item => item.diagnostic))]);
	}, [analysisScores?.evaluations]);

	return (
		<div className="padding" id="analysis">
			<EvaluationAsidePage
				t={props.t}
				analysesList={analysesList}
				childList={childList}
				handleChange={handleChange}
				HandleScrollToTop={HandleScrollToTop}
			>
				<EvaluationBodyContainer
					analysesList={analysesList}
					selectedChild={selectChild}
					analysisScores={evaluationState?.analysisScores}
					t={props.t}
					export_page={props.export_page}
					result_page={props.result_page}
					handleListChange={handleListChange}
					ids={ids}
				/>
			</EvaluationAsidePage>
		</div>
	);
}
EvaluationPage.prototype = {
	action_user_getAllChild: PropTypes.func.isRequired,
	action_evaluation_getAll: PropTypes.func.isRequired,
	action_diagnosis_getSessions: PropTypes.func.isRequired,
	GlobalEvaluationState: PropTypes.object.isRequired,
	SecuritiesState: PropTypes.object,
	GlobalUserState: PropTypes.object.isRequired
};
export default WithReduxConnector(WithRouter(EvaluationPage), state => ({
	evaluationState: state.GlobalEvaluationState,
	SecuritiesState: state.GlobalSecuritiesSate,
	userState: state.GlobalUserState
}));
