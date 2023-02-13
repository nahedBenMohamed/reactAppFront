import { useLocation } from 'react-router-dom';
import moment from 'moment';
import sha1 from 'sha1';

import CryptoJS from 'crypto-js';
import config from '../../../config';

export const useCompareCurrentLocation = currentLocation => {
	const location = useLocation();
	return currentLocation === location.pathname;
};
export const mapBodyToQueries = body => {
	let queries = '?';
	body && Object.keys(body).map(query => body[query] && (queries += `${query}=${body[query]}&`));
	queries = queries.substring(0, queries.length - 1);

	return queries;
};

export const AppendMultipleData = ({ file, fileName }, body) => {
	const fl = new FormData();
	file && fl.append(fileName, file);
	delete body.file;
	return Promise.all(
		// eslint-disable-next-line array-callback-return
		Object.keys(body).map(dataKeyName => {
			fl.append(dataKeyName, body[dataKeyName]);
		})
	).then(() => {
		return fl;
	});
};

export const obj2FormData = (obj, formData = new FormData()) => {
	this.formData = formData;

	this.createFormData = function (obj, subKeyStr = '') {
		for (let i in obj) {
			let value = obj[i];
			let subKeyStrTrans = subKeyStr ? subKeyStr + '[' + i + ']' : i;

			if (typeof value === 'string' || typeof value === 'number') {
				this.formData.append(subKeyStrTrans, value);
			} else if (typeof value === 'object') {
				this.createFormData(value, subKeyStrTrans);
			}
		}
	};

	this.createFormData(obj);

	return this.formData;
};

export const customDelay = ms => new Promise(res => setTimeout(res, ms));

export const stringToCamelCase = StringToCamelCase => {
	let splitWords = StringToCamelCase.split(' ');
	let lastWord = splitWords[splitWords?.length - 1];
	lastWord = lastWord[0].toUpperCase() + lastWord.slice(1);
	splitWords[splitWords?.length - 1] = lastWord;
	return splitWords.join(' ');
};

export const deleteCookies = () => {
	var allCookies = document.cookie.split(';');

	// The "expire" attribute of every cookie is
	for (var i = 0; i < allCookies.length; i++)
		document.cookie = allCookies[i] + '=;expires=' + new Date(0).toUTCString();
};

export const getAge = birth => {
	const endDate = moment(birth, 'DD-MM-YYYY');
	let months = moment().diff(endDate, 'months', true);
	return Math.floor(months / 12) + ';' + (Math.floor(months) % 12);
};

export const getUserSUBId = () =>
	localStorage.getItem('profile') && encodeURIComponent(JSON.parse(localStorage.getItem('profile'))?.sub);

export const getUserAuthProfileItem = key =>
	localStorage.getItem('profile') && JSON.parse(localStorage.getItem('profile'))?.[key];
export const eraseCookie = name => {
	document.cookie = name + '=; Max-Age=-99999999;';
};
export const getItemsFromCookies = key => {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${key}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
};

export const getDistance = id => {
	return id % 2 !== 0 ? 'odd' : 'even';
};

// calculate age per month (arg => birthday)
export const calculateAgePerMonth = arg => {
	const age = moment(arg, 'DD/MM/YYYY');
	const months = moment().diff(age, 'months', false);
	return months;
};
export const mapWindowsParamsQueriesToObject = key => {
	const params = new URLSearchParams(window.location.search);
	return {
		exist: params.has(key),
		value: params.get(key)
	};
};

export const textToCryptoSH1 = text => sha1(text);

export const mapCurrentLocationQueriesToJSON = (additionalQueries = {}) => {
	var search = window.location.search.substring(1);
	let queries = Object.fromEntries(new URLSearchParams(search));
	return mapBodyToQueries(
		Object.assign(
			{},
			{
				...queries,
				...additionalQueries
			}
		)
	);
};

export const CryptoProviders = data => ({
	hashIt: () => CryptoJS.AES.encrypt(data, config.hashSlatSecret).toString(),
	word: () => CryptoJS.AES.decrypt(data, config.hashSlatSecret).toString(CryptoJS.enc.Utf8),
	token: () => CryptoJS.SHA256(data + config.hashSlatSecret)
});

export const getPercent = diagnostic_group => {
	let count = 0;
	let total = diagnostic_group.diagnostics.length;

	{
		diagnostic_group &&
			diagnostic_group.diagnostics.map(diagnostic => {
				return diagnostic.process_percent == 100 ? (count = count + 1) : null;
			});
	}

	return Math.round((count / total) * 100);
};

export const linkIsActive = path => (window.location.pathname === path ? 'active' : ' ');
export const navLinkIsActive = item =>
	item.parent
		? window.location.pathname.includes(item.path.slice(0, item.path.lastIndexOf('?')))
			? 'active'
			: ' '
		: linkIsActive(item.path);

export const progressRing = (percent, radius) => {
	let circumference = radius * 2 * Math.PI;
	let strokeDasharray = circumference + ' ' + circumference;
	let strokeDashoffset = circumference;
	strokeDashoffset = circumference - (percent / 100) * circumference;
	return { strokeDasharray: strokeDasharray, strokeDashoffset: strokeDashoffset };
};
export const scrollToTop = () =>
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth'
	});
