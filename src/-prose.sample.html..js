eval(require(process.cwd() + "/..js")(function() {

var prose = require("./-prose.template..js");
module.exports = prose.page({
	__filename: __filename, type: "story", released: new Date(""),
	title: "",
	blurb: "",
	blurb_short: "",
	content: [
	]
});

}))();