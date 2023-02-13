import { t } from 'i18next';
import { Fragment } from 'react';

export default props => {
	const { diagnosticId, questionData, t } = props;

	const ShowExtendedQuestions = ({ children, hide }) =>
		[2, 7, 6, 9].includes(Number(diagnosticId)) && questionData && !hide ? (
			<div className="extended">
				<h3>{t('subheadline_results_extended')}</h3>
				{children}{' '}
			</div>
		) : null;
	const MapDataToExtendedQuestionView = ({ dataType, data, content }) => {
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
									<a className="button correct  ">
										<span className="entypo-check"></span>
									</a>
								</div>
								<div className="cell small-6">
									<a className="button incorrect selected">
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
						<div class="cell" data-answer-id={data}>
							<input type="checkbox" id={`${data}_${content?.id}`} />
							<label for={`${data}_${content?.id}`}>{t(data)}</label>
						</div>
					</div>
				);

			default:
				return null;
		}
	};
	return { ShowExtendedQuestions, MapDataToExtendedQuestionView };
};
