import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapWindowsParamsQueriesToObject } from '../../../shared/helpers/properties';
import {
	Consumer_ChildDemandData,
	Consumer_ChildPickAnswer,
	Provider_CurrentStateToChild,
	Provider_TherapistDiagnosticList
} from '../../../shared/providers/socket';
import { selectSeconds } from '../../../store/reducers/diagnosis.reducer';

export default props => {
	const {
		data,
		GlobalDiagnosisState,
		getCurrentDianoeticTestContentData,
		DataPointer,
		socketTriggerEffect,
		action_diagnosis_updateSession,
		action_diagnosis_storeDiagnosticTestResultBySession,
		SecuritiesState,
		hideInEvaluation,
		diagnosticId,
		diagnosisSession,
		action_diagnosis_timer_on_close
	} = props;

	const childSelectedImage = useRef();
	const childId = mapWindowsParamsQueriesToObject('child');
	const seconds = useSelector(selectSeconds);
	const [close, setClose] = useState(false);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!hideInEvaluation) getCurrentDianoeticTestContentData();
	}, [GlobalDiagnosisState?.diagnostic?.session?.status]);

	//***************************** Child Socket providers ****************************************** */

	const sendBackCurrentStateData = () => {
		data[DataPointer] &&
			Provider_CurrentStateToChild({
				content: data[DataPointer],
				otherDetails: GlobalDiagnosisState?.diagnostic
			});
	};

	useEffect(() => {
		if (socketTriggerEffect?.current) sendBackCurrentStateData();
	}, [data, DataPointer]);

	useEffect(() => {
		if (socketTriggerEffect?.current) {
			let { closeup } = Consumer_ChildDemandData(
				sendBackCurrentStateData,
				GlobalDiagnosisState?.diagnostic?.session.session
			);
			return () => closeup();
		}
	}, [socketTriggerEffect?.current]);

	useEffect(() => {
		if (socketTriggerEffect?.current) {
			//* Child Question response trigger ... *//
			let { closeup } = Consumer_ChildPickAnswer(data => {
				compareToGetAnswerStatus(data?.item);
				childSelectedImage.current = data?.item;
			}, GlobalDiagnosisState?.diagnostic?.session.session);
			return () => closeup();
		}
	}, [socketTriggerEffect?.current, DataPointer]);

	//***************************** Action Providers ****************************************** */

	const storeFinalResultAnswerAndNotes = body => {
		let diagnosisId = hideInEvaluation ? diagnosticId : GlobalDiagnosisState?.diagnostic?.id;
		let session = hideInEvaluation ? diagnosisSession.session : GlobalDiagnosisState?.diagnostic?.session.session;
		action_diagnosis_storeDiagnosticTestResultBySession({
			contentId: data[DataPointer]?.id,
			diagnosticId: diagnosisId,
			body: {
				...body,
				diagnostic: diagnosisId,
				session: session
			},
			forceRefresh: () => Provider_TherapistDiagnosticList({ otherDetails: { session: SecuritiesState?.userId } })
		});
	};

	const updateCurrentSession = body => {
		if (GlobalDiagnosisState?.diagnostic?.session?.id && !hideInEvaluation)
			action_diagnosis_updateSession({
				diagnosticItemsToUpdate: {
					id: GlobalDiagnosisState?.diagnostic?.session?.id,
					diagnosticId: GlobalDiagnosisState?.diagnostic?.id,
					session: GlobalDiagnosisState?.diagnostic?.session.session,
					childId: childId?.value,
					userId: SecuritiesState?.userId,
					body
				},
				forceRefresh: () =>
					Provider_TherapistDiagnosticList({ otherDetails: { session: SecuritiesState?.userId } })
			});
	};

	// **************************************** Diagnostic Pagination ************************** /

	const userCanSkipToTheNextOrPreviousSlide = target =>
		GlobalDiagnosisState?.diagnostic?.session?.status !== 'paused'
			? target === 'next' && DataPointer < data.length - 1
				? true
				: target === 'previous' && DataPointer > 0
				? true
				: false
			: false;

	const skipToThePreviousPage = () =>
		userCanSkipToTheNextOrPreviousSlide('previous') &&
		updateCurrentSession({
			current_slide: DataPointer - 1,
			seconds_since_start: seconds
		});

	const skipToTheNextPage = () =>
		userCanSkipToTheNextOrPreviousSlide('next') &&
		updateCurrentSession({
			current_slide: DataPointer + 1,
			seconds_since_start: seconds
		});

	// ***************************************************************************************** //

	const compareToGetAnswerStatus = pickedItem => {
		let response;
		switch (GlobalDiagnosisState?.diagnostic?.id) {
			case 1:
			case 4:
				response = pickedItem === data[DataPointer]?.target_item ? 'correct' : 'incorrect';
				break;

			case 3:
				response = pickedItem;
				break;

			default:
				break;
		}

		storeFinalResultAnswerAndNotes({ result: { answer: response } });
	};

	// dispatch update session duration on close window
	useEffect(() => {
		if (close)
			dispatch(
				action_diagnosis_timer_on_close({
					id: GlobalDiagnosisState?.diagnostic?.session?.id,
					diagnosticId: GlobalDiagnosisState?.diagnostic?.id,
					session: GlobalDiagnosisState?.diagnostic?.session.session,
					childId: childId?.value,
					userId: SecuritiesState?.userId,
					body: { seconds_since_start: seconds }
				})
			);
	}, [close]);

	// add event listener on close window
	// remove event listener on evaluation component
	if (!hideInEvaluation) {
		useEffect(() => {
			const handleCloseWindow = () => {
				setClose(true);
			};
			window.addEventListener('beforeunload', handleCloseWindow);
			return () => {
				window.removeEventListener('beforeunload', handleCloseWindow);
			};
		}, []);
	}
	return {
		DataPointer,
		skipToTheNextPage,
		updateCurrentSession,
		skipToThePreviousPage,
		childSelectedImage,
		compareToGetAnswerStatus,
		storeFinalResultAnswerAndNotes,
		diagnostic: GlobalDiagnosisState?.diagnostic
	};
};
