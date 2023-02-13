import React from 'react';

import WithRouter from '../../../shared/helpers/hooks/HOC';
import DiagnosisListComponent from '../../components/DiagnosisListComponent';
import DiagnosisSessionListComponent from '../../components/DiagnosisSessionListComponent';
import PdssWarningMessageComponent from '../../components/PdssWarningMessageComponent';
import DiagnosisTestHeaderContainer from '../DiagnosisTestHeaderContainer';

function DiagnosisBodyContainer(props) {
	const {
		selectedChild,
		diagnosis,
		setShowInfo,
		t,
		all,
		orderSelected,
		handleChangeOrder,
		searchValue,
		handleSearch,
		diagnosticSessions,
		showPopup
	} = props;
	return (
		<div className={'cell medium-8 ' + (all ? 'all' : '')}>
			<p>
				<strong>{all ? t('sub_headline_all_tests') : t('sub_headline_start')}</strong>
			</p>
			{all ? (
				<DiagnosisTestHeaderContainer
					orderSelected={orderSelected}
					handleChangeOrder={handleChangeOrder}
					searchValue={searchValue}
					handleSearch={handleSearch}
					t={t}
				/>
			) : null}
			{selectedChild === '' ? (
				<PdssWarningMessageComponent message={t('call_out_no_child_selected')} />
			) : all ? (
				<DiagnosisSessionListComponent
					searchValue={searchValue}
					diagnosticSessions={diagnosticSessions}
					t={t}
					showPopup={showPopup}
				/>
			) : (
				<DiagnosisListComponent
					diagnosis={diagnosis}
					selectedChild={selectedChild}
					setShowInfo={setShowInfo}
					diagnosticSessions={diagnosticSessions}
					showPopup={showPopup}
				/>
			)}
		</div>
	);
}

export default WithRouter(DiagnosisBodyContainer);
