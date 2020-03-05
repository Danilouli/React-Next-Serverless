import _ from 'lodash';
import {format} from 'date-fns';

/**
 * Compose a list of functions (you can pass them as a destctured array)
 * If there is an error, returns identity function
 * @param functions ...fns
 * @return function
 */
const compose = function(...fns) {
	try {
		const firstFn = fns[fns.length - 1];
		const restFns = fns.slice(0,-1);
		const ret = restFns.reduceRight(
			(accFn, currFn) => ((...args) => currFn(accFn(...args))),
		firstFn);
		if (typeof ret !== 'function') {
			console.warn("Non function result for composition, returning identity");
			return e=>e;
		}
		return ret;
	}
	catch (err) {
		console.warn("Impossible to compose these functions", err);
		return e=>e;
	}
};
export {compose};

/**
 * Compose a list of functions (you can pass them as a destctured array) in the other way
 * (First function passed is first executed etc.)
 * If there is an error, returns identity function
 * @param functions ...fns
 * @return function
 */
const chain = function(...fns) {
	const reversed = !!fns.reverse ? fns.reverse() : [];
	return compose(...reversed);
};
export {chain};
const chainOn = function(args, ...fns) {
	const chained = chain(...fns);
	if (!Array.isArray(args))
		args = [args];
	return chained(...args);
};
export {chainOn};

/**
 * Concatenate arrays **arrs** and set their elements
 * unique by a function of unicity : **by**.
 * Then sorts the array based on the result of this unicity function.
 * **by** can be a string, if it is the function will be **obj=>obj[by]**
 * @param  arrays arrs -- on array or array of arrays
 * @param  function_OR_string by
 * @param  number sort=1 -- if sort is 1, sorted asc, if sort is -1, sorted desc
 */
const concatUniqSortBy = function(arrs, by, sort = 1) {
	try {
		if (!Array.isArray(arrs[0]))
			arrs = [arrs];
		const byCb = (typeof by == 'string') ? e=>e[by] : by;
		const sortCb = (e1,e2)=>sort*(byCb(e1)-byCb(e2));
		return chainOn(arrs, _.concat, e=>_.uniqBy(e, byCb), e=>e.sort(sortCb));
	}
	catch (err) {
		console.warn("Error Caught for concatUniqSortBy", err);
		return [];
	}
};
export {concatUniqSortBy};

/**
 * Wrapper for date-fns format function
 * @param string_OR_timestamp_OR_Date dateElt=Date.now()
 * @param string pattern="dd/MM/yyyy HH:mm:ss"
 */
const dateformat = function(dateElt = Date.now(), pattern = "dd/MM/yyyy HH:mm:ss") {
	return format(new Date(dateElt), pattern);
};
export {dateformat};

/**
 * Formats a date in a classic day/month/year with custom separator **sep**
 * @param  string_OR_timestamp_OR_Date dateElt
 * @param  string sep='/'
 */
const datesep = function(dateElt, sep = '/') {
	return dateformat(dateElt, `dd${sep}MM${sep}yyyy`);
};
export {datesep};

const splitIndex = function(str, sep = '_', index = -1) {
	try {
		str = str.toString();
		const strArr = str.split(sep);
		const finalIndex = index < 0 ? strArr.length + index : index;
		return strArr[finalIndex];
	}
	catch (err) {
		console.warn("Error at splitIndex, returning undefined");
		return undefined;
	}
};
export {splitIndex};

const shuffleArray = function(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[arr[i], arr[j]] = [arr[j], arr[i]];
	}
	return arr;
};
export {shuffleArray};

const reduceToWordsMaxCarac = (str, maxCarac) => {
	str = str.replace(/<[^>]*>?/gm, '');
	let spl = str.split(' ');
	let ret = '';
	for (let s of spl) {
		if (ret.length > maxCarac) {
			let spl2 = ret.split(' ');
			spl2.pop();
			ret = spl2.join(' ');
			break;
		}
		ret += `${s} `;
	}
	ret += '...';
	return ret;
}
export {reduceToWordsMaxCarac};

const validateEmail = mail => {
	if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,10})+$/.test(mail))
		return (true)
	return (false)
};
export {validateEmail};

const isLetterString = string => {
	// Ouais bon quand même
	// eslint-disable-next-line max-len
	const regex = /À|È|Ì|Ò|Ù|à|è|ì|ò|ù|Á|É|Í|Ó|Ú|Ý|á|é|í|ó|ú|ý|Â|Ê|Î|Ô|Û|â|ê|ô|û|Ã|Ñ|Õ|ã|ñ|õ|Ä|Ë|Ï|Ö|Ü|ä|ë|ï|ö|ü|ç|Ç|[a-z]|[A-Z]|-/g;
	return !Array.from(string).find(e => !e.match(regex));
};
export {isLetterString};

const isNumberString = string => {
	return !Array.from(string).find(e => !e.match(/[0-9]/g))
};
export {isNumberString};

const purgeNonLetters = string => {
	let arrFrom = Array.from(string);
	let filtered = arrFrom.filter(isLetterString);
	return filtered.join('', filtered);
};
export {purgeNonLetters};

const purgeNonNumbers = string => {
	let arrFrom = Array.from(string);
	let filtered = arrFrom.filter(isNumberString);
	return filtered.join('', filtered);
};
export {purgeNonNumbers};

