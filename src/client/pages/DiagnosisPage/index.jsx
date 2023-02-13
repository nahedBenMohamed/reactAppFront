import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from '@reduxjs/toolkit';

import * as Actions from '../../../store/actions';
import DiagnosisBodyContainer from '../../containers/DiagnosisBodyContainer';
import useDiagnosis from './useDiagnosis';
import DiagnosisInfoComponent from '../../components/DiagnosisInfoComponent';
import { useOutletContextHook } from '../../../shared/helpers/hooks/useOutletContextHook';
import DiagnosisAsidePage from './DiagnosisAsidePage';
import PdssConfirmPopup from '../../components/PdssConfirmPopupComponent';

function DiagnosisPage(props) {
	const {
		childList,
		diagnosisList,
		selectChild,
		handleChange,
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
	} = useDiagnosis(props);
	useOutletContextHook(props.t('diagnosis'), false);
	return (
		<div className="padding" id="diagnostics">
			<PdssConfirmPopup
				ConfirmPopup={ConfirmPopup}
				closePopup={closePopup}
				title={props.t('diagnosis_session_confirm_delete_title')}
				description={props.t('diagnosis_session_confirm_delete')}
				show={show}
			/>
			<DiagnosisAsidePage
				childList={childList}
				selectChild={selectChild}
				handleChange={handleChange}
				diagnosisGroups={diagnosisGroups}
			>
				<DiagnosisBodyContainer
					selectedChild={selectChild}
					diagnosis={diagnosisList}
					setShowInfo={setShowInfo}
					all={props.all}
					orderSelected={orderSelected}
					handleChangeOrder={handleChangeOrder}
					searchValue={searchValue}
					handleSearch={handleSearch}
					diagnosticSessions={diagnosticSessions}
					showPopup={showPopup}
				/>
			</DiagnosisAsidePage>
			{showInfo.show && diagnosisInfo?.[0] && (
				<DiagnosisInfoComponent info={diagnosisInfo[0]} setShowInfo={setShowInfo} />
			)}
		</div>
	);
}
DiagnosisPage.prototype = {
	action_user_getAllChild: PropTypes.func.isRequired,
	action_diagnosis_getAll: PropTypes.func.isRequired,
	action_diagnosis_getInfo: PropTypes.func.isRequired,
	action_diagnosis_getGroups: PropTypes.func.isRequired,
	action_diagnosis_getSessions: PropTypes.func.isRequired,
	action_diagnosis_deleteSession: PropTypes.func.isRequired,
	diagnosisState: PropTypes.object,
	userState: PropTypes.object,
	SecuritiesState: PropTypes.object
};
const mapStateToProps = state => ({
	userState: state.GlobalUserState,
	diagnosisState: state.GlobalDiagnosisState,
	SecuritiesState: state.GlobalSecuritiesSate
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(DiagnosisPage);
