const camelCaseRegex = /^[a-z][A-Za-z0-9]*$/;
const camelSplitRegex = /(?=[A-Z])/;
const snakeCaseRegex = /^[a-z]+(?:_[a-z0-9]+)*$/;
const snakeCaptureRegex = /_(.)/g;

exports.snek = snek;
exports.desnek = desnek;

// in the grass
function snek(object) {
	return processKeys(s => {
		if (!camelCaseRegex.test(s))
			return s;

		return s
			.split(camelSplitRegex)
			.join('_')
			.toLowerCase();
	}, object);
}

function desnek(object) {
	return processKeys(s => {
		if (!snakeCaseRegex.test(s))
			return s;

		return s.replace(snakeCaptureRegex, (match, chr) => {
			return chr ? chr.toUpperCase() : '';
		});
	}, object);
}

function processKeys(convert, obj) {
	if (obj !== Object(obj) || typeof obj === 'function')
		return obj;

	if (['[object Date]', '[object RegExp]', '[object Boolean]'].includes(Object.prototype.toString.call(obj)))
		return obj;

	if (Array.isArray(obj)) {
		const output = [];

		for (const item of obj)
			output.push(processKeys(convert, item));

		return output;
	}

	const output = {};

	for (const key of Object.keys(obj))
		output[convert(key)] = processKeys(convert, obj[key]);

	return output;
}
