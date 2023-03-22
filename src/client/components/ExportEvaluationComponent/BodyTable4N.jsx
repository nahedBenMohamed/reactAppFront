import { View, Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';

const BodyTable4NSection = ({ val }) => {
	return (
		<View style={styles.tableRow}>
			<View style={styles.colAccordionSegment1}>
				<Text style={styles.tableCellTest}>{val[0]}</Text>
			</View>
			{Object.values(val[1].columns).map((value, index) => (
				<View style={index == 0 ? styles.colAccordionSegment1 : styles.colAccordionSegment3}>
					{(() => {
						for (var i = 0; i < value?.length; i++) {
							if (index === 0) {
								return (
									<Text style={styles.tableCellContent}>
										{value
											?.replace(/(<([^>]+)>)/gi, '')
											.split('')
											.join('\n\n')}
									</Text>
								);
							} else {
								return (
									<Text style={styles.tableCellContent}>
										{value
											?.split('</p>')
											.join('\n\n')
											.replace(/(<([^>]+)>)/gi, '')}
									</Text>
								);
							}
						}
					})()}
				</View>
			))}
		</View>
	);
};

export default BodyTable4NSection;
