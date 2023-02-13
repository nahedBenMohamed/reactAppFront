import React, { memo, forwardRef, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from '@reduxjs/toolkit';

import * as Actions from '../../../store/actions';
import FullScreenLoaderContainer from '../../containers/FullScreenLoaderContainer';
import ChildHeaderListContainer from '../../containers/ChildHeaderListContainer';
import ChildBodyListContainer from '../../containers/ChildBodyListContainer';
import PaginateComponent from '../../components/PaginateComponent';
import useChildList from '../../containers/ChildListContainer/useChildList';
import PdssConfirmPopup from '../../components/PdssConfirmPopupComponent';
import { useOutletContextHook } from '../../../shared/helpers/hooks/useOutletContextHook';

const ChildPage = React.forwardRef((props, reference) => {
	const { t } = props;
	useOutletContextHook(t('child_headline'), false);
	const {
		loader,
		data,
		currentPage,
		setCurrentPage,
		orderSelected,
		searchValue,
		handleSearch,
		handleChange,
		show,
		showPopup,
		ConfirmPopup,
		ChildPageReferences,
		closePopup
	} = useChildList(props, reference);

	if (loader) return <FullScreenLoaderContainer />;

	return (
		<div className="padding">
			<PdssConfirmPopup
				ConfirmPopup={ConfirmPopup}
				closePopup={closePopup}
				title={t('child_confirm_delete_title')}
				description={t('child_confirm_delete')}
				show={show}
			/>
			<ChildHeaderListContainer
				{...props}
				handleChange={handleChange}
				orderSelected={orderSelected}
				handleSearch={handleSearch}
				searchValue={searchValue}
			/>

			<ChildBodyListContainer {...props} data={data} showPopup={showPopup} searchValue={searchValue} />
			<PaginateComponent
				items={data}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				ref={ChildPageReferences}
			/>
		</div>
	);
});

ChildPage.prototype = {
	action_user_getAllChild: PropTypes.func.isRequired,
	action_child_deleteOne: PropTypes.func.isRequired,
	userState: PropTypes.object,
	SecuritiesState: PropTypes.object
};
const mapStateToProps = state => ({
	userState: state.GlobalUserState,
	SecuritiesState: state.GlobalSecuritiesSate
});

function mapDispatchToProps(dispatch) {
	return bindActionCreators(Actions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(memo(ChildPage));
