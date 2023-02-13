import moment from 'moment';
import { createRef, useReducer, useRef } from 'react';
import { useEffect, useState } from 'react';
import config from '../../../config';
import routes from '../../../config/routes';

import {
	CryptoProviders,
	eraseCookie,
	mapCurrentLocationQueriesToJSON,
	mapWindowsParamsQueriesToObject
} from '../../../shared/helpers/properties';

import socketProvider, {
	Consumer_CurrentStateToChild,
	Provider_ChildDemandData,
	Provider_ChildPickAnswer,
	Provider_CurrentStateToChild
} from '../../../shared/providers/socket';

export const useDiagnosticsTherapistMode = props => {
	const {
		action_diagnosis_getOneById,
		action_child_getOneById,
		GlobalDiagnosisState,
		GlobalChildState,
		action_diagnosis_updateSession,
		action_diagnosis_getDiagnosticContent,
		SecuritiesState
	} = props;

	const [DataPointer, setDataPointer] = useState(0);

	//? references
	const socketClient = createRef();
	const socketTriggerEffect = useRef(false);
	const MainDivContentReference = createRef();
	const [, flashReferences] = useReducer(status => !status, false);
	const localParams = {
		diagnosticId: mapWindowsParamsQueriesToObject('id'),
		childId: mapWindowsParamsQueriesToObject('child'),
		session: mapWindowsParamsQueriesToObject('session')
	};

	const [LocalData, setLocalData] = useState({
		diagnosticTestContent: null,
		diagnostic: null,
		child: null,
		error: null,
		loader: true
	});

	useEffect(() => {
		if (localParams?.childId) action_child_getOneById(localParams?.childId.value);
		if (localParams?.diagnosticId)
			action_diagnosis_getOneById({ id: localParams?.diagnosticId.value, session: localParams?.session?.value });
	}, []);

	useEffect(() => {
		if (GlobalDiagnosisState?.diagnostic) {
			setDataPointer(GlobalDiagnosisState?.diagnostic?.session.current_slide);
			setLocalData(prev => ({
				...prev,
				diagnostic: GlobalDiagnosisState?.diagnostic,
				loader: false
			}));
		}
	}, [GlobalDiagnosisState?.diagnostic]);

	useEffect(() => {
		if (GlobalDiagnosisState?.diagnosticTestContent) {
			setLocalData(prev => ({
				...prev,
				diagnosticTestContent: GlobalDiagnosisState?.diagnosticTestContent,
				loader: false
			}));
		}
	}, [GlobalDiagnosisState?.diagnosticTestContent]);
	useEffect(() => {
		if (LocalData?.diagnosticTestContent?.length > 0 && !socketTriggerEffect.current) {
			socketTriggerEffect.current = LocalData?.diagnosticTestContent;
			flashReferences();
		}
	}, [LocalData?.diagnosticTestContent]);

	useEffect(() => {
		if (GlobalChildState?.selectedChildDetails)
			setLocalData(prev => ({
				...prev,
				child: GlobalChildState?.selectedChildDetails?.[0],
				loader: false
			}));
	}, [GlobalChildState]);

	const openTestPageViewInNewWindow = link => {
		window.open(link, '_blank', 'toolbar=0,location=0,menubar=0');
	};

	const generateChildDynamicLink = additionalQueries => {
		return `${routes.test_pages.navigationPath}${mapCurrentLocationQueriesToJSON({
			child_mode: 'true',
			...additionalQueries
		})}`;
	};
	const abortTest = additionalQueries => {
		return `${routes.test_pages.navigationPath}${mapCurrentLocationQueriesToJSON({
			child_mode: 'true',
			...additionalQueries
		})}`;
	};
	const generateTherapistDynamicLink = additionalQueries => {
		return `${routes.test_pages.navigationPath}${mapCurrentLocationQueriesToJSON({
			...additionalQueries
		})}`;
	};
	const openIntroductionPopUp = status => {
		let element = document.querySelector('.prehistory-screen');
		if (status) {
			element.style.visibility = 'visible';
			element.style.opacity = 1;
			Provider_CurrentStateToChild({
				content: null,
				openPrehistory: true,
				otherDetails: GlobalDiagnosisState?.diagnostic
			});
		} else {
			element.style.visibility = 'hidden';
			element.style.opacity = 0;
			Provider_CurrentStateToChild({
				content: null,
				openPrehistory: false,
				otherDetails: GlobalDiagnosisState?.diagnostic
			});
		}
	};

	const updateSession = (type, item) => {
		let body;
		switch (type) {
			case 'session_start':
				body = {
					status: 'played',
					started: 'yes',
					date_started: moment().format('Y-M-D H:m:s')
				};
				break;
			case 'start_training':
				body = {
					status: 'played',
					started: 'training',
					date_started: moment().format('Y-M-D H:m:s')
				};
				break;
			case 'jump_slide':
				body = {
					current_slide: item
				};
				break;
			case 'cancel_session':
				if (window.confirm(item)) {
					body = {
						status: 'canceled'
					};
					Provider_CurrentStateToChild({
						content: GlobalDiagnosisState?.diagnosticTestContent[DataPointer],
						otherDetails: {
							...GlobalDiagnosisState?.diagnostic,
							session: {
								...GlobalDiagnosisState?.diagnostic.session,
								status: 'canceled'
							}
						}
					});
				}
				break;

			default:
				break;
		}
		if (GlobalDiagnosisState?.diagnostic?.session?.id && Object.keys(body).length > 0)
			action_diagnosis_updateSession({
				id: GlobalDiagnosisState?.diagnostic?.session?.id,
				diagnosticId: localParams?.diagnosticId.value,
				session: localParams?.session?.value,
				childId: localParams?.childId?.value,
				userId: SecuritiesState?.userId,
				body
			});
	};
	const getCurrentDianoeticTestContentData = () => {
		if (
			GlobalDiagnosisState?.diagnostic?.session?.status &&
			!GlobalDiagnosisState?.diagnostic?.session?.status.includes('initialized')
		) {
			action_diagnosis_getDiagnosticContent({
				id: localParams?.diagnosticId?.value,
				session: localParams?.session?.value
			});
			socketClient.current = socketProvider.connectToSocketClient;
		}
	};

	return {
		...LocalData,
		openIntroductionPopUp,
		openTestPageViewInNewWindow,
		generateChildDynamicLink,
		abortTest,
		DataPointer,
		setDataPointer,
		generateTherapistDynamicLink,
		getCurrentDianoeticTestContentData,
		updateSession,
		MainDivContentReference,
		socketClient,
		socketTriggerEffect
	};
};

