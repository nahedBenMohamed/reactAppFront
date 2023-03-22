import React from 'react';

function EvaluationTableComponent({ score, t, accordion }) {
	return (
		<div className="cell">
			<table>
				<thead>
					<tr>
						{score.head.map((item, index) => {
							return <th key={index}>{t(`table_head_${item}`)}</th>;
						})}
					</tr>
				</thead>

				<tbody>
					{score.values ? (
						score.values.map((valueScore, index) => {
							return (
								<tr key={index}>
									{Object.entries(valueScore).map(([key, value], index) => {
										if (key == 'columns' || key == 'replaced_letters') {
											return value.map(v => {
												return (
													<td
														key={index}
														dangerouslySetInnerHTML={{
															__html: v
														}}
													></td>
												);
											});
										} else if (key == 'target' || key == 'realized_as')
											return (
												<td
													key={index}
													dangerouslySetInnerHTML={{
														__html: value
													}}
												></td>
											);
										else if (key !== 'class')
											return (
												<td key={index}>
													{t(`table_head_${value}`).includes('table_head_')
														? value
														: t(`table_head_${value}`)}
												</td>
											);
									})}
								</tr>
							);
						})
					) : (
						<tr>
							<td colspan={score.head.length}>{t('table_body_no_matching')} </td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default EvaluationTableComponent;
