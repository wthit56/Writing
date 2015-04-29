eval(require(process.cwd() + "/..js")(function() {

var prose = require("../-prose.template..js");
module.exports = {
	toString: prose.page, __filename: __filename, type: "story", show: false, released: new Date("Wed, 18 July 2014 11:40:00 GMT"),
	title: "Gadwell (Teaser)",
	blurb: _/*
		I have a brand new story I’m working on, featuring a detective named Gadwell. I don’t have any plans for this prose to turn up in the story, but it should give you an idea of who Detective Gadwell is and the world he lives in.
		I’ll be releasing the first few chapters, in first-draft form, to my <a title="Go to Thomas Giles’ Patreon page" href="http://www.patreon.com/thomasgiles" target="_blank">Patreon</a> supporters soon. In the meantime, I hope you enjoy this snippet!
	*/,
	blurb_short: "Flash fiction piece introducing Detective Paul Gadwell.",
	content: [
		prose(_/*
			Gadwell looked around at his apartment. Since graduation into the workforce of Montel-6 it had been home, though no photos perched in alcoves and no artwork hung on walls. All that seemed dull to him now, just as they said it would.
			Tomorrow, it would all be someone else’s. They’d take his clothes, his flat, his body… and he would take theirs. All he’d take into his new life was the keys in his pocket and the watch on his wrist.
			He strode towards the door. Then, with a silent goodbye, he opened it and stepped out into the sunlight.
		*/)
	]
};

}))();