export const useDiagnosticsChildMode = props => {
	const {} = props;
	const diagnosticTitle = useRef('');
	const [LocalData, setLocalData] = useState({
		diagnosticTestContent: null,
		diagnostic: null,
		child: null,
		openPrehistory: null,
		error: null,
		otherDetails: null,
		diagnosticTitle: null,
		loader: true
	});
	const localParams = {
		token: mapWindowsParamsQueriesToObject('token'),
		childId: mapWindowsParamsQueriesToObject('child'),
		session: mapWindowsParamsQueriesToObject('session'),
		diagnosticId: mapWindowsParamsQueriesToObject('id')
	};
	useEffect(() => {
		let token = CryptoProviders(encodeURI(localParams.token.value).replace(/%20/g, '+')).word();
		token = JSON.parse(token);
		if (token.CFToken) {
			document.cookie = config.API_Config.HealthCare_API.cookies.name + '=' + token.CFToken + '; path=/';
		}
		if (token.diagnosisTitle) diagnosticTitle.current = token.diagnosisTitle;
		return () => eraseCookie(config.API_Config.HealthCare_API.cookies.name);
	}, []);

	const setCurrentChildTestData = data => {
		if (data) {
			setLocalData(prev => ({
				...prev,
				diagnosticTestContent: data.content,
				otherDetails: data.otherDetails,
				openPrehistory: data.openPrehistory,
				loader: false
			}));
		}
	};
	const selectAnswerFrommChild = item =>
		!LocalData?.diagnosticTestContent?.selected_answer &&
		Provider_ChildPickAnswer({
			item,
			otherDetails: { session: localParams?.session.value }
		});

	useEffect(() => {
		Consumer_CurrentStateToChild(setCurrentChildTestData, localParams?.session.value);
		!LocalData?.diagnosticTestContent &&
			Provider_ChildDemandData({ otherDetails: { session: localParams?.session.value } });
	}, []);

	return { ...LocalData, selectAnswerFrommChild, diagnosticTitle };
};
export default {};
