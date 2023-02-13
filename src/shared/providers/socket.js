import SocketProvider from '../../models/SocketProvider';
const EventsList = {
	INITIALIZE_DIAGNOSTIC_DATA: 'INITIALIZE_DIAGNOSTIC_DATA',
	GET_DIAGNOSTIC_DATA: 'GET_DIAGNOSTIC_DATA',
	SET_DIAGNOSTIC_ANSWER: 'SET_DIAGNOSTIC_ANSWER'
};

const provider = new SocketProvider();

export const Provider_CurrentStateToChild = currentData => {
	let eventType = EventsList.INITIALIZE_DIAGNOSTIC_DATA;

	provider.emit(eventType, currentData);
	return { closeup: () => provider.closeup(eventType) };
};

export const Provider_ChildDemandData = (data = {}) => {
	let eventType = EventsList.GET_DIAGNOSTIC_DATA;

	provider.emit(eventType, data);
	return { closeup: () => provider.closeup(eventType) };
};

export const Provider_ChildPickAnswer = data => {
	let eventType = EventsList.SET_DIAGNOSTIC_ANSWER;

	provider.emit(eventType, data);
	return { closeup: () => provider.closeup(eventType) };
};

export const Consumer_ChildDemandData = (fn, session) => {
	let eventType = EventsList.GET_DIAGNOSTIC_DATA;

	provider.on(eventType, fn, null, session);
	return { closeup: () => provider.closeup(eventType) };
};

export const Consumer_CurrentStateToChild = (fn, session) => {
	let eventType = EventsList.INITIALIZE_DIAGNOSTIC_DATA;
	provider.on(eventType, fn, 'data', session);
	return { closeup: () => provider.closeup(eventType) };
};

export const Consumer_ChildPickAnswer = (fn, session) => {
	let eventType = EventsList.SET_DIAGNOSTIC_ANSWER;

	provider.on(eventType, fn, 'data', session);
	return { closeup: () => provider.closeup(eventType) };
};
export default {
	Provider_CurrentStateToChild,
	Consumer_CurrentStateToChild
};
