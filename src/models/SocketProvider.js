/* eslint-disable no-useless-constructor */
import client from 'socket.io-client';
import config from '../config';

const socketConnection = {
	_instance: null,
	get instance() {
		if (!this._instance) {
			this._instance = client(config.API_Config.BackEnd_ORIGIN, { forceNew: true, query: {} });
		}
		return this._instance;
	}
};
export default class SocketProvider {
	constructor() {}
	on(event, action, selector, session) {
		socketConnection.instance.on(event, data => {
			return session
				? session?.includes(data?.data?.otherDetails?.session?.session || data?.data?.otherDetails?.session)
					? action && data
						? action(selector ? data[selector] : data)
						: action()
					: null
				: false;
		});
	}
	emit(event, data) {
		socketConnection.instance.emit(event, JSON.stringify(data));
	}
	closeup(event) {
		socketConnection.instance.on(event).off();
	}
}
