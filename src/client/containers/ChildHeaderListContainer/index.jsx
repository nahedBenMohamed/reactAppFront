import React, { useState } from 'react';
import routes from '../../../config/routes';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import PdssButtonComponent from '../../components/PdssButtonComponent';
import PdssInputComponent from '../../components/PdssInputComponent';
import PdssSelectComponent from '../../components/PdssSelectComponent';

function ChildHeaderListContainer(props) {
	const {
		t,
		currentRouter: { navigate },
		handleChange,
		orderSelected,
		handleSearch,
		searchValue
	} = props;
	const [query, setQuery] = useState(searchValue);
	const handleChangeSearch = e => {
		setQuery(e.target.value);
	};
	return (
		<div className="grid-x grid-margin-x item-filter">
			<PdssSelectComponent
				label={t('child_label_sort_by')}
				selectedValue={orderSelected}
				selectOption={[
					{
						value: 'child.created desc ',
						label: t('child_sortBy_createdDesc')
					},
					{
						value: 'child.created asc ',
						label: t('child_sortBy_createdAsc')
					},
					{
						value: 'child.lastname desc ',
						label: t('child_sortBy_lastnameDesc')
					},
					{
						value: 'child.lastname asc ',
						label: t('child_sortBy_lastnameAsc')
					}
				]}
				clickToAction={handleChange}
			/>
			<PdssInputComponent
				label={t('child_label_search_by')}
				display="true"
				changeAction={handleChangeSearch}
				clickToAction={handleSearch}
				value={query}
				iconClassName="search"
				type="text"
			/>
			<PdssButtonComponent
				title={t('child_headline_new')}
				display="true"
				clickToAction={() => navigate(routes.account_pages.children.child_page.children.create_child_page.path)}
			/>
		</div>
	);
}

export default WithRouter(ChildHeaderListContainer);
