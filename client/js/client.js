var GolClient = (function () {

	function GolClient () {}

	GolClient.prototype.open = function () {
		console.log('Successfully opened connection to the server.');
	};

	GolClient.prototype.receive = function (data) {
		console.log('Received data.', data);
	};

	GolClient.prototype.close = function () {
		console.log('Connection has been closed!');
		// TODO: Reconnection.
	};

	GolClient.prototype.listGames = function () {
		// Will list active games to join and spectate.
	};

	GolClient.prototype.createGame = function () {
		// Will list active games to join and spectate.
	};

	return GolClient;
})();
