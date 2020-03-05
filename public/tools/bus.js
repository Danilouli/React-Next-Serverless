let Bus = {};
Bus.callbacks = [];
Bus.destroy = function(options = {forEvents : false}) {
	let forEvents = options.forEvents || options;
	if (typeof forEvents == 'string')
		forEvents = [forEvents];
	for (let cb of Bus.callbacks) {
		if (!!forEvents && forEvents.length && forEvents.indexOf(cb.event) < 0)
			continue;
		Bus.stop(cb.event, cb.callback);
	}
	return true;
};
Bus.when = function(eventName, cbFunc, options, listener) {
	if (!listener)
		listener = window;
	const realCbFn = ({detail}) => cbFunc(detail);
	window.removeEventListener(eventName, realCbFn);
	window.addEventListener(eventName, realCbFn, options);
	Bus.callbacks.push({event : eventName, callback : realCbFn});
	return realCbFn;
};
Bus.cast = function(eventName, detail, caster) {
	if (!caster)
		caster = window;
	caster.dispatchEvent(new CustomEvent(eventName, {detail : detail}));
};
Bus.fcast = function(eventName, detail, caster) {
	return (() => Bus.cast(eventName, detail, caster));
}
Bus.stop = function(eventName, cbFunc, options = {}, listener = window) {
	if (!listener)
		listener = window;
	window.removeEventListener(eventName, cbFunc, options);
};
export default Bus;