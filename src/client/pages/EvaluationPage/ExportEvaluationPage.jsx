import React from 'react';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import { useOutletContextHook } from '../../../shared/helpers/hooks/useOutletContextHook';
import PdssWarningMessageComponent from '../../components/PdssWarningMessageComponent';
import DiagnosticCheckboxListComponent from '../../components/DiagnosticCheckboxListComponent';

function ExportEvaluationPage({ t, analysesList, selectedChild, handleListChange, ids }) {
	useOutletContextHook(t('evaluation'), false);
	return (
		<div>
			<p>
				<strong>{t('label_export')}</strong>
			</p>
			<PdssWarningMessageComponent message={t('label_export_detail')} />
			<p>{t('label_tests')}</p>
			<DiagnosticCheckboxListComponent
				t={t}
				classDesignation={'export-select ids'}
				analysesList={analysesList}
				selectedChild={selectedChild}
				handleListChange={handleListChange}
				ids={ids}
			/>
		</div>
	);
}

export default WithRouter(ExportEvaluationPage);
