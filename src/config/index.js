import { WebStorageStateStore } from 'oidc-client';
const API_Config = {
	BackEnd_ORIGIN: process.env.REACT_APP_BackEnd_ORIGIN ?? 'http://localhost:5000',
	BackEnd_BaseURL: process.env.REACT_APP_BACKEND_BASEURL ?? 'http://localhost:5000/api/v1',

	AUTH0_API: {
		BASE_URL: `https://${process.env.REACT_APP_AUTH_API_DOMAIN}/api/v2/`,

		endpoints: {
			user: {
				update_metaData: id => `users/${id}`
			}
		}
	},
	HealthCare_API: {
		GenerateHealthCareBaseUrl: sub => `${process.env.REACT_APP_HEALTHCARE_ELSEVIER_BASE_URL}/${encodeURI(sub)}`,
		ISBN: process.env.REACT_APP_HEALTHCARE_PDSS_ISBN,
		endpoints: {
			pin_request: '/redemptions',
			token_request: '/tokens'
		},

		cookies: {
			name: 'token',
			expiresIn: 15
		}
	},
	child: {
		basePath: '/child',
		create: userId => `/${userId}`,
		updateOne: childId => `/${childId}`,
		getOne: childId => `/${childId}`,
		delete: childId => `/${childId}`
	},
	user: {
		basePath: '/user',
		getAllChild: userId => `/child/${userId}`,
		/*  */
		getOneByEmail: email => `/${email}`,
		getOneBySub: sub => `/${sub}`
	},
	shared: {
		basePath: '/shared',
		languages: '/languages',
		genders: '/genders'
	},
	diagnosis: {
		basePath: '/diagnostics',
		getAll: '',
		getOneById: (id, session) => `/${id}${session ? '?session=' + session : ''}`,
		getInfo: id => `/${id}`,
		getGroups: `/groups`,
		getSessions: userId => `/sessions/${userId}`,
		deleteSession: sessionId => `/sessions/${sessionId}`,
		newSession: `/sessions`,
		updateSession: id => `/sessions/${id}`,
		getDiagnosticContent: (id, session) => `/sessions/content/${id}${session ? '?session=' + session : ''}`,
		storeDiagnosticTestResultBySession: content => `/sessions/content/result/${content}`
	},
	record: {
		basePath: '/records',
		create: '',
		getAll: id => `/${id}`,
		delete: id => `/${id}`
	},
	evaluation: {
		basePath: '/evaluation',
		getAll: ``,
		update: ``,
		getResultScore: '/result',
		getResultScoreTable: '/result/table'
	},
	shop_url:
		'https://shop.elsevier.de/patholinguistische-diagnostik-bei-sprachentwicklungsstoerungen-pdss-9783437475931.html?nosto=nosto-page-category1'
};

const config = {
	diagnosis_test: {
		//? this key is used to separate Therapist mode and child mode
		child_mode_query_key: 'child_mode'
	},
	hashSlatSecret: process.env.REACT_APP_CRYPTO_HASH || 'h237dsh82h3j',

	securitiesConfig: {
		authority: 'https://' + process.env.REACT_APP_CLIENT_DOMAIN,
		client_id: process.env.REACT_APP_CLIENT_ID,
		redirect_uri: window.location.origin + process.env.REACT_APP_REDIRECT_URL,
		post_logout_redirect_uri: window.location.origin,
		audience: process.env.REACT_APP_API_AUDIENCE,
		scope: 'openid profile email api update:current_user_metadata',
		response_type: 'code', // Use the Authorization Code Flow (PKCE)
		automaticSilentRenew: true,
		// monitorSession: false,
		silent_redirect_uri: window.location.origin + process.env.REACT_APP_SILENT_REDIRECT_URL,
		// The UI loads user info from the OpenID Connect user info endpoint
		loadUserInfo: true,
		// Store user data in localstorage instead of default sessionStorage.
		userStore: new WebStorageStateStore({ store: window.localStorage }),
		extraQueryParams: { audience: process.env.REACT_APP_API_AUDIENCE },
		ui_locales: 'de'
	},
	API_Config: API_Config
};
export default config;
