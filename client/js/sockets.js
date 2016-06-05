var GolSocket = (function () {
	function GolSocket (config, encoder, client) {
		this.socket = new SockJS('http://' + config.host + ':' + config.port + '/' + config.socketaddr);
		this.encoder = encoder;
		this.client = client;
		console.log(this.client);
		this.setUpSocket();
	}

	GolSocket.prototype.socket = null;

	GolSocket.prototype.encoder = null;

	GolSocket.prototype.client = null;

	GolSocket.prototype.onOpen = function () {
		this.socket.onopen = function () {
			this.client.open();
		}.bind(this);
	};

	GolSocket.prototype.onMessage = function () {
		this.socket.onmessage = function (e) {
			this.client.receive(this.parser.parse(e.data));
		}.bind(this);
	};

	GolSocket.prototype.onClose = function () {
		this.socket.onclose = function () {
			this.client.close();
		}.bind(this);
	};

	GolSocket.prototype.setUpSocket = function () {
		this.onOpen();
		this.onMessage();
		this.onClose();
	};

	GolSocket.prototype.send = function (data) {
		this.socket.send(this.encoder.encode(data));
	};

	return GolSocket;
})();

var encoder = new JsonEncoder();
var client = new GolClient();
var socket = new GolSocket(config, encoder, client);
