import * as F from '/public/scripts/functions.js';
import _ from 'lodash';

const getCSSProp = function(elt, cssProp) {
	if (!!elt)
		return (window.getComputedStyle(elt, null).getPropertyValue(cssProp));
	return 0;
};
export {getCSSProp}

const getWidth = function(elt) {
	if (!!elt)
		return (parseFloat(elt.getCSSProp("width")));
	return 0;
};
export {getWidth}

const getHeight = function(elt) {
	if (!!elt)
		return (parseFloat(elt.getCSSProp("height")));
	return 0;
};
export {getHeight}

const getCSSNumProp = function(elt, cssProp) {
	if (!!elt)
		return (parseFloat(window.getComputedStyle(elt, null).getPropertyValue(cssProp)));
	return 0;
};
export {getCSSNumProp}

const setCSSNumPropToUnit = function(elt, cssProp, unit = 'px') {
	if (!elt)
		return 0;
	let cssNumProp = elt.getCSSNumProp(cssProp);
	if (cssNumProp) {
		elt.style[cssProp] = cssNumProp + '' + unit;
	}
};
export {setCSSNumPropToUnit}

const buildMessageJsx = (message, jsxProps = {onElementLoad : e=>e}) => {
	let fileUrl = _.get(message, 'file.url');
	if (fileUrl) {
		const fileType = _.get(message, 'file.type', '');
		const isImage = fileType.indexOf('image') >= 0 || fileUrl.match(/.jpg$|.png$|.gif$/g);
		const isVideo = fileType.indexOf('video') >= 0 || fileUrl.match(/.mp4$|.webm$/g);
		if (isImage) 
			return (
				<a href={fileUrl} target='_blank' rel="noopener noreferrer">
					<img src={fileUrl} onLoad={jsxProps.onElementLoad}></img>
				</a>
			);
		if (isVideo) 
			return <video controls src={fileUrl} type={fileType} onLoad={jsxProps.onElementLoad}></video>;
	}
	return <span dangerouslySetInnerHTML={{__html : message.content}}></span>
};
export {buildMessageJsx};

const loadingScript = () => {
	let body = document.querySelector('body');
	if (body)
		body.style['overflow-y'] = 'auto';
	let loadScreen = document.getElementById('__loading_screen');
	if (loadScreen)
		loadScreen.setAttribute('hidden', true);
	if (process.env.IN_PROD) {
		setTimeout(() => {
			(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
			new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
			j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
			'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
			})(window,document,'script','dataLayer','GTM-TJHXG8S');		
		}, 300);
	}
};
export {loadingScript};

const getWindowScrollTop = () => (document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0);
export {getWindowScrollTop};

const getWindowScrollHeight = () => (document.documentElement.scrollHeight || window.scrollHeight || document.body.scrollHeight || 0);
export {getWindowScrollHeight};

const getWindowClientHeight = () => (document.documentElement.clientHeight || window.clientHeight || document.body.clientHeight || 0);
export {getWindowClientHeight};

const getWindowOffsetHeight = () => (document.documentElement.offsetHeight || window.offsetHeight || document.body.offsetHeight || 0);
export {getWindowOffsetHeight};

const getWindowScrollLenght = () => (getWindowScrollHeight() - getWindowOffsetHeight());
export {getWindowScrollLenght};

const getScrollbarHeight = () => {
	let sbHeight = getWindowClientHeight() * (getWindowClientHeight() / getWindowScrollHeight());
	return parseInt(sbHeight);
};
export {getScrollbarHeight};

const jsxizeHtmlObject = obj => {
	let paths = F.getAllPathsVals(obj);
	let ret = {};
	for (let path in paths)
		_.set(ret, path, <span dangerouslySetInnerHTML={{__html : paths[path]}}></span>);
	return ret;
};
export {jsxizeHtmlObject};