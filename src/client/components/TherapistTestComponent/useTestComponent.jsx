import { useEffect, useRef } from 'react';
import { mapWindowsParamsQueriesToObject } from '../../../shared/helpers/properties';
import {
	Consumer_ChildDemandData,
	Consumer_ChildPickAnswer,
	Provider_CurrentStateToChild
} from '../../../shared/providers/socket';

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
		diagnosisSession
	} = props;
	const childSelectedImage = useRef();
	const childId = mapWindowsParamsQueriesToObject('child');
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
		console.log('socketTriggerEffect', socketTriggerEffect?.current);

		if (socketTriggerEffect?.current) {
			console.log('socketTriggerEffect', socketTriggerEffect.current);
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
				console.log(data);
				compareToGetAnswerStatus(data?.item);
				childSelectedImage.current = data?.item;
			}, GlobalDiagnosisState?.diagnostic?.session.session);
			return () => closeup();
		}
	}, [socketTriggerEffect?.current, DataPointer]);

	//***************************** Action Providers ****************************************** */

	const storeFinalResultAnswerAndNotes = body => {
		action_diagnosis_storeDiagnosticTestResultBySession({
			contentId: data[DataPointer]?.id,
			diagnosticId: GlobalDiagnosisState?.diagnostic?.id || diagnosticId,
			body: {
				...body,
				session: GlobalDiagnosisState?.diagnostic?.session.session || diagnosisSession.session
			}
		});
	};

	const updateCurrentSession = body => {
		if (GlobalDiagnosisState?.diagnostic?.session?.id && !hideInEvaluation)
			action_diagnosis_updateSession({
				id: GlobalDiagnosisState?.diagnostic?.session?.id,
				diagnosticId: GlobalDiagnosisState?.diagnostic?.id,
				session: GlobalDiagnosisState?.diagnostic?.session.session,
				childId: childId?.value,
				userId: SecuritiesState?.userId,
				body
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
			current_slide: DataPointer - 1
		});

	const skipToTheNextPage = () =>
		userCanSkipToTheNextOrPreviousSlide('next') &&
		updateCurrentSession({
			current_slide: DataPointer + 1
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

		storeFinalResultAnswerAndNotes({ answer: response });
	};

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
