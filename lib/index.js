const jsonClient = require('@cuvva/json-client');
const { snek, desnek } = require('./casing');

module.exports = crpc;

function crpc(baseUrl, options) {
	const client = jsonClient(baseUrl, options);

	return function crpcRequest(path, body, options) {
		if (!options || !options.disableTransform) {
			body = snek(body);
		}

		const promise = client('post', path, null, body, options)
		if (!options || !options.disableTransform) {
			return promise.then(desnek);
		}

		return promise
	};
}
