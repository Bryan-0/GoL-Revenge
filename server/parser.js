'use strict';

class Parser {
	parse(data) {
		let parsed = null;
		try {
			parsed = JSON.parse(json);
		} catch (e) {
			console.log('[ERROR] Attempted to JSON.parse wrong JSON');
			parsed = {};
		}

		console.log(parsed);
		return parsed;
	}
}

module.exports = new Parser();
