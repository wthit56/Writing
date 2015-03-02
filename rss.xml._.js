var site_url = "http://wthit56.github.io/Writing/";
var index = meta.compiled["index.html._.js"].exports;
var htmlEncode = require("./-htmlEncode.js");

module.exports = (_/*<?xml version="1.0" encoding="utf-8" ?>
	<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
	  <channel>
		<atom:link href="*/ + site_url + _/*rss.xml" rel="self" />
		<title>*/ + index.title + ", by " + (index.author || require("./-defaults.json").author) + _/*</title>
		<link>*/ + encodeURI(site_url) + _/*</link>
		<description>*/ + index.blurb + _/*</description>*/ +
		meta.compiled
			.filter(function(c) {
				return (c.exports.type === "story") && (c.exports.show !== false);
			})
			.map(function(c) { return c.exports; })
			.sort(require("./-sortStories.js"))
			.slice(0, 10)
			.map(function (s) {
				return _/*
					<item>
					  <title>*/ + s.title + _/*</title>
					  <link>*/ + encodeURI(site_url + s.meta.buildpath) + _/*</link>
					  <guid>*/ + encodeURI(site_url + s.meta.buildpath) + _/*</guid>
					  <pubDate>*/ + (s.updated || s.released).toGMTString() + _/*</pubDate>
					  <description><![CDATA[*/ + htmlEncode(s.blurb) + _/*]]></description>
					</item>
				*/;
			}).join("\n") + _/*
	  </channel>
	</rss>
*/);