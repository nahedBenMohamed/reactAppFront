import { View } from '@react-pdf/renderer';
import styles from './styleExportPdf';
import TitleTable from './TitleTable';

const HeaderTable3NSection = ({ t, indexTitle, title }) => {
	let viewStyle;
	if (indexTitle === 0) {
		viewStyle = styles.colAccordionDictionary1;
	} else if (indexTitle === 1) {
		viewStyle = styles.colAccordionDictionary2;
	} else {
		viewStyle = styles.colAccordionDictionary3;
	}

	return (
		<View
			wrap={false}
			style={viewStyle}
		>
			<TitleTable t={t} indexTitle={indexTitle} title={title} />
		</View>
	);
};

export default HeaderTable3NSection;
