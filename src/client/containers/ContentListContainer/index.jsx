import React, { useState } from 'react';
import PropTypes from 'prop-types';

import WithReduxConnector from '../../../shared/helpers/hooks/WithReduxConnector';
import ContentItemComponent from '../../components/ContentItemComponent';

function ContentListContainer(props) {
	const { diagnosticContents, diagnosisSession, t } = props;
	const [extendContent, setExtendContent] = useState({ show: false, id: '' });
	const handleExtendAccordionContent = (e, id) => {
		setExtendContent({
			show: extendContent.id === id ? !extendContent.show : true,
			id: id
		});
	};
	return (
		<div className="tabs-panel is-active" id="data">
			<div className="legend clearfix">
				<span className="inline id">{t('Slide')}</span>
				<span className="inline name">{t('Name')}</span>
				{diagnosisSession.diagnostic != 10 && diagnosisSession.diagnostic != 5 && (
					<span className="inline answer">{t('Antwort')}</span>
				)}
			</div>
			<ul className="accordion" data-accordion data-allow-all-closed="true">
				{diagnosticContents &&
					diagnosticContents.map((content, index) => {
						return (
							<ContentItemComponent
								{...props}
								content={content}
								data={diagnosticContents}
								diagnosisSession={diagnosisSession}
								key={index}
								index={index}
								handleExtendAccordionContent={handleExtendAccordionContent}
								extendContent={extendContent}
								t={t}
							/>
						);
					})}
			</ul>
		</div>
	);
}

ContentListContainer.prototype = {
	action_diagnosis_storeDiagnosticTestResultBySession: PropTypes.func.isRequired
};
export default WithReduxConnector(ContentListContainer, state => ({
	SecuritiesState: state.GlobalSecuritiesSate,
	diagnosisState: state.GlobalDiagnosisState
}));
