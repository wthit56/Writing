var fs = require("fs"), path = require("path");

var is_ = /\.\.js$/, isHidden = /^-/;
module.exports = function folder(folderpath) {
	var files = fs.readdirSync(folderpath);
	for (var i = 0, filepath, l = files.length; i < l; i++) {
		if (!isHidden.test(files[i]) && is_.test(files[i])) {
			filepath = "./" + path.join(folderpath, files[i]);
			var stat = fs.statSync(filepath);
			if (stat.isFile()) { require(filepath); }
			else if (stat.isDirectory()) { folder(filepath); }
		}
	}
};
