import { View } from '@react-pdf/renderer';
import styles from './styleExportPdf';
import TitleTable from './TitleTable'

const HeaderTable2NSection = ({ t, indexTitle, title }) => {
	let word = ['label_word', 'label_word_phonetic_deformity', 'label_word_accentuation_change'];
	let viewStyle;
	if (indexTitle === 0) {
		if (title === 'label_nr') {
			viewStyle = styles.colAccordionWord1;
		} else {
			viewStyle = styles.colAccordionPronunciation1;
		}
	} else {
		if (word.includes(title)) {
			viewStyle = styles.colAccordionWord2;
		} else {
			viewStyle = styles.colAccordionPronunciation2;
		}
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

export default HeaderTable2NSection;
