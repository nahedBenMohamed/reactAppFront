import React, { useState } from 'react';

import FullScreenLoaderContainer from '../../containers/FullScreenLoaderContainer';
import TestModeBodyContainer from '../../containers/TestModeBodyContainer';
import { useDiagnosticsTherapistMode } from './useDiagnosticsTest';
import TherapistTestComponent from '../../components/TherapistTestComponent';
import TherapistTestHeaderComponent from '../../components/TherapistTestHeader';
import PauseScreenComponent from '../../components/PauseScreenComponent';
import { useTimer } from '../../../shared/helpers/hooks/Timer';
import PrehistoryComponent from '../../components/PrehistoryComponent';
import CancelTestPopupComponent from '../../components/CancelTestPopupComponent';
import TherapistInitializedTestComponent from '../../components/TherapistInitializedTestComponent';

export const TherapistModePage = props => {
	const { t } = props;
	const { seconds, start, pause } = useTimer();
	const {
		child,
		diagnostic,
		loader,
		openIntroductionPopUp,
		updateSession,
		getCurrentDianoeticTestContentData,
		TeleportToTheTargetContentReference,
		openTestPageViewInNewWindow,
		generateChildDynamicLink,
		socketClient,
		DataPointer,

		socketTriggerEffect,
		setDataPointer,
		MainDivContentReference,
		diagnosticTestContent
	} = useDiagnosticsTherapistMode(props);

	if (loader && (!child || !diagnostic)) return <FullScreenLoaderContainer />;
	return (
		<div
			ref={MainDivContentReference}
			data-process-percent={
				diagnostic?.session?.process_percent ? Math.trunc(diagnostic?.session?.process_percent) : 0
			}
			data-status={diagnostic?.session?.status}
			className={`test login  ${
				diagnostic?.session.started == 'yes'
					? 'started'
					: diagnostic?.session.started == 'training'
					? 'training'
					: ''
			} ${DataPointer == '0' ? 'first-item' : ''} ${
				DataPointer == diagnosticTestContent?.length - 1 ? ' last-item' : ''
			}
			`}
		>
			<PrehistoryComponent diagnostic={diagnostic} openIntroductionPopUp={openIntroductionPopUp} t={t} />

			<CancelTestPopupComponent t={t} />
			<TherapistTestHeaderComponent
				{...props}
				child={child}
				seconds={seconds}
				diagnostic={diagnostic}
				data={diagnosticTestContent}
				updateSession={updateSession}
				generateChildDynamicLink={generateChildDynamicLink}
				openTestPageViewInNewWindow={openTestPageViewInNewWindow}
				sessionStated={['yes', 'training'].includes(diagnostic?.session.started)}
			/>

			{diagnostic?.session?.status === 'paused' && (
				<PauseScreenComponent
					sessionStatus={diagnostic?.session?.status}
					message={t('diagnostic_test_mode_therapist_pause_screen')}
				/>
			)}

			<TestModeBodyContainer>
				{diagnostic?.session?.status === 'initialized' ? (
					<TherapistInitializedTestComponent
						t={t}
						start={start}
						title={diagnostic?.title}
						updateSession={updateSession}
						prehistory={diagnostic?.prehistory}
						openIntroductionPopUp={openIntroductionPopUp}
					/>
				) : (
					<TherapistTestComponent
						{...props}
						pause={pause}
						start={start}
						diagnosticId={diagnostic?.id}
						DataPointer={DataPointer}
						socketClient={socketClient}
						data={diagnosticTestContent}
						session={diagnostic?.session}
						setDataPointer={setDataPointer}
						socketTriggerEffect={socketTriggerEffect}
						MainDivContentReference={MainDivContentReference}
						getCurrentDianoeticTestContentData={getCurrentDianoeticTestContentData}
						TeleportToTheTargetContentReference={TeleportToTheTargetContentReference}
					/>
				)}
			</TestModeBodyContainer>
		</div>
	);
};

export default TherapistModePage;
