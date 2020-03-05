/* eslint-disable no-undef */
import Axios from 'axios';
import _ from 'lodash';

const HEADERS = {
	customheader: 'xxxxxxxx'
};
export {HEADERS};

const API_HOST = 
	(process.env.DEV_ENV == 'production') && 'https://prodapi.myapi.com'
||	(process.env.DEV_ENV == 'dev' && 'https://devapi.myapi.com')
||	'http://localhost:3000';

export {API_HOST};

const getApiFinalEndpoint = endpt => (endpt[0] == '/') ? `${API_HOST}${endpt}` : `${API_HOST}/${endpt}`;

const apiDefaultOptions = {
	headers : HEADERS,
	withCredentials : true,
	resultCondition : ()=>true
};
const api = {
	post : (endpoint, data = {}, options) => {
		options = Object.assign(_.cloneDeep(apiDefaultOptions), options);
		return (new Promise((resolve, reject) => {
			Axios.post(getApiFinalEndpoint(endpoint), data, options)
			.then(suc => {
				let result = _.get(suc, 'data.result');
				let success = _.get(suc, 'data.success');
				if (result === undefined || !success || !options.resultCondition(result))
					return reject(suc);
				return resolve(result);
			})
			.catch(reject)
		}));
	},
	get : (endpoint, options) => {
		options = Object.assign(_.cloneDeep(apiDefaultOptions), options);
		return (new Promise((resolve, reject) => {
			Axios.get(getApiFinalEndpoint(endpoint), options)
			.then(suc => {
				let result = _.get(suc, 'data.result');
				let success = _.get(suc, 'data.success');
				if (result === undefined || !success || !options.resultCondition(result))
					return reject(suc);
				return resolve(result);
			})
			.catch(reject)
		}));
	}
};
export {api};

const jsGet = (url, toGet) => {
	if (!url)
		return;
	let split1 = url.split('?');
	split1 = split1[1];
	if (!split1)
		return;
	split1 = split1.split('&');
	let finalSplit = split1.map(s => s.split('=')).find(s => s[0] == toGet);
	if (!finalSplit)
		return;
	return finalSplit[1];
};
export {jsGet};

const setCookie = (cname, cvalue, exdays = 365) => {
	if (_.isNil(cvalue))
		return;
	let d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	let expires = "expires="+d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
};
export {setCookie};

const setLoginCookies = loginCookies => {
	if (!loginCookies)
		return;
	setCookie('loginCookie', loginCookies.loginCookie);
	//setCookie('anotherLoginCookie', loginCookies.anotherLoginCookie);
};
export {setLoginCookies};

const deleteCookie = cname => {
	let d = new Date();
	d.setTime(d.getTime() -  24 * 60 * 60 * 1000);
	let expires = "expires="+d.toUTCString();
	document.cookie = cname + "=;" + expires + ";path=/";
};
export {deleteCookie};

const deleteLoginCookies = () => {
	deleteCookie('loginCookie');
	//deleteCookie('anotherLoginCookie', loginCookies.anotherLoginCookie);
};
export {deleteLoginCookies};

const getCookie = (cname, cookieString) => {
	if (!cname || !cookieString)
		return undefined;
	let name = cname + "=";
	let ca = cookieString.split(';');
	for(let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return undefined;
};
export {getCookie};

const getInitCookie = (ctx = {}, cname = 'loginCookie') => {
	const {req} = ctx;
	if (req) {
		const cookieString = _.get(req, 'headers.cookie');
		return (getCookie(cname, cookieString) || jsGet(_.get(req, 'url'), cname));
	}
	else {
		return getCookie(cname, document.cookie) || jsGet(window.location.toString(), cname);
	}
};
export {getInitCookie};

const getInitLoginCookies = ctx => ({
	loginCookie : getInitCookie(ctx, 'loginCookie'),
	// anotherLoginCookie : getInitCookie(ctx, 'anotherLoginCookie')
});
export {getInitLoginCookies};


//To use in getInitialProps to have all the classic data of user and lang
const getDataWithCookies = async ctx => {
	const auth = getInitLoginCookies(ctx);
	let user = undefined;
	if (auth.loginCookie) {
		user = {
			fname : "John",
			lname : "Doe"
		};
		//If auth, fetch user, here without api call, but api call to set
	}
	let lang = {
		fr : {
			h1 : "BONJOUR"
		},
		en : {
			h1 : "HELLO"
		}
	};
	//Also an api call to make eventually for lang
	return {
		lang,
		user,
		auth
	};
};
export {getDataWithCookies};

//Works with the express backend for serverless
const getParam = (ctx, param) => (_.get(ctx, `req.params.${param}`) || _.get(ctx, `query.${param}`));
export {getParam};

const getAuth = user => {
	let loginCookie = _.get(user, 'loginCookie');
	if (loginCookie) {
		return {loginCookie};
	}
	else {
		try {
			let auth = {
				loginCookie : getCookie('loginCookie'),
				// anotherLoginCookie : getCookie('anotherLoginCookie')
			}
			if (auth.loginCookie)
				return auth;
		}
		catch (e) {
			console.error('Error to get auth', e);
			return;
		}
	}
};
export {getAuth};

const getBrowser = () => {
	let isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
	let isFirefox = typeof InstallTrigger !== 'undefined';
	// eslint-disable-next-line max-len
	let isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
	let isIE = /*@cc_on!@*/false || !!document.documentMode;
	let isEdge = !isIE && !!window.StyleMedia;
	// eslint-disable-next-line max-len
	let isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime) || _.get(navigator, 'userAgent', '').indexOf("Chrome/79") >= 0;
	let isBlink = (isChrome || isOpera) && !!window.CSS;
	return {
		opera : isOpera,
		firefox : isFirefox,
		safari : isSafari,
		ie : isIE,
		edge : isEdge,
		chrome : isChrome,
		blink : isBlink
	}
};
export {getBrowser};

const fbqTrack = event => {
	try {
		if (!!fbq)
			fbq('track', event)
	}
	catch (err) {
		console.error('Fbq track failed');
	}
};
export {fbqTrack};

const isChrome = () => {
	let browsers = getBrowser();
	return !!browsers.chrome;
};
export {isChrome};

const isMobile = () => {
	if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
		return true;
	return false;
};
export {isMobile};