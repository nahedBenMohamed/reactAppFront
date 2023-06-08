import moment from 'moment';
import { memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import reactStringReplace from 'react-string-replace';
import routes from '../../../config/routes';
import { CryptoProviders, getItemsFromCookies } from '../../../shared/helpers/properties';
import { selectSearchStatus, selectSearchText } from '../../../store/reducers/diagnosis.reducer';
import NavItemComponent from '../NavItemComponent';
import PdssConfirmPopup from '../PdssConfirmPopupComponent';

const PdssTableComponent = props => {
	const { data, t, headers, handleDelete, handleCancel, handleConfirm, showDeletePopup } = props;
	const searchText = useSelector(selectSearchText);
	const searchStatus = useSelector(selectSearchStatus);

	const handleResume = diagnosisSession => event => {
		event.preventDefault();
		window.open(
			`${routes.test_pages.navigationPath}?id=${diagnosisSession.diagnostic}&child=${
				diagnosisSession.child
			}&token=${CryptoProviders(
				JSON.stringify({
					child: diagnosisSession.child,
					diagnosticId: diagnosisSession.diagnostic,
					diagnosisTitle: diagnosisSession.title,
					CFToken: getItemsFromCookies('token')
				})
			).hashIt()}&session=${diagnosisSession.session}`,
			'_blank',
			'toolbar=0,location=0,menubar=0'
		);
	};

	const CustomRenderCell = (data, header) => {
		switch (header.className) {
			case 'title':
				return (
					<p className={header.className}>
						{searchText.length > 0 && searchStatus
							? reactStringReplace(data[header.id], searchText, (match, i) => {
									return <span className="highlight">{data[header.id]}</span>;
							  })
							: data[header.id]}
					</p>
				);
			case 'datetime':
				return <p className={header.className}>{moment(data[header.id]).format('DD.MM.YYYY HH:mm')}</p>;
			case 'duration':
				return <p className={header.className}>{moment.utc(data[header.id] * 1000).format('HH:mm:ss')}</p>;
			case 'status':
				return (
					<p className={header.className}>
						{t(`diagnosis_Expand_status_${data[header.id]}`)}
						{data[header.id] === 'training' ? ' (Training)' : null}
					</p>
				);
			case 'bar':
				return (
					<p className="process">
						<span className="percent">{data[header.id]}%</span>
						<span className="bg">
							<span className="bar" style={{ width: `${data[header.id]}%` }}></span>
						</span>
					</p>
				);
			case 'options':
				return (
					<p className="options text-right">
						<NavItemComponent className="resume-test" icon="video" action={handleResume(data)} />
						<NavItemComponent className="remove-test" icon="trash" action={handleDelete(data)} />
					</p>
				);
		}
	};
	const CustomRenderHeader = header => {
		return <p className={`${header.className} ${header.extendedClassName}`}>{t(header.title)}</p>;
	};

	return (
		<>
			{useMemo(() => {
				return (
					<div className="tests">
						<div>
							<ul>
								<li className="headline" key='headline'>
									{headers.map(element => {
										return CustomRenderHeader(element);
									})}
								</li>
								{data && data.length ? (
									data.map(row => {
										return (
											<li key={row.id}>
												{headers.map(header => {
													return CustomRenderCell(row, header);
												})}
											</li>
										);
									})
								) : (
									<li>
										<p>{t('diagnosis_Expand_label_no_tests')}</p>
									</li>
								)}
							</ul>
						</div>
					</div>
				);
			})}
			<PdssConfirmPopup
				ConfirmPopup={handleConfirm}
				closePopup={handleCancel}
				title={t('diagnosis_session_confirm_delete_title')}
				description={t('diagnosis_session_confirm_delete')}
				show={showDeletePopup.show}
			/>
		</>
	);
};

export default memo(PdssTableComponent);
