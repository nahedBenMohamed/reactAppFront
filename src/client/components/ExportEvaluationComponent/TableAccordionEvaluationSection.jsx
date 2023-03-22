import React from 'react';
import { View } from '@react-pdf/renderer';
import styles from './styleExportPdf';
import HeaderTable2NSection from './HeaderTable2N';
import HeaderTable3NSection from './HeaderTable3N';
import HeaderTable4NSection from './HeaderTable4N';
import HeaderTable5NSection from './HeaderTable5N';
import BodyTable2NSection from './BodyTable2N';
import BodyTable3NSection from './BodyTable3N';
import BodyTable4NSection from './BodyTable4N';
import BodyTable5NSection from './BodyTable5N';

const TableAccodionEvaluationSection = ({ t, item }) => {
	return (
		<>
			<View style={styles.table}>
				<View style={styles.tableRow}>
					{item[1].head.map((title, indexTitle) =>
						item[1].head.length == 2 ? (
							<HeaderTable2NSection t={t} title={title} indexTitle={indexTitle} />
						) : item[1].head.length == 3 ? (
							<HeaderTable3NSection t={t} title={title} indexTitle={indexTitle} />
						) : item[1].head.length == 4 ? (
							<HeaderTable4NSection t={t} title={title} indexTitle={indexTitle} />
						) : item[1].head.length == 5 ? (
							<HeaderTable5NSection t={t} title={title} indexTitle={indexTitle} />
						) : (
							''
						)
					)}
				</View>
				{Object.entries(item[1].values).map(val =>
					item[1].head.length == 2 ? (
						<BodyTable2NSection t={t} val={val} />
					) : item[1].head.length == 3 ? (
						<BodyTable3NSection t={t} val={val} />
					) : item[1].head.length == 4 ? (
						<BodyTable4NSection val={val} />
					) : (
						<BodyTable5NSection val={val} />
					)
				)}
			</View>
		</>
	);
};
export default TableAccodionEvaluationSection;
