var htmlEncode = require("./-htmlEncode.js");
var prose = (function() {
	function toString(i) {
		return _/*
			<div class="centre-col" id="content-*/ + (i + 1) + _/*">*/ +
				(this.heading ? _/*<h1>*/ + htmlEncode(this.heading) + "</h1>" : "") +
				this.content.substring(1)
					.replace(/\r?\n\s*?\r?\n/g, "\n<hr />\n")
					.replace(/^\s*(?!<hr \/>)([^\s][\W\w]*?)$/mg, htmlEncode.wrapper(1, "<p>", "</p>")) + _/*
			</div>
		*/;
	}

	return function prose_prose(heading, content) {
		if (arguments.length === 1) {
			content = heading;
			heading = null;
		}

		return {
			heading: heading, content: content,
			type: "prose", toString: toString
		};
	};
})();

module.exports = prose;

prose.img = (function() {
	function img_toString(i, a) {
		var title = htmlEncode(this.title),
			artist = htmlEncode(this.artist);

		return _/*
			<figure class="image"*/ +
				(
					i > 0
						? _/* id = "content-*/ + (i + 1) + "\""
						: ""
				) + _/*>
				<img src="*/ + this.src + "\"" +
				" alt=\"The inspiration for this story, &ldquo;" + htmlEncode(current.title) + "&rdquo;" +
					(this.artist ? " by " + artist : "") +
				"\" />" +
				(
					i < a.length - 1
						? _/*<a href="#content-*/ + (i + 2) + _/*" class="scread">Start Reading</a>*/
						: ""
				) + _/*
				<figcaption class="centre-col">
					This story is based on
					<a title="Go to the inspiration for this story, &ldquo;*/ + title + "&rdquo; by " + artist + "\"" +
					" href=\"" + this.link + _/*" target="_blank">&ldquo;*/ + title + "&rdquo;</a>" +
					(
						this.artist
							? _/* by <a title="Go to the artist that created the inspiration for this story, */ + artist + "\"" +
								" href=\"" + this.artist_link + _/*" target="_blank">*/ + artist + "</a>"
							: ""
					) + _/*
				</figcaption>
			</figure>
		*/;
	}

	return function(data) {
		data.type = "image";
		data.toString = img_toString;
		return data;
	};
})();

prose.quote = {
	note: (function() {
		function note_toString(i) {
			return _/*
				<blockquote class="centre-col quote note" id="content-*/ + (i + 1) + _/*">
					<div class="inner content">*/ +
						(this.header ? "<header>" + htmlEncode(this.header) + "</header>" : "") + 
						this.body.replace(/^\s*([^\s][\W\w]*?)$/gm, htmlEncode.wrapper("<p>", "</p>")) + 
						(this.footer ? "<footer>" + htmlEncode(this.footer) + "</footer>" : "") +
					_/*</div>
				</blockquote>
			*/;
		}

		return function(data) {
			data.type = "quote.note";
			data.toString = note_toString;
			return data;
		};
	})(),
	citation: (function() {
		function citation_toString(i) {
			return _/*
				<blockquote class="centre-col quote citation" id="content-*/ + (i + 1) + _/*">
					<div class="inner">
						<quote class="content">*/ + htmlEncode(this.quote) + "</quote>" +
						(this.attribution ? "<footer>&mdash;<cite>" + htmlEncode(this.attribution) + "</cite></footer>" : "") +
					_/*</div>
				</blockquote>
			*/;
		}

		return function(data) {
			data.type = "quote.citation";
			data.toString = citation_toString;
			return data;
		};
	})()
};

var current;

var _page = require("./-page.template._.js");

prose.page = function prose_template_page() {
	current = this;
	if (Array.isArray(this.title)) {
		this.title_complex = this.title;
		this.title = this.title.join(" ");
	}

	var html = {
		toString: _page, base: this,
		title: this.title, title_complex: this.title_complex, author: this.author,
		blurb: this.blurb + (this.details ? "\n" + this.details : ""),
		pre_controls: (this.content[0].type === "image" ? this.content[0].toString(0, this.content) : ""),
		main: (this.content[0].type === "image" ? this.content.slice(1) : this.content)
			.map(function(v, i, a) { return v ? v.toString(i, a) : ""; })
			.join("\n"),
		main_class: "prose"
	}.toString();

	current = null;
	return html;
};