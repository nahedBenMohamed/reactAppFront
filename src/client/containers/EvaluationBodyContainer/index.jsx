import React from 'react';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';
import AnalysesProfileComponent from '../../components/AnalysesProfileComponent';
import PdssWarningMessageComponent from '../../components/PdssWarningMessageComponent';
import ExportEvaluationPage from '../../pages/EvaluationPage/ExportEvaluationPage';
import ResultEvaluationPage from '../../pages/EvaluationPage/ResultEvaluationPage';

function EvaluationBodyContainer({ t, export_page, result_page, selectedChild }) {
	return (
		<div className={'cell medium-8 '}>
			{selectedChild === '' ? (
				<PdssWarningMessageComponent message={t('call_out_no_child_selected')} />
			) : export_page ? (
				<ExportEvaluationPage t={t} selectedChild={selectedChild}/>
			) : result_page ? (
				<ResultEvaluationPage t={t} />
			) : (
				<>
					<p>
						<strong>{t('label_profile_full')}</strong>
					</p>
					<AnalysesProfileComponent t={t} format="full" />
				</>
			)}
		</div>
	);
}

export default WithReduxConnector(WithRouter(EvaluationBodyContainer), state => ({
	evaluationState: state.GlobalEvaluationState
}));
