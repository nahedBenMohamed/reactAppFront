import { Text} from '@react-pdf/renderer';
import styles from './styleExportPdf';
import moment from 'moment';
const ChildSection = ({ t, selectedChild }) => {
	return (
		<>
			<Text style={styles.diagnostic}>{t('label_rapport')}</Text>
			<Text style={styles.child}>
				{selectedChild?.firstName} {selectedChild?.lastName}
				{' (*' + moment(selectedChild?.birthdate).format('DD.MM.YYYY') + ')'}
			</Text>
			<hr style={styles.line}></hr>
			<Text style={styles.date}>
				{t('child_label_created')} {moment(new Date()).format('DD.MM.YYYY HH:mm')}
			</Text>
			<Text style={styles.space}> </Text>
		</>
	);
};

export default ChildSection;
