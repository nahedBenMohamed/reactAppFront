// TODO: for now with have to disable href to avoid href HTML warning

/* eslint-disable */

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../config/routes';
import { mapCurrentLocationQueriesToJSON } from '../../../shared/helpers/properties';
import MainAccountComponent from '../../components/MainAccountComponent';
import NavItemComponent from '../../components/NavItemComponent';
import { NavListContainer } from '../NavListContainer';

const DefaultHeader = props => {
	const { SecuritiesState } = props;
	const { t } = props;

	return (
		<header>
			<div className="bar">
				<div className="grid-container">
					<div className="grid-x">
						<div className="cell medium-6">
							<nav className="meta">
							    <ul>
									<li>
										<a href={routes.meta_pages.children.buy_page.navigationPath} target="_blank">
											<span className='entypo entypo-bag'> </span>
											{t('buy')}
										</a>
									</li>
									<li>
										<Link to={routes.meta_pages.children.faq_page.navigationPath}>
											<span className='entypo entypo-lamp'> </span>
											{t('faq')}
										</Link>
									</li>
								</ul>
							</nav>
						</div>
						<MainAccountComponent {...SecuritiesState} />
					</div>
				</div>
			</div>
			<div className="white">
				<div className="grid-container">
					<div className="grid-x">
						<div className="cell large-4 medium-8 small-8">
							<NavItemComponent parentId={'logo'} path="/" textIcons>
								<span className="short">PDSS</span>
								<span className="long">{t('header_text_title')}</span>
							</NavItemComponent>
						</div>
						<div className="cell large-8 medium-4 small-4">
							<nav className="main">
								{SecuritiesState?.hasSession && (
									<>
										<p className="mobile-toggle">
											<a>
												<span className="entypo entypo-menu"></span>
												{t('label_menu')}
											</a>
										</p>

										<NavListContainer
											navList={[
												{
													title: t('dashboard'),
													path: routes.account_pages.navigationPath,
													icon: 'address'
												},
												{
													title: t('child'),
													path: routes.account_pages.children.child_page.navigationPath,
													icon: 'vcard',
													parent: true
												},
												{
													title: t('diagnosis'),
													path:
														routes.account_pages.children.diagnosis_page.navigationPath +
														mapCurrentLocationQueriesToJSON(),
													icon: 'target',
													parent: true
												},
												{
													title: t('evaluation'),
													path:
														routes.account_pages.children.evaluation_page.navigationPath +
														mapCurrentLocationQueriesToJSON(),
													icon: 'chart-area',
													parent: true
												},
												{
													title: t('downloads'),
													path: routes.account_pages.children.downloads_page.navigationPath,
													icon: 'download'
												}
											]}
										/>
									</>
								)}
							</nav>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
};

export default DefaultHeader;
