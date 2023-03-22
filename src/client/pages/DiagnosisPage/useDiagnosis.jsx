/* eslint-disable */
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Consumer_TherapistDiagnosticList } from '../../../shared/providers/socket';

import { setSelectedChildDetails } from '../../../store/reducers/child.reducer';

export default props => {
	const {
		action_user_getAllChild,
		action_diagnosis_getAll,
		action_diagnosis_getInfo,
		action_diagnosis_getGroups,
		action_diagnosis_getSessions,
		action_diagnosis_deleteSession,
		userState,
		diagnosisState,
		SecuritiesState,
		currentRouter: { location }
	} = props;
	const dispatch = useDispatch();
	const childId = new URLSearchParams(location.search).get('child');
	const [selectChild, setSelectChild] = useState(childId ? childId : '');
	const [searchParams, setSearchParams] = useSearchParams();

	const [childList, setChildList] = useState([]);
	const [diagnosisList, setDiagnosisList] = useState([]);
	const [diagnosisInfo, setDiagnosisInfo] = useState();
	const [diagnosisGroups, setDiagnosisGroups] = useState([]);
	const [diagnosticSessions, setDiagnosticSessions] = useState([]);
	const [orderSelected, setOrderSelected] = useState('diagnostic_session.date_initialized desc');
	const [searchValue, setSearchValue] = useState('');
	const [showInfo, setShowInfo] = useState({
		show: false,
		selectedItem: ''
	});
	const [show, setShow] = useState(false);
	const [sessionId, setSessionId] = useState();
	const handleChange = e => {
		setSelectChild(e.target.value);
		setSearchParams({ child: e.target.value });
		dispatch(setSelectedChildDetails(userState?.childList?.data.find(element => element.id == e.target.value)));
	};
	const handleChangeOrder = e => {
		setOrderSelected(e.target.value);
	};
	const handleSearch = (e, query) => {
		setSearchValue(query);
	};
	const showPopup = sessionId => {
		setShow(true);
		setSessionId(sessionId);
	};

	const closePopup = () => {
		setShow(false);
	};

	const ConfirmPopup = () => {
		action_diagnosis_deleteSession({
			sessionId: sessionId,
			userId: SecuritiesState?.userId,
			childId: childId
		});

		setShow(false);
	};
	useEffect(() => {
		if (SecuritiesState?.userId)
			action_user_getAllChild({
				userId: SecuritiesState?.userId
			});
	}, [SecuritiesState?.userId]);

	useEffect(() => {
		action_diagnosis_getAll();
		let { closeup } = Consumer_TherapistDiagnosticList(
			() =>
				action_diagnosis_getSessions({
					userId: SecuritiesState?.userId,
					orderBy: orderSelected,
					searchFor: searchValue,
					childId: selectChild || ''
				}),
			SecuritiesState?.userId
		);
		if (childId)
			dispatch(setSelectedChildDetails(userState?.childList?.data.find(element => element.id == childId)));

		return () => closeup();
	}, []);
	useEffect(() => {
		if (showInfo.selectedItem) action_diagnosis_getInfo(showInfo.selectedItem);
		// to change static id after demo by selectChild
		selectChild ? action_diagnosis_getGroups(selectChild) : action_diagnosis_getGroups();
	}, [showInfo.selectedItem, selectChild]);

	useEffect(() => {
		if (showInfo.show) {
			document.documentElement.classList.add('zf-has-scroll', 'is-reveal-open');
		} else {
			document.documentElement.removeAttribute('class');
		}
	}, [showInfo]);

	useEffect(() => {
		if (selectChild)
			action_diagnosis_getSessions({
				userId: SecuritiesState?.userId,
				orderBy: orderSelected,
				searchFor: searchValue,
				childId: selectChild || ''
			});
	}, [SecuritiesState?.userId, orderSelected, searchValue, selectChild]);
	useEffect(() => {
		if (userState?.childList) setChildList(userState?.childList?.data);
		if (diagnosisState?.diagnosisList) setDiagnosisList(diagnosisState?.diagnosisList);
		if (diagnosisState?.diagnosisInfo) setDiagnosisInfo(diagnosisState?.diagnosisInfo);
		if (diagnosisState?.diagnosisGroups) setDiagnosisGroups(diagnosisState?.diagnosisGroups);
		if (diagnosisState?.diagnosisSessions) setDiagnosticSessions(diagnosisState?.diagnosisSessions);
	}, [
		userState?.childList,
		diagnosisState?.diagnosisList,
		diagnosisState?.diagnosisInfo,
		diagnosisState?.diagnosisGroups,
		diagnosisState?.diagnosisSessions
	]);
	return {
		childList,
		selectChild,
		handleChange,
		diagnosisList,
		showInfo,
		setShowInfo,
		diagnosisInfo,
		diagnosisGroups,
		orderSelected,
		handleChangeOrder,
		searchValue,
		handleSearch,
		diagnosticSessions,
		show,
		showPopup,
		ConfirmPopup,
		closePopup
	};
};
