import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from '../languages';

i18n.use(initReactI18next).init({
	resources,
	lng: 'de',
	debug: false,

	ns: ['translations'],
	defaultNS: 'translations',

	keySeparator: false,
	interpolation: {
		escapeValue: false
	}
});

export default i18n;