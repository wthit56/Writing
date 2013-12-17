var arguments = process.argv;
var fs = require("fs"), path = require("path");

var force = false;
if (arguments.length > 2) {
	if (arguments[2] === "-force") {
		force = true;
	}
	else {
		console.log(
			"The arguments '" + arugments.slice(2).join(" ") + "' are not valid. "+
			"You may use the following arguments: \n\n"+
			"-force\tForces the writing of the available stories"
		);
		process.exit();
	}
}

var encodeHTML = (function () {
	var useEM = false, openEM = true;
	var findSymbols = /[“”‘’—…_]/g;
	function replaceSymbols(match) {
		switch (match) {
			case "“": return "&ldquo;";
			case "”": return "&rdquo;";
			case "‘": return "&lsquo;";
			case "’": return "&rsquo;";
			case "—": return "&mdash;";
			case "…": return "&hellip;";
			case "_": return (openEM = !openEM) ? "</em>" : "<em>";
		}
	}

	return function (source, _) {
		useEM = !!_;
		openEM = true;
		return source.replace(findSymbols, replaceSymbols);
	};
})();

var template = (function () {
	function prepare() {
		var titleHTML = encodeHTML(
			title.replace(/[\[\]]|\*\[/g, function (match) {
				switch (match) {
					case "[": return "<span>";
					case "*[": return "<span class=\"sub\">";
					case "]": return "</span>";
				}
			})
		);

		var titleMain = encodeHTML(title.replace(/[\[\]]|\s*\*[\W\w]*/g, ""));

		title = encodeHTML(title.replace(/[\[\]\*]/g, ""));

		if (image[0]) {
			image = {
				title: encodeHTML(image[1]),
				url: image[2],
				artist: encodeHTML(image[3]),
				artistUrl: image[4]
			};
		}
		else {
			image = null;
		}

		story = (
			"<p>" +
			encodeHTML(story.replace(/\r?\n/g, "</p>\n<p>"), true) +
			"</p>"
		);

		/*
		console.log(title);
		console.log(titleHTML);
		console.log(image);
		console.log(story.substring(0, 200));
		*/
	}

	var src = (
		prepare.toString().replace(/^function\s+prepare\(\)\s*{|}$/g, "") + "\n\n" +
		"return \"" +
		fs.readFileSync("./source/template.html", "utf-8")
			.replace(/<!--[\W\w]*?(?=-->)-->|[\n\r\"]/g, function (match) {
				switch (match) {
					case "\n": return "\\n";
					case "\r": return "\\r";
					case "\"": return "\\\"";
					default: return match;
				}
			})
			.replace(/<!--/g, "\" + ")
			.replace(/-->/g, " + \"") +
		"\";"
	);

	// fs.writeFileSync("./source/template.js", src);

	var template = new Function("title", "blurb", "image", "story", "encodeHTML", src);
	template.modified = fs.statSync("./source/template.html").mtime;

	var buildModified = fs.statSync("./build.js").mtime;
	if (buildModified > template.modified) {
		template.modified = buildModified;
	}

	return template;
})();

var isStory = /.story$/;
fs.readdirSync("./source").forEach(function (filename) {
	if (!isStory.test(filename)) { return; }

	process.stdout.write("checking " + filename);
	//console.log("checking " + filename);

	var newFilename = "./" + path.basename(filename, ".story") + ".html";

	if (fs.existsSync(newFilename)) {
		var filemod = fs.statSync(newFilename).mtime;
		if (
			!force &&
			(filemod >= template.modified) &&
			(filemod >= fs.statSync("./source/" + filename).mtime)
		) {
			process.stdout.write(" [skipped]\n");
			return;
		}
	}

	process.stdout.write(" [writing...");
	//console.log("\twriting...");

	// console.log("reading " + filename + "...");
	var data = fs.readFileSync("./source/" + filename, "utf-8");
	var header = /^[\W\w]([^\r\n]+)\r?\n([^\r\n]+)?\r?\n(\r?\n"([^"]+)" ([^\r\n]+)\r?\n"([^"]+)" ([^\r\n]+)\r?\n)?\s*/.exec(data);
	
	if (!header) {
		console.warn("could not parse data");
		return;
	}

	var HTML = template(header[1], header[2], header.slice(3), data.substring(header[0].length), encodeHTML);

	fs.writeFileSync(newFilename, HTML);

	process.stdout.write("]\n");
});
