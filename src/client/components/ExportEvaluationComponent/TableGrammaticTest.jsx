import { View, Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';

const TableGrammaticTest = ({ analysisGrammarScores}) => {
	let firstScoreLabel = '';
	let secondScoreLabel = '';
	analysisGrammarScores?.items &&
		analysisGrammarScores?.items.length &&
		analysisGrammarScores?.items.map(item =>
			item.belongs_to == 0 ? (firstScoreLabel = item.label_score) : (secondScoreLabel = item.label_score)
		);
	const groupByScoreCategory = analysisGrammarScores?.items
		.filter(i => i.label_score.includes('Score A'))
		.reduce((group, item) => {
			const { group_name } = item;
			group[group_name] = group[group_name] ?? [];
			group[group_name].push(item);
			return group;
		}, {});

	return (
		<>
			<View break style={styles.titleGrammaticTest}>
				<View style={styles.titleRowGrammatic}>
					<View wrap={false} style={styles.colTitleGrammaticTitle1}>
						<Text style={styles.tableCellDetailsTest}>{firstScoreLabel}</Text>
					</View>

					<View wrap={false} style={styles.colTitleGrammaticTitle2}>
						<View style={styles.titleRowGrammatic}>
							<Text style={styles.tableCellDetailsTest}>{secondScoreLabel}</Text>
						</View>
					</View>
				</View>
			</View>
			{Object.entries(groupByScoreCategory ? groupByScoreCategory : '')?.map((item) => {
				const scoreGroup = analysisGrammarScores?.scores?.groups.find(obj => {
					return obj.name == item[0];
				});
				return (
					<View style={styles.tableGrammatic}>
						 <View style={styles.tableRowGrammatic}>
							<View wrap={false} style={styles.colHeaderGrammatic1}>
								<Text style={styles.tableCellDetailsTest}>{item[0]}</Text>
							</View>

							<View wrap={false} style={styles.colHeaderGrammatic2}>
								<View style={styles.tableRowGrammatic}>
									<View style={styles.greenScore}>
										<Text style={styles.grammaticScoreAnswer}>
											{scoreGroup.a}/{scoreGroup.a_total}
										</Text>
									</View>
									<View style={styles.redScore}>
										<Text style={styles.grammaticScoreAnswer}>
											{scoreGroup.b}/{scoreGroup.b_total}
										</Text>
									</View>
								</View>
							</View>
						</View> 
						{item[1].map(a_item => {
							let analysisScoresB = analysisGrammarScores?.items.filter(
								i => i.label_score.includes('Score B') && i.belongs_to == a_item.ref
							);

							return (
								<View style={styles.tableRow}>
									<View wrap={false} style={styles.colGrammatic1}>
										<Text style={styles.tableCellDetailsTest}>{a_item.label}</Text>
									</View>
									<View wrap={false} style={styles.colGrammatic2}>
										<Text style={styles.grammaticDetailsTest}>
											{a_item.has_score ? a_item.score : 0}/{a_item.score}
										</Text>
									</View>

									{!analysisGrammarScores?.items
										.filter(i => i.label_score.includes('Score B'))
										.some(e => e.belongs_to == a_item.ref) ? (
										<>
											<View wrap={false} style={styles.colGrammatic1}>
												<Text style={styles.tableCellDetailsTest}>{''}</Text>
											</View>
											<View wrap={false} style={styles.colGrammatic2}>
												<Text style={styles.grammaticDetailsTest}>{''}</Text>
											</View>
										</>
									) : (
										''
									)}
									{analysisScoresB.length < 2 ? (
										analysisGrammarScores?.items
											.filter(i => i.label_score.includes('Score B'))
											.map(b_item => {
												if (b_item.belongs_to == a_item.ref) {
													return (
														<>
															<View wrap={false} style={styles.colGrammatic1}>
																<Text style={styles.tableCellDetailsTest}>
																	{b_item.label}
																</Text>
															</View>

															<View wrap={false} style={styles.colGrammatic2}>
																<Text style={styles.grammaticDetailsTest}>
																	{b_item.has_score ? b_item.score : 0}/{b_item.score}
																</Text>
															</View>
														</>
													);
												}
											})
									) : (
										<>
											<View wrap={false} style={styles.colGrammatic1}>
												<Text style={styles.tableCellDetailsTest}>
													{analysisScoresB[0].label}
												</Text>
												<Text style={styles.tableCellDetailsTest}>
													{analysisScoresB[1].label}
												</Text>
											</View>

											<View wrap={false} style={styles.colGrammatic2}>
												<Text style={styles.grammaticDetailsTest}>
													{analysisScoresB[0].has_score ? analysisScoresB[0].score : 0}/
													{analysisScoresB[0].score}
												</Text>
												<Text style={styles.grammaticDetailsTest}>
													{' '}
													{analysisScoresB[1].has_score ? analysisScoresB[1].score : 0}/
													{analysisScoresB[1].score}
												</Text>
											</View>
										</>
									)}
								</View>
							);
						})}
						;
					</View>
				);
			})}
		</>
	);
};

export default TableGrammaticTest;
