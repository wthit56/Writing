var htmlEncode = require("./-htmlEncode.js");

var i, l;
var config;
module.exports = function complexText(text, _config) {
	config = _config;
	i = 0; l = text.match(find).length;
	var result = text.replace(find, replace);
	config = null;
	return result;
}

var find = /^\s*([^\s][\W\w]*?)$/gm;
function replace(match, content) {
	var result = (
		((((i === 0) && (config.pre_first != null)) ? config.pre_first : config.pre) || "") +
		htmlEncode(content) +
		((((i === l - 1) && (config.post_last != null)) ? config.post_last : config.post) || "")
	);
	i++;
	return result;
}

