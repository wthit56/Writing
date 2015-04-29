eval(require(process.cwd() + "/..js")(function() {

var site_url = "http://wthit56.github.io/Writing/";
var pages = require("./-pages.js");
var htmlEncode = require("./-htmlEncode.js");

var is_ = /\.\.js$/;

module.exports = (_/*<?xml version="1.0" encoding="utf-8" ?>
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	  <channel>
		<atom:link href="*/ + site_url + _/*rss.xml" rel="self" />
		<title>*/ + pages.index.title + ", by " + (pages.index.author || require("./-defaults.json").author) + _/*</title>
		<link>*/ + encodeURI(site_url) + _/*</link>
		<description>*/ + pages.index.blurb + _/*</description>*/ +
		pages
			.filter(function(c) { return (c.type === "story") && (c.show !== false); })
			.sort(require("./-sortStories.js"))
			.slice(0, 10)
			.map(function (s) {
				return _/*
					<item>
					  <title>*/ + s.title + _/*</title>
					  <link>*/ + encodeURI(site_url + s.__filename.replace(is_, "")) + _/*</link>
					  <guid>*/ + encodeURI(site_url + s.__filename.replace(is_, "")) + _/*</guid>
					  <pubDate>*/ + (s.updated || s.released).toGMTString() + _/*</pubDate>
					  <description><![CDATA[*/ + htmlEncode(s.blurb) + _/*]]></description>
					</item>
				*/;
			}).join("\n") + _/*
	  </channel>
	</rss>
*/);

}))();