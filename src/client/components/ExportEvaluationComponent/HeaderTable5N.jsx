import { View } from '@react-pdf/renderer';
import styles from './styleExportPdf';
import TitleTable from './TitleTable';

const HeaderTable5NSection = ({ t, indexTitle, title }) => {
	return (
		<View
			wrap={false}
			style={indexTitle == 2 || indexTitle == 4 ? styles.colAccordionSegment2 : styles.colAccordionSegment1}
		>
			<TitleTable t={t} indexTitle={indexTitle} title={title} />
		</View>
	);
};

export default HeaderTable5NSection;
