import React from 'react';
import AnalysesProfileComponent from '../../components/AnalysesProfileComponent';

import PdssWarningMessageComponent from '../../components/PdssWarningMessageComponent';
import ExportEvaluationPage from '../../pages/EvaluationPage/ExportEvaluationPage';
import ResultEvaluationPage from '../../pages/EvaluationPage/ResultEvaluationPage';

function EvaluationBodyContainer({ t, export_page, analysesList, selectedChild, analysisScores, result_page, handleListChange, ids }) {

	return (
		<div className={'cell medium-8 '}>
			{selectedChild === '' ? (
				<PdssWarningMessageComponent message={t('call_out_no_child_selected')} />
			) : export_page ? (
				<ExportEvaluationPage t={t} analysesList={analysesList} selectedChild={selectedChild} handleListChange={handleListChange} ids={ids} analysisScores={analysisScores}/>
			) : result_page ? (
				<ResultEvaluationPage t={t} />
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
