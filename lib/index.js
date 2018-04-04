const humps = require('humps');
const jsonClient = require('json-client');

module.exports = crpc;

function crpc(baseUrl, options) {
	const client = jsonClient(baseUrl, options);

	return function crpcRequest(path, body, options) {
		const transformedBody = humps.decamelizeKeys(body);

		return client('post', path, null, transformedBody, options)
			.then(humps.camelizeKeys);
	};
}
