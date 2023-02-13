import moment from 'moment';
import React from 'react';
import { Link } from 'react-router-dom';

function AnalysesProfileComponent({ t, analysesList, format }) {
	return (
		<>
			<ul className={'profile clearfix ' + (format === 'full' ? format : '')}>
				{analysesList &&
					analysesList.map((diagnostic, index) => {
						if (diagnostic.has_sublabel === 'no') {
							let value = diagnostic.tvalue;
							let min = 40;
							let max = 60;
							let color = '';
							{
								value >= min ? (color = 'green') : (color = 'red');
							}
							return (
								<li className={value ? 'has-profile' : ''} key={index}>
									<div className="container">
										<div className="ranges">
											<div className="above" style={{ height: 100 - max + '%' }}></div>
											<div
												className="average"
												style={{ height: max - min + '%', bottom: min + '%' }}
											></div>
											<div className="below" style={{ height: min + '%' }}></div>
										</div>
										{value ? (
											<div className={`indicator ${color}`} style={{ bottom: value + '%' }}>
												<p className="value">
													<Link>{value}</Link>
												</p>
												<p className="overflow">
													{moment(diagnostic.date_finished).format('DD.MM.YYYY HH:mm')}:{' '}
													<span className="value">{value}</span>
												</p>
											</div>
										) : null}
										<p className="label">{diagnostic.label}</p>
									</div>
								</li>
							);
						}
					})}
			</ul>
			{format === 'full' ? (
				<ul className="legend clearfix">
					{analysesList &&
						analysesList
							.filter(d => d.has_sublabel === 'no')
							.map(diagnostic => {
								let prefix = '';
								return (
									<li key={diagnostic.id}>
										{analysesList
											.filter(
												t => t.has_sublabel === 'yes' && t.diagnostic === diagnostic.diagnostic
											)
											.map(test => {
												prefix = test.name;
											})}

										<p>{prefix ? prefix + ': ' + diagnostic.name : diagnostic.name} </p>
									</li>
								);
							})}
				</ul>
			) : null}
		</>
	);
}

export default AnalysesProfileComponent;
