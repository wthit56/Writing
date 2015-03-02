var path = require("path"), htmlEncode = require("./-htmlEncode.js");

module.exports = function html_template() {
	//console.log((this.base || this).meta);
	return _/*<!doctype html>
		<html>
			<head>
				<title>*/ + htmlEncode(this.title) + _/*</title>
				<meta content="text/html; charset=UTF-8" http-equiv="content-type" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<base href="*/ + path.relative(path.dirname(this.base.meta.srcpath), "") + _/*" />
				<link href="styles.css" rel="stylesheet" type="text/css" />
				<link href="print.css" rel="stylesheet" type="text/css" media="print" />
				<link href="rss.xml" rel="alternate" type="application/rss+xml" title="Writings by Thomas Giles" />
			</head>
			*/ + this.body + _/*
		</html>
	*/;
};
