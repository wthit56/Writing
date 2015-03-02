var entities = {
	"“": "&ldquo;", "”": "&rdquo;",
	"‘": "&lsquo;", "’": "&rsquo;",
	"—": "&mdash;",
	"…": "&hellip;"
	//,"<": "&lt;", ">": "&gt;"
};
var find = new RegExp("[" + Object.keys(entities).join("")  + "]", "g");
function replace(match) { return entities[match]; }

function htmlEncode(html) {
	return (html + "").replace(find, replace);
}

htmlEncode.wrapper = function htmlEncode_wrapper(arg, pre, post) {
	if (arguments.length === 2) {
		post = pre;
		pre = arg;
		arg = 0;
	}

	return function() {
		return pre + htmlEncode(arguments[arg]) + post;
	}
};

module.exports = htmlEncode;