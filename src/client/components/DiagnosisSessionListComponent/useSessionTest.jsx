/* eslint-disable */
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { mapWindowsParamsQueriesToObject, scrollToTop } from '../../../shared/helpers/properties';
import { setCurrentTab } from '../../../store/reducers/evaluation.reducers';
import { useDispatch } from 'react-redux';

export default props => {
	const {
		action_diagnosis_getDiagnosticContent,
		action_evaluation_getResultScore,
		SecuritiesState,
		evaluationState,
		diagnosisState
	} = props;
	const localParams = {
		diagnosticId: mapWindowsParamsQueriesToObject('id'),
		childId: mapWindowsParamsQueriesToObject('child'),
		session: mapWindowsParamsQueriesToObject('session')
	};
	const [searchParams, setSearchParams] = useSearchParams();

	const [LocalData, setLocalData] = useState({
		analysesResult: null,
		diagnosticContents: [],
		activeSession: { session: localParams.session.value ? localParams.session.value : ''},
		tabSelected: 1,
		error: null,
		loader: true
	});
    const dispatch = useDispatch()
	const handleClickTab = (e, id, goTo = false) => {
		e.preventDefault();
		if (goTo) scrollToTop();
		setLocalData(prev => ({
			...prev,
			tabSelected: id
		}));
		dispatch(setCurrentTab(id))
	};
	useEffect(() => {
		if(!window.location.search.includes('session')){
			setLocalData(prev => ({
				...prev,
				activeSession: ''
			}));}
		}, [window.location.search])

	const handleShowSession = (e, session) => {
		setLocalData(prev => ({
			...prev,
			activeSession: session
		}));
		searchParams.set('session', session.session);
		setSearchParams(searchParams);
	};

	useEffect(() => {
		if (localParams?.childId.value && localParams?.diagnosticId?.value&& localParams.session.value)
			setSearchParams({
				child: localParams.childId.value,
				id: localParams.diagnosticId.value,
				session: localParams.session.value
			});
	}, [localParams?.diagnosticId?.value]);

	useEffect(() => {
		setLocalData(prev => ({
			...prev,
			tabSelected: 1
		}));
	}, [LocalData.activeSession]);

	useEffect(() => {
		if (localParams?.diagnosticId?.value && localParams?.session?.value)
			action_diagnosis_getDiagnosticContent({
				id: localParams.diagnosticId.value,
				session: localParams.session.value
			});
		if (localParams?.session?.value) {
			action_evaluation_getResultScore(localParams.session.value);
		}
	}, [localParams?.diagnosticId?.value, localParams?.session?.value]);
	useEffect(() => {
		if (evaluationState?.analysisResult)
			setLocalData(prev => ({
				...prev,
				analysesResult: evaluationState?.analysisResult?.scores,
				loader: false,
				error: null
			}));

		if (diagnosisState?.diagnosticTestContent)
			setLocalData(prev => ({
				...prev,
				diagnosticContents: diagnosisState.diagnosticTestContent
			}));
	}, [evaluationState?.analysisResult, diagnosisState?.diagnosticTestContent]);
	return {
		handleShowSession,
		handleClickTab,
		...LocalData
	};
};
