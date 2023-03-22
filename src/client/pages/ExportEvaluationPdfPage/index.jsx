import { useState, useEffect } from 'react';
import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import ExportEvaluationComponent from '../../components/ExportEvaluationComponent';
import { PDFViewer } from '@react-pdf/renderer';
import FullScreenLoaderContainer from '../../containers/FullScreenLoaderContainer';

const ExportEvaluationPdfPage = props => {
	const [selectedChild, setSelectedChild] = useState([]);
	const [loader, setLoader] = useState(true);
	const {
		GlobalChildState,
		action_child_getOneById,
		action_evaluation_getAll,
		action_evaluation_getDataToExport,
		action_evaluation_getResultGrammarScore,
		GlobalSecuritiesSate,
		GlobalEvaluationState
	} = props;
	useEffect(() => {
		if (localStorage?.getItem('selected_child')) {
			props.action_child_getOneById(localStorage?.getItem('selected_child')).then(result => {
				setSelectedChild(result.payload[0]);
			});
		}
		action_evaluation_getAll(localStorage?.getItem('selected_child'));
		action_evaluation_getDataToExport({
			childId: localStorage?.getItem('selected_child'),
			diagnosticId: localStorage?.getItem('diagnosticsToExport')
				? localStorage?.getItem('diagnosticsToExport')
				: ''
		});
	}, []);

	useEffect(() => {
		if (GlobalEvaluationState?.analysisScores != null) {
			setLoader(false);
			action_evaluation_getResultGrammarScore({
				session: GlobalEvaluationState?.analysisScores?.evaluations[0]?.sessionDetails[0]?.session,
				childAgeInMonths:
					GlobalEvaluationState?.analysisScores?.evaluations[0]?.sessionDetails[0]?.child_age_in_months
			});
		}
	}, [GlobalEvaluationState?.analysisScores]);
	if (loader) return <FullScreenLoaderContainer />;
	return (
		<PDFViewer height="100%" width="100%" showToolbar={false}>
			<ExportEvaluationComponent
				{...props}
				//selectedChild={GlobalChildState?.selectedChildDetails}
				selectedChild={selectedChild}
				userId={GlobalSecuritiesSate?.userId}
				analysesList={GlobalEvaluationState?.analysesList}
				analysisScores={GlobalEvaluationState?.analysisScores}
				analysisGrammarScores={GlobalEvaluationState?.analysisGrammarScores}
			/>
		</PDFViewer>
	);
};

export default WithReduxConnector(WithRouter(ExportEvaluationPdfPage), state => ({
	GlobalChildState: state.GlobalChildState,
	GlobalSecuritiesSate: state.GlobalSecuritiesSate,
	GlobalEvaluationState: state.GlobalEvaluationState,
	GlobalDiagnosisState: state.GlobalDiagnosisState
}));
