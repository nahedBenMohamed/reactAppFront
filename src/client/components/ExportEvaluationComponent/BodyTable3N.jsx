import { View, Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';

const BodyTable3NSection = ({ t, val }) => {
	const replaceLine = (line) => {
		const regex = /<[^>]+?>/g;
		return line?.replace(regex, '');
	};
	const replaceContent = (content) => {
		if (content && content.length >= 0) {
			const whiteSpacesRemoved = content.replace(/\s/g, '');
			const newLineAdded = whiteSpacesRemoved.replaceAll('</p>', '\n');
			return replaceLine(newLineAdded);
		}
	}
	return (
		<View wrap={false} style={styles.tableRow}>
			<View style={styles.colAccordionDictionary1}>
				<Text style={styles.tableCellTest}>
					{val[0].includes('label_') ? t(`table_head_${val[0]}`) : val[0]}
				</Text>
			</View>
			<View style={styles.colAccordionDictionary2}>
				<Text style={val[1]?.realized_as ? styles.tableCellContent3 : styles.tableCellContent}>
					{val[1]?.count_related
						? val[1].count_related
						: val[1][0]
							? val[1][0]
							: replaceContent(val[1]?.target)
								? replaceContent(val[1]?.target)
								: val[1]?.affects}
				</Text>
			</View>
			{t(`table_head_${val[0]}`) == ' t(`table_head_${val[0]}`)'}
			<View style={styles.colAccordionDictionary3}>
				<Text style={val[1]?.realized_as ? styles.tableCellContent3: styles.tableCellContent}>
					{val[1]?.error_distribution
						? val[1]?.error_distribution
						: val[1][1]
							? replaceContent(val[1][1])
							: replaceContent(val[1]?.realized_as)
								? replaceContent(val[1]?.realized_as)
								: val[1]?.count}
				</Text>
			</View>
		</View>
	);
};

export default BodyTable3NSection;
