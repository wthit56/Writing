var htmlEncode = require("./-htmlEncode.js");

var formatDate = (function() {
	var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var dateNum, dateDigit;

	return function formatDate(date) {
		dateNum = date.getDate();
		return monthName[date.getMonth()] + " " + dateNum + (
			(dateNum < 10) || (dateNum > 20)
				?
					(dateDigit = dateNum % 10) === 1 ? "st" :
					dateDigit === 2 ? "nd" :
					dateDigit === 3 ? "rd" :
						""
				: "th"
		) + ", " + date.getFullYear();
	};
})();

var findBlocks = /^\s*([^\s][\W\w]*?)$/gm;

module.exports = {
	toString: require("./-page.template._.js"),
	meta: meta, is_home: true,
	title: "Writing",
	blurb: "My name is Thomas Giles. I am a writer specializing in science-fiction. With many years experience in programming professionally, I enjoy bringing the technical side of sci-fi to life and strive to make such topics accessible to a wider audience. I write on a regular basis for the kind people supporting me through Patreon, my loyal beta readers giving feedback on my works and helping me hone my ability to create worlds and share them with readers.",
	main_class: "index",
	main: {
		toString: function() {
			var stories = meta.compiled.filter(function(page) {
				return (page.exports.type == "story") && (page.exports.show !== false);
			}).map(function unboxStory(story, i, a) {
				return story.exports;
			}).sort(function(a, b) {
				a = a.updated || a.released;
				b = b.updated || b.released;
				return a > b ? -1 : 1;
			});

			stories.latest = (
				stories.length < 5 ? 4 :
				(stories.length % 2 === 0) ? 4 : 3
			);

			var html = stories.map(function(story, i) {
				return _/*
					<li class="*/ +
						(i < stories.latest ? "new" : "old") +
						(
							i >= stories.latest
								? " " + ((i - stories.latest) % 2 === 0 ? "left" : "right")
								: ""
						) +
						(
							(i >= stories.latest) && (i - stories.latest < 2)
								? " top" : ""
						)
					+ _/*">
						<article>
							<h1><a href="*/ + story.meta.buildpath + _/*" class="title-link">*/ + story.title + _/*</a></h1>
							*/ + 
							require("./-complexText.js")(
								(i < stories.latest)
									? story.blurb + (story.details ? "\n" + story.details : "")
									: (story.blurb_short || story.blurb),
								{
									pre: "<p>", pre_first: _/*<p class="first">*/,
									post: "</p>", post_last: (
										(i < stories.latest) && (story.updated || story.released)
											? _/*<span class="note */ + (story.updated ? "updated" : "released") + _/* line-height"
											 title="*/ + (story.updated ? "Updated" : "Released") + _/*">
											*/ + formatDate(story.updated || story.released) + "</span></p>"
											: null
									)
								}
							) +
							(i < stories.latest ? _/*<span class="clear"></span>*/ : "") + _/*
						</article>
					</li>
				*/;
			}).join("\n");

			return _/*<ul class="centre-col">*/ + html + _/*</ul>*/;
		}
	}
};