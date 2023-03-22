import React, { createContext } from 'react';
import { Document, Page, View } from '@react-pdf/renderer';
import HeaderSection from './HeaderSection';
import BarChartSection from './BarChartSection';
import ChildSection from './ChildSection';
import TestDetailsComponent from './TestDetailsComponent';
import styles from './styleExportPdf';

export const ContextResult = createContext({});
export default function ExportEvaluationComponent(props) {

	const { analysisScores } = props;
	const { Provider } = ContextResult;
	return (
		<Document>
			<Page orientation="portrait" size="A4">
				<HeaderSection t={props.t} />
				<ChildSection t={props.t} selectedChild={props.selectedChild} />
				<BarChartSection t={props.t} diagnosticResult={props.analysesList} />
				{analysisScores?.evaluations &&
					analysisScores?.evaluations.length > 0 &&
					analysisScores?.evaluations.map((data, index) => (
						<TestDetailsComponent
							{...props}
							key={index}
							t={props.t}
							testDetails={data}
							child={analysisScores?.child}
							props={props}
						/>
					))}
				<View fixed style={styles.footer}></View>
			</Page>
		</Document>
	);
}
