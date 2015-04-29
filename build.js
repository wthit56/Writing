var fs = require("fs"), path = require("path");
var srcroot = "./src/", buildroot = "./build/";

require("./prerequire.js")(srcroot);

require("./__.js").root = srcroot;

var isGit = /^.git/;
function clearDirectory(root) {
	clearFiles(root);
	fs.rmdirSync(root);
}
function clearFiles(root) {
	var files = fs.readdirSync(root);
	for (var i = 0, l = files.length; i < l; i++) {
		if (!isGit.test(files[i])) {
			var fullpath = path.join(root, files[i]);
			var stat = fs.statSync(fullpath);
			if (stat.isFile()) { fs.unlinkSync(fullpath); }
			else if (stat.isDirectory()) { clearDirectory(fullpath); }
		}
	}
}

var isHidden = /^-/, is_ = /\.\.js$/;
function folder(folderpath) {
	var files = fs.readdirSync(path.join(srcroot, folderpath));
	for (var i = 0, filepath, l = files.length; i < l; i++) {
		if (!isGit.test(files[i]) && !isHidden.test(files[i])) {
			var fullpath = path.join(folderpath, files[i]),
				srcpath = path.join(srcroot, fullpath),
				buildpath = path.join(buildroot, fullpath);
			var stat = fs.statSync(srcpath);
			if (stat.isFile()) {
				if (is_.test(files[i])) {
					buildpath = buildpath.replace(is_, "");
					console.log("rendering " + srcpath + "...");
					var rendered = require("./" + srcpath).toString();
					console.log("  writing as " + buildpath);
					fs.writeFileSync(buildpath, rendered);
					console.log("  write complete");
				}
				else {
					console.log("copying " + fullpath + "...");
					fs.createReadStream(srcpath).pipe(fs.createWriteStream(buildpath));
					console.log("  copy complete");
				}
			}
			else if (stat.isDirectory()) {
				console.log("making directory " + buildpath);
				fs.mkdirSync(buildpath);
				folder(fullpath);
			}
		}
	}
}

console.log("clearing " + buildroot);
clearFiles(buildroot);
folder("./");
