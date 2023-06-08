import React, { memo, forwardRef, useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from '@reduxjs/toolkit';

import * as Actions from '../../../store/actions';
import FullScreenLoaderContainer from '../../containers/FullScreenLoaderContainer';
import ChildHeaderListContainer from '../../containers/ChildHeaderListContainer';
import ChildBodyListContainer from '../../containers/ChildBodyListContainer';
import PaginateComponent from '../../components/PaginateComponent';
import useChildList from '../../containers/ChildListContainer/useChildList';
import PdssConfirmPopup from '../../components/PdssConfirmPopupComponent';
import { t } from 'i18next';
import { setTemplateHideBox, setTemplateTitle } from '../../../store/reducers/settings.reducer';

const ChildPage = props => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setTemplateTitle(t('child_headline')));
		dispatch(setTemplateHideBox(false));
	}, []);
	const { loader } = useChildList(props);

	if (loader) return <FullScreenLoaderContainer />;

	return (
		<div className="padding">
			<ChildHeaderListContainer {...props} />
			<ChildBodyListContainer {...props} />
			<PaginateComponent />
		</div>
	);
};

ChildPage.prototype = {
	action_user_getAllChild: PropTypes.func.isRequired,
	action_child_deleteOne: PropTypes.func.isRequired,
	userState: PropTypes.object,
	SecuritiesState: PropTypes.object
};


export default memo(ChildPage);
