var findLiterals = /"[^"\r\n\\]*(?:\\[\W\w][^"\r\n\\]*)*"|'[^'\r\n\\]*(?:\\[\W\w][^'\r\n\\]*)*'|_\/\*([\W\w]*?)\*\//g;
function replaceLiterals(match, literal) {
	return literal ? '"' + literal.replace(findSpecials, "\\$&").replace(findNewlines, "\\n\\\n") + '"' : match;
}
var findSpecials = /["\\]/g, findNewlines = /\r?\n/g;

module.exports = function(source, closure) {
	return "(" + source.toString().replace(findLiterals, replaceLiterals) + ")";
};