import React, { useState } from 'react';
import PdssSelectComponent from '../../components/PdssSelectComponent';
import PdssInputComponent from '../../components/PdssInputComponent';

function DiagnosisTestHeaderContainer(props) {
	const { orderSelected, handleChangeOrder, searchValue, handleSearch } = props;
	const [query, setQuery] = useState(searchValue);
	const handleChangeSearch = e => {
		setQuery(e.target.value);
	};
	return (
		<div className="grid-x grid-margin-x item-filter">
			<PdssInputComponent
				additionalclassName="cell medium-5"
				id="diagnostic_search"
				display="true"
				placeholder={props.t('label_search')}
				changeAction={handleChangeSearch}
				clickToAction={handleSearch}
				value={query}
				iconClassName="search"
				type="text"
			/>
			<PdssSelectComponent
				selectedValue={orderSelected}
				idToAdd="diagnostic_sort"
				additionalclassName="cell medium-5 medium-offset-2"
				selectOption={[
					{
						value: 'diagnostic_session.date_initialized desc',
						label: props.t('diagnosis_session_desc_date_init')
					},
					{
						value: 'diagnostic_session.date_initialized asc',
						label: props.t('diagnosis_session_asc_date_init')
					}
				]}
				clickToAction={handleChangeOrder}
			/>
		</div>
	);
}

export default DiagnosisTestHeaderContainer;
