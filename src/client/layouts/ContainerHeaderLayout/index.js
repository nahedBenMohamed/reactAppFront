import React from 'react';

function ContainerHeaderLayout({ title, children, hideWhiteBox }) {
	return (
		<section>
			<div className="keyvisual">
				<div className="bg"></div>
				<div className="grid-container">
					<div className="grid-x">
						<div className="cell">
							<h1>{title}</h1>
						</div>
					</div>
				</div>
			</div>
			<div className="content">
				<div className="grid-container">
					<div className="grid-x">
						<div className="cell">{hideWhiteBox ? children : <div className="box"> {children}</div>}</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default ContainerHeaderLayout;
