import {View } from '@react-pdf/renderer';
import styles from './styleExportPdf';
import TitleTable from './TitleTable'

const HeaderTable2NSection = ({ t, indexTitle, title }) => {
	let word = ['label_word', 'label_word_phonetic_deformity', 'label_word_accentuation_change'];
	return (
		<View
			wrap={false}
			style={
				indexTitle == 0
					? title == 'label_nr'
						? styles.colAccordionWord1
						: styles.colAccordionPronunciation1
					: word.includes(title)
					? styles.colAccordionWord2
					: styles.colAccordionPronunciation2
			}
		>
			<TitleTable t={t} indexTitle={indexTitle} title={title} />
		</View>
	);
};

export default HeaderTable2NSection;
