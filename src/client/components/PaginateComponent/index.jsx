import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectChildList, selectCurrentPage, setCurrentPage } from '../../../store/reducers/user.reducer';

function PaginateComponent() {
	const dispatch = useDispatch();
	const childList = useSelector(selectChildList);
	const currentPage = useSelector(selectCurrentPage);
	const [nextDisabled, setNextDisabled] = useState(false);
	const [prevDisabled, setPrevDisabled] = useState(false);
	let pages = Math.ceil(childList.total / childList.limit);
	let start_page = 1;
	let limit = pages;
	let arr = [];
	const handleChangeCurrentPage = data => event => {
		event.preventDefault();
		dispatch(setCurrentPage(data));
	};
	useEffect(() => {
		if (currentPage > 1) {
			setPrevDisabled(false);
			if (currentPage != pages) {
				setNextDisabled(false);
				return;
			}
			if (currentPage === pages) {
				setNextDisabled(true);
				return;
			}
			return;
		}
		if (currentPage === 1) {
			setPrevDisabled(true);
			setNextDisabled(false)
			return;
		}
	}, [currentPage]);

	return childList.total > childList.limit ? (
		<div className="grid-x">
			<div className="cell">
				<ul className="paging">
					{!prevDisabled && childList.page !== 1 && (
						<li>
							<a className="prev" onClick={handleChangeCurrentPage(currentPage - 1)}>
								<span className="entypo-left-open"></span>
							</a>
						</li>
					)}
					{pages > 10
						? childList.page > 5
							? (start_page =
									childList.page - 5(pages > childList.page + 5)
										? (limit = childList.page + 5)
										: null)
							: (limit = 10)
						: null}

					{(arr = Array(limit - start_page + 1)
						.fill()
						.map((_, idx) => start_page + idx)).map((page, pageIndex) => {
						return (
							<li key={pageIndex}>
								<a
									className={page == childList.page ? 'active' : ''}
									onClick={handleChangeCurrentPage(page)}
								>
									{page}
								</a>
							</li>
						);
					})}
					{!nextDisabled && childList.page !== pages && (
						<li>
							<a className="next" onClick={handleChangeCurrentPage(currentPage + 1)}>
								<span className="entypo-right-open"></span>
							</a>
						</li>
					)}
				</ul>
			</div>
		</div>
	) : null;
}

export default PaginateComponent;
