/* eslint-disable */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mapWindowsParamsQueriesToObject, scrollToTop } from '../../../shared/helpers/properties';

export default props => {
	const {
		action_evaluation_getAll,
		action_user_getAllChild,
		action_evaluation_update,
		action_diagnosis_getSessions,
		action_diagnosis_getDiagnosticContent,
		action_evaluation_getResultScore,
		SecuritiesState,
		evaluationState,
		userState,
		diagnosisState
	} = props;

	const localParams = {
		diagnosticId: mapWindowsParamsQueriesToObject('id'),
		childId: mapWindowsParamsQueriesToObject('child'),
		session: mapWindowsParamsQueriesToObject('session')
	};
	const [selectChild, setSelectChild] = useState(localParams?.childId.exist ? localParams?.childId.value : '');
	const [searchParams, setSearchParams] = useSearchParams();
	const [diagnosticSessions, setDiagnosticSessions] = useState([]);
	const [diagnosticContents, setDiagnosticContents] = useState([]);

	const [selectedSession, setSelectedSession] = useState('');
	const [selectedDiagnosis, setSelectedDiagnosis] = useState(
		localParams?.diagnosticId ? localParams?.diagnosticId.value : ''
	);
	const [analysesList, setAnalysesList] = useState();
	const [analysesResult, setAnalysesResult] = useState({
		resultData: null,
		error: null,
		loader: true
	});

	const [childList, setChildList] = useState([]);
	const [activeSession, setActiveSession] = useState();

	const HandleScrollToTop = id => {
		setSelectedDiagnosis(id);

		scrollToTop();
	};
	const [tabSelected, setTabSelected] = useState(1);
	const handleClickTab = (e, id, goTo = false) => {
		e.preventDefault();
		if (goTo) scrollToTop();
		setTabSelected(id);
	};
	const handleChange = e => {
		setSelectChild(e.target.value);
		if (searchParams.has('session')) {
			searchParams.delete('session');
		}
		setSearchParams({ child: e.target.value });
		if (selectedDiagnosis) setSearchParams({ child: e.target.value, id: selectedDiagnosis });
	};

	const handleSelectSession = (e, session) => {
		setSelectedSession(session);
		action_evaluation_update({
			userId: 94 /* SecuritiesState?.userId */,
			diagnosisId: localParams?.diagnosticId.value,
			childId: selectChild,
			body: {
				session: session,
				use_in_profile: 'yes'
			}
		});
	};
	const handleShowSession = (e, session) => {
		setActiveSession(session);
		searchParams.set('session', session.session);
		setSearchParams(searchParams);
	};

	useEffect(() => {
		setActiveSession(null);
		if (searchParams.has('session')) {
			searchParams.delete('session');
		}
		if (selectChild && localParams?.diagnosticId?.value)
			setSearchParams({ child: selectChild, id: localParams?.diagnosticId?.value });
	}, [localParams?.diagnosticId?.value]);

	useEffect(() => {
		setTabSelected(1);
	}, [activeSession]);

	useEffect(() => {
		if (SecuritiesState?.userId)
			action_user_getAllChild({
				userId: 94 /* SecuritiesState?.userId */
			});
	}, [SecuritiesState?.userId]);

	useEffect(() => {
		if (localParams?.childId.value && localParams?.diagnosticId?.value != null)
			action_diagnosis_getSessions({
				userId: 94 /* SecuritiesState?.userId */,
				childId: localParams?.childId.value || '',
				diagnosisId: localParams?.diagnosticId?.value
			});
	}, [SecuritiesState?.userId, localParams?.childId.value, localParams?.diagnosticId?.value]);

	useEffect(() => {
		selectChild ? action_evaluation_getAll(selectChild) : action_evaluation_getAll();
	}, [selectChild]);

	useEffect(() => {
		if (localParams?.diagnosticId?.value && localParams?.session?.value)
			action_diagnosis_getDiagnosticContent({
				id: localParams?.diagnosticId?.value,
				session: localParams?.session?.value
			});
		if (localParams?.session?.value) {
			action_evaluation_getResultScore(localParams?.session?.value);
		}
	}, [localParams?.diagnosticId?.value, localParams?.session?.value]);
	useEffect(() => {
		if (evaluationState?.analysesList) setAnalysesList(evaluationState?.analysesList);
		if (evaluationState?.analysisResult)
			setAnalysesResult(prev => ({
				...prev,
				resultData: evaluationState?.analysisResult?.scores,
				loader: false,
				error: null
			}));

		if (userState?.childList) setChildList(userState?.childList?.data);
		if (diagnosisState?.diagnosisSessions) setDiagnosticSessions(diagnosisState?.diagnosisSessions);
		if (diagnosisState?.diagnosticTestContent) setDiagnosticContents(diagnosisState?.diagnosticTestContent);
	}, [
		evaluationState?.analysesList,
		evaluationState?.analysisResult,
		userState?.childList,
		diagnosisState?.diagnosisSessions,
		diagnosisState?.diagnosticTestContent
	]);
	return {
		analysesList,
		childList,
		selectChild,
		handleChange,
		diagnosticSessions,
		handleSelectSession,
		selectedSession,
		handleShowSession,
		activeSession,
		selectedDiagnosis,
		HandleScrollToTop,
		diagnosticContents,
		handleClickTab,
		tabSelected,
		...analysesResult
	};
};
