import {View,Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';

const BodyTable2NSection = ({ t, val}) => {
	return (
		<View wrap={false} style={styles.tableRow}>
			<View style={(val[1].word || val[1].value) ? styles.colAccordionWord1 : styles.colAccordionPronunciation1}>
				<Text style={styles.tableCellTest}>
					{val[1].score
						? t(`table_head_${val[0]}`)
						: val[0].includes('label_')
						? t(`table_head_${val[0]}`)
						: val[0]}
				</Text>
			</View>
			<View style={(val[1].word || val[1].value) ? styles.colAccordionWord2 : styles.colAccordionPronunciation2}>
				<Text style={styles.tableCellContent}>
					{val[1].score ? val[1].score : val[1].word ? val[1].word : val[1].value ? val[1].value : val[1]}
				</Text>
			</View>
		</View>
	);
};

export default BodyTable2NSection;
