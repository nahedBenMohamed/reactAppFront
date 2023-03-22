import React from 'react';

import TherapistTestComponent from '../TherapistTestComponent';

function ContentItemComponent(props) {
	const { data, diagnosisSession, content, index, handleExtendAccordionContent, extendContent, diagnosisState } =
		props;
	return (
		<li
			key={index}
			className={
				'accordion-item ' +
				(content.selected_answer
					? content.selected_answer === 'correct'
						? 'answered correct'
						: 'answered incorrect'
					: extendContent.id === content.id
					? ' is-active'
					: '')
			}
			data-accordion-item
			data-id={content.id}
		>
			<div className="accordion-title clearfix" onClick={e => handleExtendAccordionContent(e, content.id)}>
				<span className="inline id">{index + 1}</span>
				<span className="inline name">{content.name ? content.name : content.instruction}</span>
				{diagnosisSession.diagnostic !== 10 && diagnosisSession.diagnostic !== 5 && (
					<span className="inline answer">
						{content.selected_answer ? (content.selected_answer === 'correct' ? 'Richtig' : 'Falsch') : '-'}
					</span>
				)}
			</div>
			{extendContent.id === content.id && extendContent.show && (
				<div className="accordion-content" style={{ display: 'block' }}>
					<div className="test">
						<div className="content">
							<div className="grid-container">
								<TherapistTestComponent
									{...props}
									hideInEvaluation={true}
									diagnosticId={content?.diagnostic}
									DataPointer={index}
									data={data}
									session={diagnosisSession}
									GlobalDiagnosisState={diagnosisState}
									diagnosisSession={diagnosisSession}
									selectedImage={content.target_item}
								/>
							</div>
						</div>
					</div>
				</div>
			)}
		</li>
	);
}

export default ContentItemComponent;
