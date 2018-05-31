const jsonClient = require('json-client');
const { snek, desnek } = require('./casing');

module.exports = crpc;

function crpc(baseUrl, options) {
	const client = jsonClient(baseUrl, options);

	return function crpcRequest(path, body, options) {
		const transformedBody = snek(body);

		return client('post', path, null, transformedBody, options)
			.then(desnek);
	};
}