const capitalize = string => {
	return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
export {capitalize};

const isPhone = function(string) {
	let matches = string.replace(/\s+/g,'').match(/^((\+)33|0)[6-7](\d{2}){4}$/g);
	if (!matches)
		return false;
	let phone = matches[0];
	if (phone[0] != '+')
		phone = '+33'+phone.substring(1);
	return phone;
};
export {isPhone};

const firstLetterToMaj = str => (str[0].toUpperCase() + str.substring(1));
export {firstLetterToMaj};

const dateFromObjectId = function (objectId) {
	return (new Date(parseInt(stringIdize(objectId).substring(0, 8), 16) * 1000)).getTime();
};
export {dateFromObjectId};

const mapEntries = function (obj, cb) {
	return _.fromPairs(_.toPairs(obj).map(([k,v],i)=>[k,cb(v,k,i)]));
}
export {mapEntries};

const filterEntries = function (obj, cb) {
	return _.fromPairs(_.toPairs(obj).filter(([k,v],i)=>cb(v,k,i)));
}
export {filterEntries};

const pressString = s => _.deburr(s || '').toLowerCase();
export {pressString};

const similarStrings = function (s1, s2) {
	if (!s1) s1 = '';
	if (!s2) s2 = '';
	return (_.deburr(s1).toLowerCase() == _.deburr(s2).toLowerCase());
};
export {similarStrings};

/**
	* Function To Check if a the first Char of a String is a vowel, without accents etc. 'h'
	* is considered a vowel too.
	* Fuck French.
	* @param string st
*/
const isVowel = (st) => {
	return (
		['a','e','i','o','u','y','h']
		.indexOf(_.deburr((_.get(st, '0', 'z')).toLowerCase())) >= 0
	);
};
export {isVowel};

const datify = function(ts, options) {
	if (!options)
		return `Le ${(new Date(ts).toLocaleString('fr-FR', {timeZone : 'Europe/Paris'}))}`;
	else {
		let date = (new Date(ts)).toLocaleDateString('fr-FR', {
			timeZone : 'Europe/Paris', ...options
		});
		if (!options.day && !!options.hour && !!options.minute) {
			let spl = date.split('à');
			return (spl[spl.length - 1] || '').trim();
		}
		else
			return date;
	}
};
export {datify};

/**
 * Concat two arrays of messages sorted by date.
 * The messages should have a **.date** of a **.end** property which represents a timestamp.
 * **date** property haßs precedence over **.edn** property.
 * **pastMessages** will be placed before **futureMessages* in the result.
 * @param  array pastMessages=[]
 * @param  array futureMessages=[]
 */
const concatMessages = function(pastMessages = [], futureMessages = []) {
	const getMDate = e => (e.date || e.end);
	try {
		let concatenated = _.uniqBy([...futureMessages, ...pastMessages], getMDate);
		concatenated.sort((e1, e2) => (getMDate(e1) - getMDate(e2)));
		return concatenated;	
	}
	catch (err) {
		console.warn("Error Caught for concatMessages", err);
		return [];
	}
};
export {concatMessages};

/**
 * Function to return a deepAssignment of **obj2** in **obj1**.
 * If **copy** is true, **obj1** is not modified by reference, all is copied.
 * @param  object obj1 
 * @param  object obj2 
 * @param  bool copy=true
 * @return object
 */
const deepAssign = function(obj1, obj2, copy = true) {
	let cop1, cop2;
	if (copy) {
		cop1 = _.cloneDeep(obj1);
		cop2 = _.cloneDeep(obj2);
	}
	else {
		cop1 = obj1;
		cop2 = obj2;
	}
	for (let key in cop2) {
		if (!(typeof cop1[key] == 'object' && cop2[key] && typeof cop2[key] == 'object')) {
			cop1[key] = cop2[key];
		}
		else if (cop1[key] != null && cop2[key] != null)
			deepAssign(cop1[key], cop2[key], copy === 'always' ? true : false);
	}
	return cop1;
};
export {deepAssign};

const getSepDate = function(ts, sep = '/') {
	let dat = new Date(ts);
	return `${dat.getDate()}${sep}${dat.getMonth()+1}${sep}${dat.getFullYear()}`;
};
export {getSepDate};

const errCb = (log , toRet) => {
	return (err => {
		if (!!log)
			console.error(log);
		console.error("ERROR :", err);
		return toRet || err;
	})
};
export {errCb};

const assignDefault = function(defaultValues, toAssignValues) {
	return Object.assign(_.cloneDeep(defaultValues), toAssignValues);
};
export {assignDefault};

const doubleAssignDefault = function(defaultValues, customDefault, detail) {
	let cDef = (typeof customDefault == 'function') ? customDefault() : customDefault;
	cDef = assignDefault(defaultValues, cDef);	
	detail = assignDefault(cDef, detail);
	return detail;
};
export {doubleAssignDefault};

const getAllPathsVals = function(obj, stoppingKeys, ret = {}, prefix) {
	for (let o in obj) {
		let stop = false;
		if (stoppingKeys && stoppingKeys.indexOf(o) >= 0)
			stop = true;
		if (typeof obj[o] == 'object' && !stop) {
			let newPrefix = (prefix) ? prefix+'.'+o : o;
			getAllPathsVals(obj[o], stoppingKeys, ret, newPrefix);
		}
		else {
			let key = (prefix) ? prefix+'.'+o : o;
			ret[key] = obj[o];
		}
	}
	return ret;
};
export {getAllPathsVals};