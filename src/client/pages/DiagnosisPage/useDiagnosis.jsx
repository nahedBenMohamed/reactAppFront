/* eslint-disable */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { mapWindowsParamsQueriesToObject } from '../../../shared/helpers/properties';
import { Consumer_TherapistDiagnosticList } from '../../../shared/providers/socket';

import { selectChildDetails, setSelectedChildDetails } from '../../../store/reducers/child.reducer';
import { setOrderSort } from '../../../store/reducers/diagnosis.reducer';
import { selectCurrentUserId, selectCurrentUserSecurities } from '../../../store/reducers/securities.reducers';
import { selectChildList } from '../../../store/reducers/user.reducer';

export default props => {
	const {
		action_user_getAllChild,
		action_diagnosis_getAll,
		action_diagnosis_getGroups,
		action_diagnosis_getSessions,
		currentRouter: { location }
	} = props;
	const dispatch = useDispatch();
	const childId = new URLSearchParams(location.search).get('child');
	const selectedChild = useSelector(selectChildDetails);
	const currentUserId = useSelector(selectCurrentUserId);
	const childList = useSelector(selectChildList);
	const [searchParams, setSearchParams] = useSearchParams();
	const localParams = {
		childId: mapWindowsParamsQueriesToObject('child')
	};

	useEffect(() => {
		if (currentUserId) {
			action_user_getAllChild({
				userId: currentUserId
			});
			let { closeup } = Consumer_TherapistDiagnosticList(
				() =>
					action_diagnosis_getSessions({
						userId: currentUserId,
						childId: childId
					}),
				currentUserId
			);
			return () => closeup();
		}
	}, [currentUserId]);

	useEffect(() => {
		action_diagnosis_getAll();
		if (searchParams.has('child')) {
			setSearchParams({ child: localParams.childId.value });
		}
	}, []);

	useEffect(() => {
		if (childId && childList.data) {
			dispatch(setSelectedChildDetails(childList.data.find(element => element.id == childId)));
		} else dispatch(setSelectedChildDetails(null));
	}, [childId && childList.data]);

	useEffect(() => {
		if (selectedChild && childId) {
			action_diagnosis_getGroups(selectedChild.id);
			action_diagnosis_getSessions({
				userId: currentUserId,
				childId: selectedChild.id
			});
		} else {
			action_diagnosis_getGroups();
		}
	}, [selectedChild]);
};
