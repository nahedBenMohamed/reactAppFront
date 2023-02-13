import { t } from 'i18next';
import React from 'react';
import routes from '../../../config/routes';
import AuthServices from '../../../security/services/AuthService';
import NavItemComponent from '../NavItemComponent';

const MainAccountComponent = ({ currentUser, hasSession }) => {
	const openLoginPage = () => {
		AuthServices.login();
	};
	const logout = () => {
		AuthServices.logout();
	};
	return (
		<div className="cell medium-6">
			{hasSession ? (
				<div className="account">
					<div className="clearfix">
						<p className="indicatior">
							{t('welcome')},{' '}
							{currentUser.given_name
								? currentUser.given_name + ' ' + currentUser.family_name
								: currentUser.email}
						</p>
						<p className="options">
							<NavItemComponent action={logout} title={t('logout')} icon="logout" />
						</p>
					</div>
				</div>
			) : (
				<div className="account">
					<div className="clearfix" onClick={openLoginPage}>
						<p className="indicatior">{t('not_logged_in')}</p>
						<p className="options">
							<NavItemComponent path={routes.securities_pages.login} title={t('register')} icon="login" />
						</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default MainAccountComponent;
