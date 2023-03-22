import { View } from '@react-pdf/renderer';
import styles from './styleExportPdf';
import TitleTable from './TitleTable';

const HeaderTable3NSection = ({ t, indexTitle, title }) => {
	return (
		<View
			wrap={false}
			style={
				indexTitle == 0
					? styles.colAccordionDictionary1
					: indexTitle == 1
					? styles.colAccordionDictionary2
					: styles.colAccordionDictionary3
			}
		>
			<TitleTable t={t} indexTitle={indexTitle} title={title} />
		</View>
	);
};

export default HeaderTable3NSection;
