import moment from 'moment';
import { Link } from 'react-router-dom';

import routes from '../../../config/routes';
import { mapCurrentLocationQueriesToJSON } from '../../../shared/helpers/properties';

const TherapistTestHeaderComponent = props => {
	const {
		t,
		data,
		sessionStated,
		updateSession,
		child,
		diagnostic,
		openTestPageViewInNewWindow,
		generateChildDynamicLink,
		seconds
	} = props;

	return (
		<div className="header">
			<div className="grid-container">
				<div className="grid-x">
					<div className="cell medium-5 hide-for-small-only">
						<div className="option-links">
							<p className="child-name">
								<span className="entypo-down-open"></span>
								{child?.firstName} {child?.lastName}
							</p>
							<ul>
								<li>
									<Link
										target="_blank"
										to={`${routes.test_pages.navigationPath}${mapCurrentLocationQueriesToJSON()}`}
									>
										<span className="entypo-forward"></span>
										<span className="text">
											{t('diagnostic_test_mode_therapist_header_dropdown_btn_new_tab')}
										</span>
									</Link>
								</li>
								<li>
									<a
										onClick={() =>
											openTestPageViewInNewWindow(
												generateChildDynamicLink({
													session: diagnostic?.session.session
												})
											)
										}
										className="child-link"
									>
										<span className="entypo-forward"></span>
										<span className="text">
											{t('diagnostic_test_mode_therapist_header_dropdown_btn_child_mode_new_tab')}
										</span>
									</a>
								</li>
								<li>
									<a
										className="send-via-mail"
										to="#"
										onClick={e => {
											e.preventDefault();
											window.location.href = `mailto:?subject=PDSS%20Kindermodus-Link&body=${generateChildDynamicLink(
												{
													session: diagnostic?.session.session
												}
											)}`;
										}}
									>
										<span className="entypo-paper-plane"></span>
										<span className="text">
											{t(
												'diagnostic_test_mode_therapist_header_dropdown_btn_send_child_mode_via_mail'
											)}
										</span>
									</a>
								</li>
								<li>
									<a
										onClick={e => {
											e.preventDefault();

											navigator.clipboard.writeText(
												window.location.origin +
													generateChildDynamicLink({
														session: diagnostic?.session.session
													})
											);
										}}
										className="link-copy"
									>
										<span className="entypo-clipboard"></span>
										<span className="text">
											{t(
												'diagnostic_test_mode_therapist_header_dropdown_btn_copy_child_mode_link'
											)}
										</span>
									</a>
								</li>
								<li>
									<Link
										className="cancel-test"
										onClick={() =>
											updateSession(
												'cancel_session',
												t('diagnostic_test_label_close_confirm_msg')
											)
										}
									>
										<span className="entypo-cancel-squared"></span>
										<span className="text">
											{t('diagnostic_test_mode_therapist_header_dropdown_btn_test_cancel')}
										</span>
									</Link>
									<Link className="close-test" href="javascript:close();">
										<span className="entypo-cancel-squared"></span>
										<span className="text">
											{t('diagnostic_test_mode_therapist_header_dropdown_btn_label_close_window')}
										</span>
									</Link>
								</li>
							</ul>
						</div>
					</div>
					<div className="cell medium-2 small-4 text-center small-only-text-left">
						<p className="test-name">{diagnostic?.title}</p>
					</div>
					<div className="cell medium-5 small-8">
						<ul className="status clearfix text-right">
							<li className="slides">
								<p className="clearfix">
									<span className="entypo-archive"></span>

									<span className="current">
										{diagnostic?.session?.current_slide + (sessionStated ? 1 : 0)}
									</span>
									<span className="separator">/</span>
									<span className="total">{diagnostic?.diagnostic_content_length}</span>
								</p>
								<div className="overview">
									<ul>
										{data?.map(({ name, instruction, selected_answer }, indexDiag) => (
											<li
												key={indexDiag}
												onClick={() => {
													console.log('indexDiag', indexDiag);
													updateSession('jump_slide', indexDiag);
												}}
											>
												<a className="go-to-slide clearfix">
													<span className="num">{indexDiag + 1}</span>
													<span className="name">{name || instruction}</span>
													<span className={`status ${selected_answer || ' '}`}>
														<span className="entypo-check"></span>
														<span className="entypo-cancel"></span>
													</span>
												</a>
											</li>
										))}
									</ul>
								</div>
							</li>
							{diagnostic?.session && (
								<li className="process">
									<p className="percent">{Math.trunc(diagnostic?.session?.process_percent)}%</p>
									<div className="bg">
										<span
											className="bar"
											style={{ width: `${diagnostic?.session?.process_percent}%` }}
										></span>
									</div>
								</li>
							)}
							<li className="time">
								<p>
									<span className="entypo-clock"></span>
									<span className="value"> {moment.utc(seconds * 1000).format('HH:mm:ss')}</span>
								</p>
							</li>
						</ul>
					</div>
				</div>
				<div className="grid-x process-for-child">
					<div className="cell">
						<div className="bg">
							<span className="bar" style={{ width: '10%' }}></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TherapistTestHeaderComponent;
