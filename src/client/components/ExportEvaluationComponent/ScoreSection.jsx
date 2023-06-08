import React from 'react';
import { View, Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';
const ScoreSection = ({ t, test, id }) => {
	const testDetails = test?.values;
	const interpretation = test?.interpretation;
	const color = interpretation < 0 ? '#b13633' : '#5fb157';
	const text = interpretation == 0 ? '#b13633' : '#5fb157';
	const testTypes = [
		{
			title: t('score_label_raw_value'),
			value: testDetails.raw_value,
			label: 'rawValue'
		},
		{
			title: t('score_label_score'),
			value: testDetails.score,
			label: 'score'
		},
		{
			title: t('score_label_tvalue'),
			value: testDetails.tvalue,
			label: 'tvalue'
		},
		{
			title: t('score_label_confidence_interval'),
			value: testDetails.confidence_interval,
			label: 'confidenceInterval'
		}
	];
	return (
		<>
			<View wrap={false} style={styles.tableScore}>
				<View style={styles.tableScoreRow}>
					{testTypes &&
						testTypes.map((item, index) => {
							return (
								<>
									<View
										key={index}
										style={{
											borderTop: `2px solid ${item.label == 'tvalue' ? color : '#4d4d4d'}`,
											width: '25%',
											borderWidth: 0.3,
											borderLeftWidth: 0,
											borderTopWidth: 3
										}}
									>
										<Text style={styles.tableCellScoreAnswer}>
											{item.title == t('score_label_raw_value') && id != 5
												? Math.trunc(item.value)
												: item.value}
										</Text>
										<Text style={styles.tableCellTestTitle}>{item.title}</Text>
									</View>
								</>
							);
						})}
				</View>
			</View>
			<View style={styles.tableNote}>
				<View style={styles.tableNoteRow}>
					<View style={styles.tableNoteContent}>
						<Text style={styles.description}>
							{t('score_interpretation_first_label')}
							<Text style={styles.diagnosticSectionTitle}>
								{t(`score_interpretation_${interpretation}_label`)}
							</Text>
							{t('score_interpretation_end_label')}
						</Text>
					</View>
				</View>
			</View>
		</>
	);
};

export default ScoreSection;
