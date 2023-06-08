import { View, Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';
import { replaceLine } from '../../../shared/helpers/properties';

const BodyTable4NSection = ({ val }) => {
	return (
		<View style={styles.tableRow}>
			<View style={styles.colAccordionSegment1}>
				<Text style={styles.tableCellTest}>{val[0]}</Text>
			</View>
			{Object.values(val[1].columns).map((value, index) => (
				<View style={index == 0 ? styles.colAccordionSegment1 : styles.colAccordionSegment3}>
					{(() => {
						let result = [];
						for (let i = 0; i < value?.length; i++) {
							if (index == 0) {
								result.push(
									<Text style={styles.tableCellContent}>
										{replaceLine(value)
											.split('')
											.join('\n\n')}
									</Text>
								);
							} else {
								result.push(
									<Text style={styles.tableCellContent}>
										{replaceLine(value
											?.split('</p>')
											.join('\n\n'))}
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

export default BodyTable4NSection;
