var wrapper = require("./-htmlEncode.js").wrapper(1, "<p>", "</p>");
var findBlocks = /^\s*([^\s][\W\w]*?)$/gm
module.exports = function(text) {
	return text.replace(findBlocks, wrapper);
};