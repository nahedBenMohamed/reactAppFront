import React from 'react';
import routes from '../../../config/routes';
import WithRouter from '../../../shared/helpers/hooks/HOC';
import { getAge, linkIsActive, mapCurrentLocationQueriesToJSON } from '../../../shared/helpers/properties';
import NavItemComponent from '../../components/NavItemComponent';
import PdssSelectComponent from '../../components/PdssSelectComponent';
import DiagnosisStatisticContainer from '../DiagnosisStatisticContainer';

function DiagnosisAsideContainer(props) {
	const { data, t, selectedChild, handleChange, diagnosisGroups } = props;
	let selectOption = [];
	if (data?.length > 0) {
		selectOption = data.map(child => {
			return {
				value: child.id,
				label: child.lastName + ',' + child.firstName + ' (' + getAge(child.birthdate) + ')'
			};
		});
	}
	selectOption.unshift({ value: '', label: t('label_please_select') });
	return (
		<aside>
			<p>
				<strong>{t('sub_headline_overview')}</strong>
			</p>
			<div className="grid-x">
				<div className="cell">
					<PdssSelectComponent
						selectedValue={selectedChild}
						selectOption={selectOption}
						clickToAction={handleChange}
					/>
					<div className="grid-x">
						<div className="cell nav">
							<NavItemComponent
								className={linkIsActive(routes.account_pages.children.diagnosis_page.navigationPath)}
								path={
									routes.account_pages.children.diagnosis_page.navigationPath +
									mapCurrentLocationQueriesToJSON()
								}
								title={t('label_show_diagnostics')}
							/>
							<NavItemComponent
								className={linkIsActive(
									routes.account_pages.children.diagnosis_page.children.diagnostic_all_page
										.navigationPath
								)}
								path={
									routes.account_pages.children.diagnosis_page.children.diagnostic_all_page
										.navigationPath + mapCurrentLocationQueriesToJSON()
								}
								title={t('label_show_all_tests')}
							/>
						</div>
					</div>
					<DiagnosisStatisticContainer diagnosisGroups={diagnosisGroups} />
				</div>
			</div>
		</aside>
	);
}

export default WithRouter(DiagnosisAsideContainer);
