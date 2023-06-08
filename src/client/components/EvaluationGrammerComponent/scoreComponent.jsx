/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';

const ScoreComponent = ({ grammar, grammar_scores, score_a_label, score_b_label }) => {
	let score_a = 0;
	let score_b = 0;
	let group_name = null;

	const [isOpen, setIsOpen] = useState({});

	const toggleAccordion = index => {
		setIsOpen(prev => ({ ...prev, [index]: !prev[index] }));
	};

	return (
		<div>
			<div className="cell scores">
				<div className="grid-x">
					<div className="cell small-6 green">
						<p>Score A: Grammatische Fähigkeiten</p>
					</div>
					<div className="cell small-6 red">
						<p className="text-right">Score B: Grammatische Symptome</p>
					</div>
				</div>
			</div>

			<div className="cell tabs-panel is-active">
				<ul className="accordion values" data-accordion data-multi-expand="true" data-allow-all-closed="true">
					{grammar_scores &&
						grammar_scores
							.filter(i => i.label_score?.includes('Score A'))
							.map((item, index) => {
								let new_group = false;
								if (group_name !== item?.group_name) {
									group_name = item?.group_name;
									new_group = true;
								}

								if (item?.has_score && item?.belongs_to === 0) {
									score_a = score_a + item?.score;
								}

								return (
									<React.Fragment key={index}>
										{new_group && (
											<li
												className={`accordion-item data-accordion-item${isOpen[index] ? " is-active" : ""}`}
												onClick={() => toggleAccordion(index)}
											>
												<a className="accordion-title">
													<span className="name">{group_name}</span>
													<span className="sums">
														<span className="score_a">
															<span className="value">
																{grammar_scores?.find(e => e.group_name === group_name)
																	?.a || 0}
															</span>
															/
															<span className="total">
																{grammar_scores?.find(e => e.group_name === group_name)
																	?.a_total || 0}
															</span>
														</span>
														<span className="score_b">
															<span className="value">
																{grammar_scores?.find(e => e.group_name === group_name)
																	?.b || 0}
															</span>
															/
															<span className="total">
																{grammar_scores?.find(e => e.group_name === group_name)
																	?.b_total || 0}
															</span>
														</span>
													</span>
												</a>

												{isOpen[index] && (
													<div className="grid-x grid-padding-x grid-padding-y">
														<div className="cell small-5">
															<p>{item.label}</p>
														</div>
														<div className="cell small-1 text-right" data-ref={item.id}>
															<p className="count green">
																<span className="value">
																	{item.has_score ? item.score : 0}
																</span>
																/<span className="total">{item.score}</span>
															</p>
														</div>
														{grammar_scores
															.filter(b_item => b_item?.label_score?.includes('Score B'))
															.map((b_item, b_index) => {
																if (b_item.belongs_to === item.ref) {
																	let num_matches_in_ref = 0;
																	num_matches_in_ref += 1;

																	if (b_item.has_score) {
																		score_b = score_b + b_item.score;
																	}

																	return (
																		<React.Fragment key={b_index}>
																			<div
																				className={`cell small-5${
																					num_matches_in_ref > 1
																						? ' small-offset-6'
																						: ''
																				}`}
																			>
																				<p>{b_item.label}</p>
																			</div>
																			<div
																				className="cell small-1 text-right"
																				data-ref={b_item.id}
																			>
																				<p className="count red">
																					<span className="value">
																						{b_item.has_score
																							? b_item.score
																							: 0}
																					</span>
																					/
																					<span className="total">
																						{b_item.score}
																					</span>
																				</p>
																			</div>
																		</React.Fragment>
																	);
																}
																return null;
															})}
													</div>
												)}
											</li>
										)}
									</React.Fragment>
								);
							})}
				</ul>
			</div>
		</div>
	);
};

export default ScoreComponent;
