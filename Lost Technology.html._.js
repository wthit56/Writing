var prose = require("./-prose.template._.js");
module.exports = {
	toString: prose.page,
	meta: meta, type: "story",
	updated: new Date("Wed, 21 May 2014 21:42:00 GMT"), released: new Date("Wed, 21 May 2014 21:42:00 GMT"),
	title: "Lost Technology",
	blurb: "A little boy wanders around a museum, fascinated by ancient computing technology, guided by his companion, “AI”.",
	details: _/*
		Written for <a href="http://www.sampad.org.uk/learning/opportunities/competitions/" target="_blank">Sampad’s “Inspired By My Museum” competition</a>. It was selected to be published in the printed anthology.
		I wrote it based on an ancient memory of going to London’s National History Museum and wandering around the history of computers. They had all sorts there, including some of the first RAM (memory) and CPUs (processors, but made of wood and metal). I was really fascinated by it all, and started trying to figure out how the computer would “talk” to the different nodes in the memory grid and such.
	*/,
	content: [
		prose(_/*
			“What’s that?” Toby asked, pointing at a mess of metal and wires behind the glass.
			“I am unsure of its designation, Toby,” the soft voice in his head replied. “It does not seem to broadcast on any of the normal channels.”
			Toby was surprised. “No Wifi?”
			“No Wifi, no bluetooth, no signal of any kind.”
			Toby stepped forward, pressing his little nose up against the glass case that protected the display inside. “Hmm…” Toby mused. “Could it be a hologram of some sort?”
			“Negative,” his artificial companion replied. “There are no holo-emitters in range of this display.”
			<em>It must be real, then,</em> Toby thought. He glanced down at the small plaque in front of the object. “The first random-access memory drive,” it said, in tiny letters. “RAM?” Toby said. He’d heard the term in history a few weeks back. The class had gone to the exhibit to see these archaic machines, though such old tech didn’t interest Toby. “But why would you make storage you can’t talk to?”
			“I am not sure, Toby,” AI said. “I shall try connecting to it, and monitor for signs of activity. Perhaps it has a faulty data-out mechanism.”
			“Good idea,” Toby said.
			“Scanning…” AI said, before growing silent.
			Toby started to wander along the wide case, looking at all the machines and parts sitting inside. <em>How do they keep the dust off?</em> he thought.
			“Any luck so far, AI?” Toby asked.
			He waited a few seconds, but no reply came.
			“AI? Are you functional?”
			Still no reply.
			Toby felt his heart begin to race, thumping in his chest. How would he find his way back to the teacher with no GPS? Who would tell him when he should start back to the school bus? He’d get left behind.
			“AI!” Toby pleaded. “Talk to me!” He spun, looking wildly about the room, hoping for someone he recognised. No one’s social tags were showing; they were all just strangers to him now. No one was going to step forward. He was lost.
			Tears blurring his vision, Toby ran from the room, calling for his teacher and friends.

			A small boy ran from the IT History exhibit of the National History Museum. He scuffed past a sign, too tall for him to notice before. It showed the AI icon—a pixelated brain—with it broken in two. Below, it read: “Please turn off your AI before entering this exhibit.”
		*/)
	]
};