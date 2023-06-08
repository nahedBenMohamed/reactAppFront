import React, { createContext } from 'react';
import { Document, Page, View } from '@react-pdf/renderer';
import HeaderSection from './HeaderSection';
import BarChartSection from './BarChartSection';
import ChildSection from './ChildSection';
import TestDetailsComponent from './TestDetailsComponent';
import styles from './styleExportPdf';

export const ContextResult = createContext({});
export default function ExportEvaluationComponent(props) {
	const { t, analysisScores, analysesList, selectedChild } = props;
	return (
		<Document title="Export">
			<Page orientation="portrait" size="A4">
				<HeaderSection t={t} />
				<ChildSection t={t} selectedChild={selectedChild} />
				<View fixed style={styles.footer}></View>
			</Page>
			<Page orientation="portrait" size="A4">
				<HeaderSection t={t} />
				<BarChartSection t={t} diagnosticResult={analysesList} />
				<View fixed style={styles.footer}></View>
			</Page>
			{analysisScores?.evaluations &&
				analysisScores?.evaluations.length > 0 &&
				analysisScores?.evaluations.map((data, index) => (
					<Page orientation="portrait" size="A4">
						<HeaderSection t={t} />
						<TestDetailsComponent
							{...props}
							key={index}
							t={props.t}
							testDetails={data}
							child={analysisScores?.child}
						/>
						<View fixed style={styles.footer}></View>
					</Page>
				))}
		</Document>
	);
}
