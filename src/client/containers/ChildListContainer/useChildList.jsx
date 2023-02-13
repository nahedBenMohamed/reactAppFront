/* eslint-disable */
import { useCallback, useRef } from 'react';
import { useEffect, useState } from 'react';
import routes from '../../../config/routes';

export default props => {
	const { action_user_getAllChild, action_child_deleteOne, userState, SecuritiesState } = props;
	const ChildPageReferences = useRef();
	const [LocalData, setLocalData] = useState({
		data: null,
		loader: true,
		error: null
	});

	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage, setItemsPerPage] = useState(5);
	const [orderSelected, setOrderSelected] = useState('child.created desc');
	const [searchValue, setSearchValue] = useState('');
	const [show, setShow] = useState(false);
	const [childId, setChildId] = useState();

	const showPopup = childId => {
		setShow(true);
		setChildId(childId);
	};

	const closePopup = () => {
		setShow(false);
	};

	const ConfirmPopup = () => {
		action_child_deleteOne({
			userId: SecuritiesState?.userId,
			childId: childId
		});
		setShow(false);
	};

	const handleChange = e => {
		setOrderSelected(e.target.value);
	};
	const handleSearch = (e, query) => {
		setSearchValue(query);
	};

	const fetchingChildList = useCallback(() => {
		SecuritiesState?.userId &&
			action_user_getAllChild({
				userId: SecuritiesState?.userId,
				order_by: orderSelected,
				search_for: searchValue,
				page: currentPage,
				items_per_page: itemsPerPage
			});
	}, [SecuritiesState, orderSelected, searchValue, currentPage]);

	useEffect(() => {
		fetchingChildList();
	}, [fetchingChildList]);

	useEffect(() => {
		if (userState?.childList) setLocalData({ data: userState?.childList, loader: false, error: null });
	}, [userState?.childList]);

	return {
		...LocalData,
		currentPage,
		setCurrentPage,
		orderSelected,
		handleChange,
		searchValue,
		handleSearch,
		show,
		showPopup,
		ConfirmPopup,
		ChildPageReferences,
		closePopup
	};
};
