import { View, Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';

const BodyTable3NSection = ({ t, val }) => {
		return (
			<View wrap={false} style={styles.tableRow}>
				<View style={styles.colAccordionDictionary1}>
					<Text style={styles.tableCellTest}>
						{val[0].includes('label_') ? t(`table_head_${val[0]}`) : val[0]}
					</Text>
				</View>
				<View style={styles.colAccordionDictionary2}>
					<Text  style={styles.tableCellContent}>
						{val[1]?.count_related
							? val[1].count_related
							: val[1][0]
							? val[1][0]
							: val[1]?.target?.replace(/(<([^>]+)>)/gi, '')
							? val[1]?.target?.replace(/(<([^>]+)>)/gi, '')
							: val[1]?.affects}
					</Text>
				</View>
				{t(`table_head_${val[0]}`) == ' t(`table_head_${val[0]}`)'}
				<View style={styles.colAccordionDictionary3}>
					<Text  style={styles.tableCellContent}>
						{val[1]?.error_distribution
							? val[1]?.error_distribution
							: val[1][1]
							? val[1][1].replace(/(<([^>]+)>)/gi, '')
							: val[1]?.realized_as?.replace(/(<([^>]+)>)/gi, '')
							? val[1]?.realized_as?.replace(/(<([^>]+)>)/gi, '')
							: val[1]?.count}
					</Text>
				</View>
			</View>
		);
};

export default BodyTable3NSection;
