import React from 'react';

export default function CancelTestPopupComponent({ t }) {
	return (
		<div className="cancel-screen" style={{visibility:"visible" , opacity:'1'}}>
			<div className="grid-container">
				<div className="grid-x align-center align-middle">
					<div className="medium-6">
						<div className="callout warning">
							<p dangerouslySetInnerHTML={{ __html: t('diagnostic_test_description_canceled_popup') }} />
							<p>
								<a className="button window-close" onClick={() => window.close()}>
									{t('diagnostic_test_label_close_window_btn')}
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
