// copy($0.innerHTML.replace(/<p><\/p>/g, "\n").replace(/<p>|<\/p>/g, "").replace(/<hr>/g, ""))

var prose = require("./-prose.template._.js");
module.exports = prose.page({
	_: _, filepath: filepath, type: "story", released: new Date(""),
	title: "",
	blurb: "",
	blurb_short: "",
	content: [
	]
});