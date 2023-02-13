import React from 'react';

function PaginateComponent({ items, setCurrentPage, currentPage }) {
	let pages = Math.ceil(items.total / items.limit);
	let start_page = 1;
	let limit = pages;
	let arr = [];
	return items.total > items.limit ? (
		<div className="grid-x">
			<div className="cell">
				<ul className="paging">
					{items.page !== 1 ? (
						<li>
							<a
								className="prev"
								onClick={() => {
									setCurrentPage(currentPage - 1);
								}}
							>
								<span className="entypo-left-open"></span>
							</a>
						</li>
					) : null}
					{pages > 10
						? items.page > 5
							? (start_page = items.page - 5(pages > items.page + 5) ? (limit = items.page + 5) : null)
							: (limit = 10)
						: null}

					{(arr = Array(limit - start_page + 1)
						.fill()
						.map((_, idx) => start_page + idx)).map((page, pageIndex) => {
						return (
							<li key={pageIndex}>
								<a
									className={page == items.page ? 'active' : ''}
									onClick={() => {
										setCurrentPage(page);
									}}
								>
									{page}
								</a>
							</li>
						);
					})}
					{items.page !== pages && (
						<li>
							<a
								className="next"
								onClick={() => {
									setCurrentPage(currentPage + 1);
								}}
							>
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
