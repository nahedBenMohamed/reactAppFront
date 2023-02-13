import React from 'react';
import routes from '../../../config/routes';
import { mapCurrentLocationQueriesToJSON } from '../../../shared/helpers/properties';
import ContentListContainer from '../../containers/ContentListContainer';
import EvaluationListContainer from '../../containers/EvaluationListContainer';
import FullScreenLoaderContainer from '../../containers/FullScreenLoaderContainer';
import NavItemComponent from '../NavItemComponent';

function DiagnosisSessionTabsComponent({
	diagnosisSession,
	t,
	diagnosticContents,
	handleClickTab,
	tabSelected,
	analysesResult,
	loader
}) {
	if (loader) return <FullScreenLoaderContainer />;
	return (
		<div className="results">
			<h3>{t('session_tabs_details')}</h3>
			<ul className="tabs">
				<li className={`tabs-title ${tabSelected == 1 ? ' is-active' : ''}`}>
					<NavItemComponent
						path={
							routes.account_pages.children.evaluation_page.children.result_page.navigationPath +
							mapCurrentLocationQueriesToJSON({
								session: diagnosisSession.session
							})
						}
						title={t('tab_answer')}
						action={e => handleClickTab(e, 1)}
					/>
				</li>
				<li className={`tabs-title ${tabSelected == 2 ? ' is-active' : ''}`}>
					<NavItemComponent
						path={
							routes.account_pages.children.evaluation_page.children.result_page.navigationPath +
							mapCurrentLocationQueriesToJSON({
								session: diagnosisSession.session
							})
						}
						title={t('tab_result')}
						action={e => handleClickTab(e, 2)}
					/>
				</li>
				{diagnosisSession.diagnostic == 5 && (
					<li className={`tabs-title ${tabSelected == 3 ? ' is-active' : ''}`}>
						{' '}
						<NavItemComponent
							path={
								routes.account_pages.children.evaluation_page.children.result_page.navigationPath +
								mapCurrentLocationQueriesToJSON({
									session: diagnosisSession.session
								})
							}
							title={t('tab_score')}
							action={e => handleClickTab(e, 3)}
						/>
					</li>
				)}
			</ul>
			{loader ? (
				<FullScreenLoaderContainer />
			) : (
				<div className="tabs-content" data-tabs-content="results-tabs">
					{tabSelected == 1 && (
						<ContentListContainer
							diagnosisSession={diagnosisSession}
							t={t}
							diagnosticContents={diagnosticContents}
						/>
					)}
					{tabSelected == 2 && analysesResult && (
						<EvaluationListContainer t={t} scores={analysesResult} handleClickTab={handleClickTab} />
					)}
				</div>
			)}
		</div>
	);
}

export default DiagnosisSessionTabsComponent;
