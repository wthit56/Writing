module.exports = function(a, b) {
	a = a.updated || a.released;
	b = b.updated || b.released;
	return a > b ? -1 : 1;
};