import React from 'react';
import {  Text } from '@react-pdf/renderer';
import styles from './styleExportPdf';
import TableAccodionEvaluationSection from './TableAccordionEvaluationSection';
const AccordionDictionarySection = ({ t, dataAccordion }) => {
	return Object.entries(dataAccordion).map(item => (
		<>
			<Text style={styles.diagnosticTableTitle}>{item[0]}</Text>
			<TableAccodionEvaluationSection t={t} item={item} />
		</>
	));
};
export default AccordionDictionarySection;
