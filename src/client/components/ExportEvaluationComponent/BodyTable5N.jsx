import { View, Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';

const BodyTable5NSection = ({ val }) => {
	return (
		<View wrap={false} style={styles.tableRow}>
			<View style={styles.colAccordionSegment1}>
				<Text style={styles.tableCellTest}>{val[0]}</Text>
			</View>

			{Array.from(val[1].columns).map((value, index) => (
				<View style={index == 1 || index == 3 ? styles.colAccordionSegment2 : styles.colAccordionSegment1}>
					{(() => {
						let result = [];
						for (var i = 0; i < value?.length; i++) {
							if (index === 0) {
								result.push(
									<Text style={styles.tableCellContent}>
										{(Array.from(val[1].columns)
											[index]?.replace(/(?:<[^>]+>)/g, '')
											.split('')
											.join('\n\n'))}
									</Text>
								);
							} else {
								result.push(
									<Text style={styles.tableCellContent}>
										{Array.from(val[1].columns)
											[index]?.split('</p>')
											.join('\n\n')
											.replace(/(?:<[^>]+>)/g, '')}
									</Text>
								);
							}
						}
						return result[0];
					})()}
				</View>
			))}
		</View>
	);
};

export default BodyTable5NSection;
