var JsonEncoder = (function () {

	function JsonEncoder () {}

	JsonEncoder.prototype.encode = function (data) {
		return JSON.stringify(data);
	};

	JsonEncoder.prototype.decode = function (data) {
		return JSON.parse(data);
	};

	return JsonEncoder;
})();
