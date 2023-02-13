import React from 'react';
import routes from '../../../config/routes';
import reactStringReplace from 'react-string-replace';
import { getAge } from '../../../shared/helpers/properties';
import moment from 'moment';
import { NavListContainer } from '../../containers/NavListContainer';

function ChildItemComponent(props) {
	const { child, t, showPopup, searchValue } = props;
	const handleShowPopup = e => {
		e.preventDefault();
		showPopup(child.id);
	};

	const itemActionList = [
		{
			className: 'tests',
			title: t('child_option_show_tests'),
			path:
				routes.account_pages.children.diagnosis_page.children.diagnostic_all_page.navigationPath +
				`?child=${child.id}`,
			icon: 'target'
		},
		{
			className: 'test',
			title: t('child_option_test'),
			path:
				routes.account_pages.children.diagnosis_page.children.diagnostic_test_child_page.navigationPath +
				`child=${child.id}`,
			icon: 'target'
		},
		{
			className: 'edit',
			title: t('child_option_edit'),
			path: routes.account_pages.children.child_page.children.edit_child_page.path + `?child=${child.id}`,
			icon: 'pencil'
		},
		{
			className: 'export',
			title: t('child_option_export'),
			icon: 'export'
		},
		{
			className: 'remove',
			title: t('child_option_remove'),
			icon: 'cancel-circled',
			action: handleShowPopup
		}
	];

	return (
		<li key={child.id}>
			<div className="container">
				<div className="content">
					<div className="grid-x">
						<div className="cell medium-3">
							<p className="label">{t('child_label_lastName')}</p>
							{searchValue ? (
								<p className="value">
									{reactStringReplace(child.lastName, searchValue, (match, i) => (
										<span className="highlight">{searchValue}</span>
									))}
								</p>
							) : (
								<p className="value">{child.lastName}</p>
							)}
						</div>
						<div className="cell medium-3">
							<p className="label">{t('child_label_firstName')}</p>
							{searchValue ? (
								<p className="value">
									{reactStringReplace(child.firstName, searchValue, (match, i) => (
										<span className="highlight">{searchValue}</span>
									))}
								</p>
							) : (
								<p className="value email">{child.firstName}</p>
							)}
						</div>
						<div className="cell medium-2">
							<p className="label">{t('child_label_birthday')}</p>
							{searchValue ? (
								<p className="value">
									{reactStringReplace(child.birthdate, searchValue, (match, i) => (
										<span className="highlight">{searchValue}</span>
									))}
								</p>
							) : (
								<p className="value">{child.birthdate}</p>
							)}
						</div>
						<div className="cell medium-1">
							<p className="label">{t('child_label_age')}</p>

							<p className="value created">{getAge(child.birthdate)}</p>
						</div>
						<div className="cell medium-2">
							<p className="label">{t('child_label_languages_list')}</p>
							<p className="value edited">{child.language_names}</p>
						</div>
						<div className="cell medium-1">
							<p className="label">{t('child_label_created')}</p>
							<p className="value edited">{moment(child.created).format('DD.MM.YY')}</p>
						</div>
					</div>
				</div>
				<div className="options">
					<div className="icon">
						<span className="entypo-down-open"></span>
					</div>
					<NavListContainer navList={itemActionList} />
				</div>
			</div>
		</li>
	);
}

export default ChildItemComponent;
