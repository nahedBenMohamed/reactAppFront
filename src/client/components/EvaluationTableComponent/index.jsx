// Removed unnecessary `return` statements in the JSX code and used concise arrow functions.
// Combined the filtering and mapping operations for `valueScore` into a single `flatMap` operation.
// Simplified the conditional rendering of `td` elements by using a single `td` element with conditional properties.

import React from 'react';

// EvaluationTableComponent displays a table based on the provided score data
function EvaluationTableComponent({ score, t }) {
	const hiddenElements = ["replaced_letters", "has_replacement", "has_all_correct", "has_all_replaced"]
	return (
		<div className="cell">
			<table>
				<thead>
					<tr>
						{/* Render table headers */}
						{score.head.map((item, index) => (
							<th key={index}>{t(`table_head_${item}`)}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{/* Render table rows */}
					{(score.values && score.values.length > 0) ? (
						score.values.map((valueScore, index) => (
							<tr key={`row-${index}`} className={valueScore.class ? valueScore.class : ''}>
								{/* Render table cells */}
								{Object.entries(valueScore)
									.filter(([key]) => key !== 'class')
									.flatMap(([key, value]) => {
										if (key === 'columns') {
											return value.map((v, idx) => (
												<td key={`${idx}-${v}`} dangerouslySetInnerHTML={{ __html: v }} />
											));
										}
										if (hiddenElements.includes(key)) {
											return;
										}
										const cellValue = t(`table_head_${value}`).includes('table_head_')
											? value
											: t(`table_head_${value}`);
										return (
											<td
												key={`${index}-${key}`}
												dangerouslySetInnerHTML={
													key === 'affection' || key === 'target' || key === 'realized_as'
														? { __html: value }
														: undefined
												}
											>
												{key !== 'target' && key !== 'realized_as' && key !== 'affection' ? cellValue : null}
											</td>
										);
									})}
							</tr>
						))
					) : (
						// Display a message if no matching data is found
						<tr>
							<td colSpan={score.head.length}>{t('table_body_no_matching')}</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default EvaluationTableComponent;
