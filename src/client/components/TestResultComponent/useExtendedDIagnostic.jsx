import { createRef, useRef, useState } from 'react';
import PdssExtendedResultComponent from '../PdssExtendedResultComponent';

export default props => {
	const {
		diagnosticId,
		questionData,
		t,
		selectExtendedAnswer,
		hideInEvaluation,
		selectClassificationAdditionalOptionAnswer,
		selectExtrasQuestionsAnswer
	} = props;

	const [checkListReferences, setCheckListReferences] = useState(null);
	const ShowExtendedQuestions = ({ children, hide }) =>
		diagnosticId === 5 ? (
			<div className="diagnostic-content-extended always-show">
				<h3>{t('subheadline_results_extended')}</h3>
				{children[1]}
			</div>
		) : ([2, 7, 6, 9,10].includes(Number(diagnosticId)) || [2, 7, 6, 9,10].includes(Number(questionData.diagnostic))) &&
		  questionData &&
		  !hide ? (
			<div className="extended">
				<h3>{t('subheadline_results_extended')}</h3>
				{children[0]}
			</div>
		) : null;

	const MapDataToExtendedQuestionView = ({ dataType, data, content, answer_id, defaultAnswers, display }) => {
		if (!display) return;
		const setCheckMarksValues = answer => selectExtendedAnswer({ [answer_id]: answer });
		switch (dataType) {
			case 'enum':
				return (
					<div className={`grid-x answered ${dataType}`}>
						<div className="cell small-10">
							<p className="question">{t(data)}</p>
						</div>
						<div className="cell small-2">
							<div className="grid-x">
								<div className="cell small-6">
									<a
										className={`button correct ${
											defaultAnswers[answer_id] === 'correct' ? ' selected ' : ''
										}`}
										onClick={() => setCheckMarksValues('correct')}
									>
										<span className="entypo-check"></span>
									</a>
								</div>
								<div className="cell small-6">
									<a
										className={`button incorrect  ${
											!defaultAnswers[answer_id] || defaultAnswers[answer_id] === 'incorrect'
												? ' selected'
												: ''
										}`}
										onClick={() => setCheckMarksValues('incorrect')}
									>
										<span className="entypo-cancel"></span>
									</a>
								</div>
							</div>
						</div>
					</div>
				);

			case 'checkbox':
				return (
					<div className={`grid-x answered ${dataType}`}>
						<div className="cell" data-answer-id={data}>
							<input
								type="checkbox"
								id={`${data}_${content?.id}`}
								checked={defaultAnswers[answer_id] === 'incorrect' ? true : false}
								onChange={e =>
									selectExtendedAnswer({
										[answer_id]: e.target.checked ? 'incorrect' : 'correct'
									})
								}
							/>
							<label for={`${data}_${content?.id}`}>{t(data)}</label>
						</div>
					</div>
				);
			case 'phonetic': {
				return <PdssExtendedResultComponent {...props} />;
			}
			default:
				return null;
		}
	};

	const MapTheExtraQuestionWithNeededViewPortal = ({ extraContent }) => {
		if (!extraContent || extraContent.length === 0) return null;

		const setAdditionalOptionsContent = (qValue, cId) =>
			selectClassificationAdditionalOptionAnswer({ id: cId, value: qValue });

		const setTextContent = (qValue, qId, questionNumber) =>
			selectExtrasQuestionsAnswer({ question_id: qId, answer: qValue, questionNumber });

		const setCheckBoxContent = (cValue, qId) =>
			selectExtrasQuestionsAnswer({ question_id: qId, answer: cValue ? 'checked' : '' });

		const addAdditionalObjects = ({ checksContent, selectedClass, classificationItem, value }) => {
			if (!checksContent?.includes(value)) {
				// e.target.parentNode.parentElement.classList.add(
				// 	'selected'
				// );
				setAdditionalOptionsContent(
					{
						class: selectedClass,
						checks: [...checksContent, value]
					},
					classificationItem.id
				);
			} else {
				// e.target.parentNode.parentElement.classList.remove(
				// 	'selected'
				// );
				setAdditionalOptionsContent(
					{
						class: selectedClass,
						checks: [...checksContent.filter(x => x != value)]
					},
					classificationItem.id
				);
			}
		};

		const pickQuestionViewByType = (
			{ type, label, answer, id, label_detail, question_id, questionAnswer, classificationResults },
			{ loopIndex }
		) => {
			switch (type) {
				case 'text':
					return (
						<div className="cell">
							<label for={question_id}>
								<span className="num"> {loopIndex + 1} .</span>
								<span className="text" dangerouslySetInnerHTML={{ __html: label }} />
							</label>
							<input
								type="text"
								id={question_id}
								defaultValue={questionAnswer}
								onBlur={event =>
									questionAnswer != event.target.value &&
									setTextContent(event.target.value, question_id, loopIndex + 1)
								}
							/>
							<div className="speech_recognition">
								<span className="entypo entypo-mic"></span>
							</div>
						</div>
					);
				case 'checkbox':
					return (
						<div className="cell">
							<input
								type="checkbox"
								id={question_id}
								checked={questionAnswer === 'checked' ? true : false}
								onChange={event => setCheckBoxContent(event.target.checked, question_id)}
							/>
							<label for={question_id}> {label} </label>
							{label_detail && label_detail?.length > 0 ? (
								<>
									<span className="entypo entypo-info"></span>
									<div className="label_detail">
										<p dangerouslySetInnerHTML={{ __html: label_detail }} />
									</div>
								</>
							) : null}
						</div>
					);
				case 'classification':
					return (
						<div className="cell" onClick={() => checkListReferences && setCheckListReferences(null)}>
							<label for={question_id}>{label}</label>
							<div className="legend">
								<p>
									<span className="green"></span>Vollständig
								</p>
								<p>
									<span className="red"></span>Unvollständig
								</p>
								<p>
									<span className="grey"></span>Elipse
								</p>
							</div>
							<div className="answers" id={id}>
								<ul>
									{classificationResults.map(classificationItem => {
										let additionalData = JSON.parse(classificationItem?.additional);
										let selectedClass = additionalData?.class;
										let checksContent =
											additionalData?.checks?.length > 0 ? additionalData?.checks : [];

										return (
											<li
												className={selectedClass}
												data-id={question_id}
												data-belonging={classificationItem.belonging_id}
												id={classificationItem.id}
												key={'classification_' + classificationItem.id}
											>
												<p>
													<span className="num">{classificationItem.belonging_id}.</span>
													<span className="text"> {classificationItem.answer}</span>
												</p>

												<select
													className="class"
													onChange={e =>
														setAdditionalOptionsContent(
															{ class: e.target.value },
															classificationItem.id
														)
													}
												>
													<option>Bitte wählen</option>

													<option value={'green'} selected={selectedClass == 'class'}>
														{t('label_classification_question_classes.green')}
													</option>
													<option value={'red'} selected={selectedClass == 'class'}>
														{t('label_classification_question_classes.red')}
													</option>
													<option value={'grey'} selected={selectedClass == 'class'}>
														{t('label_classification_question_classes.grey')}
													</option>
												</select>

												{selectedClass == 'red' && (
													<div
														id="ms-list-2"
														className={`ms-options-wrap ms-active ${
															checksContent.length > 0 ? 'ms-has-selections' : ' '
														} `}
													>
														<button
															type="button"
															onClick={e => {
																e.stopPropagation();
																setCheckListReferences(
																	checkListReferences !== classificationItem?.id
																		? classificationItem?.id
																		: null
																);
															}}
														>
															<span>
																{checksContent.length == 1
																	? [
																			'Obligatorisches Satzglied fehlt',
																			'Funktionales Element fehlt'
																	  ][+checksContent[0] - 1]
																	: checksContent.length == 2
																	? '2 ausgewählt'
																	: 'Bitte wählen'}
															</span>
														</button>

														{checkListReferences === classificationItem?.id ? (
															<div
																onClick={e => {
																	e.stopPropagation();
																}}
																className="ms-options"
																style={{ minHeight: '200px', maxHeight: '248px' }}
															>
																<ul style={{ columnCount: '1', columnGap: '0px' }}>
																	<li
																		data-search-term="obligatorisches satzglied fehlt "
																		className={
																			checksContent?.includes('1')
																				? 'selected'
																				: ''
																		}
																	>
																		<label for="ms-opt-3">
																			<input
																				onChange={e =>
																					addAdditionalObjects({
																						checksContent,
																						selectedClass,
																						classificationItem,
																						value: '1'
																					})
																				}
																				type="checkbox"
																				title="Obligatorisches Satzglied fehlt"
																				id="ms-opt-3"
																				value="1"
																			/>
																			Obligatorisches Satzglied fehlt
																		</label>
																	</li>
																	<li
																		data-search-term="funktionales element fehlt"
																		className={
																			checksContent?.includes('2')
																				? 'selected'
																				: ''
																		}
																	>
																		<label for="ms-opt-4">
																			<input
																				onChange={e =>
																					addAdditionalObjects({
																						checksContent,
																						selectedClass,
																						classificationItem,
																						value: '2'
																					})
																				}
																				type="checkbox"
																				title="Funktionales Element fehlt"
																				id="ms-opt-4"
																				value="2"
																			/>
																			Funktionales Element fehlt
																		</label>
																	</li>
																</ul>
															</div>
														) : null}
													</div>
												)}

												<span
													onClick={e =>
														setAdditionalOptionsContent({}, classificationItem.id)
													}
													className="reset entypo-back"
													title={t('subheadline_results_extended')}
												></span>
											</li>
										);
									})}
								</ul>
							</div>
						</div>
					);

				default:
					return;
			}
		};

		return extraContent?.map((qContent, loopIndex) => (
			<div className={`grid-x ${qContent.type}`}>{pickQuestionViewByType(qContent, { loopIndex })}</div>
		));
	};
	return { ShowExtendedQuestions, MapDataToExtendedQuestionView, MapTheExtraQuestionWithNeededViewPortal };
};
