function sendSearch () {
	sock.send('search');
}

function createGame () {
	socket.send('create-game');
}

function listGames () {
	// Will list active games to join and spectate.
}
