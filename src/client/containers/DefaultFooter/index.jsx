import React from 'react';

export const DefaultFooter = (props) => {
	const { t } = props;
	const thisYear = (new Date().getFullYear());
	return (
		<footer>
			<div className="grid-container">
				<div className="elsevier">
					<img src={`${window.location.origin}/files/images/landingpage/wordmark-elsevier.svg`} alt="Elsevier Logo"/>
				</div>
				<div className="info">
					<nav>
						<ul className="clearfix">
							<li>
								<a href="/meta/impressum">{t('impressum')}</a>
							</li>
							<li>
								<a href="https://www.elsevier.com/legal/privacy-policy-de-de" target="_blank">{t('datenschutz')}</a>
							</li>
							<li>
								<a data-open="modal-cookies">{t('datenschutzeinstellungen')}</a>
							</li>
							<li>
								<a href={`${window.location.origin}/files/downloads/all/PDSS_TC_DPA.pdf`}  target="_blank">{t('elsevier_agb')}</a>
							</li>
						</ul>
					</nav>
					<p>Copyright © {thisYear} Elsevier GmbH. {t('footer_text')} <a href="https://www.elsevier.com/legal/cookienotice-de-de" target="_blank">{t('cookie_richtlinien')}</a>.</p>
				</div>
				<div className="relx">
					<a href="https://www.relx.com/" target="_blank">
						<img src={`${window.location.origin}/files/images/landingpage/logo-relxgroup.svg`} alt="RELX Group"/>
					</a>
				</div>
            </div>
		</footer>
	);
};
