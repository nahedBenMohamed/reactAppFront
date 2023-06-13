/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { action_evaluation_setGrammars } from '../../../store/actions';

const AnswersComponent = ({
    answers,
    t,
    maxSelect,
    onSelectionChange,
    selectionCount,
    indexGrammerReach,
    grammar,
    session
}) => {
    const [selectedAnswerIds, setSelectedAnswerIds] = useState([]);
    const dispatch = useDispatch();
    
    useEffect(() => {
        // Call the onSelectionChange callback whenever selectedAnswerIds changes
        onSelectionChange(selectedAnswerIds.length);
    }, [selectedAnswerIds, onSelectionChange]);
    
    useEffect(() => {
        if (maxSelect < selectionCount && !indexGrammerReach) setSelectedAnswerIds([]);
    }, [maxSelect, selectionCount]);
    
    useEffect(() => {
        if (grammar?.selected_answers) setSelectedAnswerIds(Array.from(grammar?.selected_answers.split(','), Number));
    }, [grammar]);

    const handleAnswerClick = id => {
        if (selectedAnswerIds.includes(id)) {
            dispatch(action_evaluation_setGrammars({ session, questionId: grammar.id, answers: id, remove: true }));
            setSelectedAnswerIds(selectedAnswerIds.filter(answerId => answerId !== id));
        } else if (selectedAnswerIds.length < maxSelect) {
            dispatch(action_evaluation_setGrammars({ session, questionId: grammar.id, answers: id }));
            setSelectedAnswerIds([...selectedAnswerIds, id]);
        }
    };

    const renderAnswerItems = () => {
        return answers[0].values.map(answer => {
            let additional_class = answer.additional[0]?.class || '';
            let isSelected = selectedAnswerIds.includes(answer.id);
            if (isSelected) {
                additional_class = `${additional_class.replace(' selected', '')} selected`;
            } else {
                additional_class = additional_class.replace(' selected', '');
            }

            return (
                <li
                    key={answer.id}
                    className={additional_class}
                    data-id={answer.question_id}
                    data-belonging={answer.belonging_id}
                    id={answer.id}
                    onClick={() => handleAnswerClick(answer.id)}
                >
                    <p className="">
                        <span className="num">{answer.question_num}</span>
                        <span className="text selected">{answer.answer}</span>
                    </p>

                    <select className="class">
                        <option value="">Bitte wählen</option>
                        {['green', 'red', 'grey'].map(name => (
                            <option key={name} value={name} className={answer.additional[0]?.class === name ? 'selected' : ''}>
                                {t(`classes_${name}`)}
                            </option>
                        ))}
                    </select>

                    <select className="checks" multiple>
                        {['1', '2'].map(name => (
                            <option
                                key={name}
                                value={name}
                                className={answer.additional[0]?.checks?.includes(name) ? 'selected' : ''}
                            >
                                {t(`checks_${name}`)}
                            </option>
                        ))}
                    </select>

                    <span className="reset entypo-back" title={t('title_reset')}></span>
                </li>
            );
        });
    };

    // Render answer items
    return <>{answers && grammar && renderAnswerItems()}</>;
};

export default AnswersComponent;
