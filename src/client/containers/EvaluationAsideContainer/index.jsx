import React from 'react';

import routes from '../../../config/routes';
import {
	getAge,
	linkIsActive,
	mapCurrentLocationQueriesToJSON,
	progressRing
} from '../../../shared/helpers/properties';
import AnalysesProfileComponent from '../../components/AnalysesProfileComponent';
import NavItemComponent from '../../components/NavItemComponent';
import PdssSelectComponent from '../../components/PdssSelectComponent';

function EvaluationAsideContainer(props) {
	const { t, data, analysesList, selectedChild, handleChange, selectedDiagnosis, HandleScrollToTop } = props;

	let selectOption = [];
	if (data?.length > 0) {
		selectOption = data.map(child => {
			return {
				value: child.id,
				label: child.lastName + ',' + child.firstName + ' (' + getAge(child.birthdate) + ')'
			};
		});
	}
	selectOption.unshift({ value: '', label: t('evaluation_placeholder_please_select_child') });

	return (
		<aside>
			<p>
				<strong>{t('subheadline_overview')}</strong>
			</p>
			<div className="grid-x">
				<div className="cell">
					<PdssSelectComponent
						selectedValue={selectedChild}
						selectOption={selectOption}
						clickToAction={handleChange}
					/>
					<div className="grid-x">
						{selectedChild && (
							<>
								<div className="cell group">
									<p>{t('label_profile')}</p>
								</div>
								<div className="cell">
									<AnalysesProfileComponent t={t} analysesList={analysesList} format="" />
								</div>
							</>
						)}
						<div className="cell nav">
							<NavItemComponent
								className={linkIsActive(
									routes.account_pages.children.evaluation_page.children.profile_page.navigationPath
								)}
								path={
									routes.account_pages.children.evaluation_page.children.profile_page.navigationPath +
									mapCurrentLocationQueriesToJSON()
								}
								title={t('label_show_profile')}
							/>
							<NavItemComponent
								className={linkIsActive(
									routes.account_pages.children.evaluation_page.children.export_page.navigationPath
								)}
								path={
									routes.account_pages.children.evaluation_page.children.export_page.navigationPath +
									mapCurrentLocationQueriesToJSON()
								}
								title={t('label_export')}
							/>
						</div>
						<div className="cell diagnostics">
							<div className="grid-x">
								<div className="cell group">
									<p>{t('label_tests')}</p>
								</div>
								{analysesList &&
									analysesList.map((diagnostic, index) => {
										const label = diagnostic.type === 'sublabel' ? ' sublabel' : '';
										let percent = diagnostic.tvalue
											? 100
											: diagnostic.has_sublabel === 'yes' && analysesList[index + 1].tvalue
											? 100
											: 0;
										const { strokeDasharray, strokeDashoffset } = progressRing(percent, 5);
										return (
											<div className={`cell ${label}`} key={index}>
												{diagnostic.type === 'label' ? (
													<p>
														<NavItemComponent
															path={
																routes.account_pages.children.evaluation_page.children
																	.result_page.navigationPath +
																mapCurrentLocationQueriesToJSON({
																	id: diagnostic.diagnostic
																})
															}
															textIcons
															className={
																selectedDiagnosis === diagnostic.diagnostic &&
																window.location.pathname ===
																	routes.account_pages.children.evaluation_page
																		.children.result_page.navigationPath
																	? 'active'
																	: ''
															}
															action={() => HandleScrollToTop(diagnostic.diagnostic)}
														>
															<span className="progress-ring" data-percent={percent}>
																<svg>
																	<circle
																		r="5"
																		cx="10"
																		cy="10"
																		strokeDasharray={strokeDasharray}
																		strokeDashoffset={strokeDashoffset}
																	/>
																</svg>
															</span>
															<span className="diagnostic">
																{diagnostic.name}
																<span className="label">{diagnostic.label}</span>
															</span>
														</NavItemComponent>
													</p>
												) : (
													<p>
														{diagnostic.name}
														<span className="label">{diagnostic.label}</span>
													</p>
												)}
											</div>
										);
									})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</aside>
	);
}

export default EvaluationAsideContainer;
