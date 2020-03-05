import {useState, useMemo, useRef, useEffect} from 'react';

const usePrevious = function(value) {
	const ref = useRef();
	useEffect(() => {
		ref.current = value;
	});
	return ref.current;
};
export {usePrevious};

const useLoading = function(promise, init = null, changes = []) {
	const [_val, _setVal] = useState(init);
	const realPromise = (typeof promise === 'function') ? promise() : promise;
	useEffect(() => {
		realPromise.then(_setVal)
	}, changes);
	return [_val, _setVal];
};
export {useLoading};

const useStateObject = function(iValue) {
	const [value, set] = useState(iValue);
	return {value, set};
};
export {useStateObject};

const useContextState = function(obj = {toset1 : 1, toset2 : 2}) {
	const ret = {};
	for (let k in obj)
		ret[k] = useStateObject(obj[k]);
	return ret;
};
export {useContextState};

const useRenderMemo = function (jsxElt, deps) {
	const j = (typeof jsxElt == 'function') ? jsxElt : ()=>jsxElt;
	return useMemo(j, deps);
};
export {useRenderMemo};

const useOnce = function(value, flag = undefined) {
	let ref = useRef(flag);
	if (ref.current === flag)
		ref.current = value;
	return ref.current;
};
export {useOnce};