const MainBreadCrumb = ({ t, currentRouter }) => {
	const pathNames = currentRouter.location.pathname.split('/').filter(x => x);
	if (currentRouter.location.pathname !== '/dashboard'&& currentRouter.location.pathname !== '/dashboard/' ) {
		return (
			<div className="breadcrumb">
				<div className="grid-container">
					<div>
						<p>{t('location')}</p>
						<ul>
							<li key={-1}>
								<a href="/">{t('home')}</a>
							</li>
							{pathNames.map((name, index) => {
								const routeTo = `/${pathNames.slice(0, index + 1).join('/')}`;
								return currentRouter.location.pathname === routeTo ? (
									<li key={index}>{t(name)}</li>
								) : (
									<li key={index}>
										<a href={routeTo}>{t(name)}</a>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</div>
		);
	}
};

export default MainBreadCrumb;
