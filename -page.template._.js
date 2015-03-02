var html = require("./-html.template._.js"), htmlEncode = require("./-htmlEncode.js");
var complexText = require("./-complexText.js");

var hasNewlines = /[\n\r]/;
var page = module.exports = function page_template() {
	return {
		toString: html, base: this.base || this,
		title: this.title + ", by " + (this.author || require("./-defaults.json").author),
		body: _/*
			<body class="print-hook b-w justified">
				<a href="#main" class="scread">Skip to main content</a>
				*/ + (this.is_home ? "" : _/*<a href="" class="scread">Read more stories</a>*/) +
				(this.is_home ? "<div>" : _/*<article class="story">*/) + _/*
					<header class="intro for-prose centre-col">
						<h1 class="title">*/ + (
							this.title.complex
								? this.title.complex
									.map(htmlEncode.wrapper(_/*<span class="wrap-block">*/, "</span>"))
									.join(" ")
								: htmlEncode(this.title)
						) + _/*</h1>
						<h2 class="sub title">by <span class="wrap-block">*/ + (this.author || require("./-defaults.json").author) + _/*</span></h2>
						<aside class="blurb">
							*/ + complexText(
								this.blurb + (this.details ? "\n" + this.details : ""),
								{ pre: "<p>", post: "</p>", post_last: _/*<a class="home no-print" href="">Read more stories</a></p>*/ }
							) + _/*
							<span class="clear"></span>
						</aside>
					</header>

					*/ + (this.pre_controls || "") + _/*

					<details id="controls" class="seperate no-script no-selection">
						<summary class="centre-col heading">
							<span class="h2">Page Viewing Options</span>
							<span class="message is-closed">click/tap to open</span>
							<span class="message is-open">click/tap to close</span>
							<a href="#main" class="scread">Skip to main content</a>
						</summary>
						<div class="border centre-col"></div>
						<div class="positioning centre-col">
							<form id="colours" class="field complex">
								<label for="colours-value" class="label">Colour Scheme:</label
								><span class="group">
									<select id="colours-value" class="part left value select">
										<option class="b-w" value="b-w">Black on White</option>
										<option class="grey" value="grey">Grey on White</option>
										<option class="sepia" value="sepia">Sepia</option>
										<option class="w-b" value="w-b">White on Black</option>
									</select><input class="part button right" type="reset" />
								</span>
							</form>
							<div class="wrap-block">
								<form id="font-size" class="field complex">
									<label for="font-size-value" class="label">Font Size:</label
									><span class="group">
										<input id="font-size-lower" class="part left button change" value="-" type="button"
										/><input id="font-size-value" class="part value" type="number" min="15" max="30" value="17" 
										/><span class="part annotation a-right">px</span
										><input id="font-size-reset" class="part button" type="reset" 
										/><input id="font-size-higher" class="part button change right" value="+" type="button" />
									</span>
								</form>
								<form class="field simple">
									<label for="justified" class="label">Justified:</label
									><input id="justified" type="checkbox" class="part" checked />
								</form>
							</div>
						</div>
					</details>

					<section id="main"*/ + (this.main_class ? _/* class="main */ + this.main_class + _/*"*/ : "") + _/*>
						*/ + this.main + _/*
						<span class="clear"></span>
					</section>*/ +
				(this.is_home ? "</div>" : "</article>") + _/*

				<footer class="centre-col seperate pitch vcard">
					<img alt="Thomas Giles" class="avatar photo fn" src="avatar.png" />
					<p>
						This short story was supported by my followers on Patreon. 
						<span class="no-print">
							Find out more about how Patreon supports content creators and how you can too, 
							by going to <a title="Go to Thomas Giles&rsquo; Patreon page" class="url" href="//www.patreon.com/thomasgiles" target="_blank">my Patreon page</a>. 
						</span>
					</p>
					<p>
						Thanks for reading this story! If you liked it, you can 
						<a title="Subscribe to get Email Updates" href="http://blogtrottr.com/?subscribe=http://wthit56.github.io/Writing/rss.xml" target="_blank">subscribe</a>
						<span class="print-only">on the website (<a href="http://wthit56.github.io/Writing">http://wthit56.github.io/Writing</a>)</span>
						to get emailed when a new story or update is released.*/ +
						(this.is_home ? "" : _/*<a class="home no-print" href="">Read more stories</a>*/) + _/*
					</p>
					<menu class="share no-print">
						You can let others know about my writing by sharing on
						<a title="Share this story on Google Plus" data-site="google-plus" href="//plus.google.com/share" target="_blank">Google Plus</a>,
						<a title="Share this story on Facebook" data-site="facebook" href="//facebook.com/" target="_blank">Facebook</a>,
						or <a title="Share this story on Twitter" data-site="twitter" href="//www.twitter.com/share">Twitter</a>,
						<span class="likes">
							or liking this page <span class="g-plusone" data-annotation="none"></span>
							<iframe id="facebook-like" src="//www.facebook.com/plugins/like.php?width&amp;layout=button&amp;action=like&amp;show_faces=false&amp;share=false&amp;height=35" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:49px; height:22px;" allowtransparency="true"></iframe>.
						</span>
						Or you can <a id="email-link" target="_blank" href="#">email the link</a>.
					</menu>
					<p>
						With six years&rsquo; experience in web development, I am now dedicated to developing my skills as a 
						<span class="role">Writer</span>, with the help of my wonderful Alpha Readers. I live in &ldquo;sunny&rdquo; 
						<span class="adr"><span class="locality">Bournemouth</span>, <span class="country-name">England</span></span>.
					</p>
					<p class="no-print">
						You can find out more about me and my various interests on my 
						<a class="url" title="Go to Thomas Giles&rsquo; Google Plus page" href="//plus.google.com/u/0/+ThomasGiles/" target="_blank">Google Plus page</a>.
					</p>
				</footer>
				<script src="script.js" type="text/javascript"></script>
			</body>
		*/
	}.toString();
};

page.complexTitle = function() {
	var title = Array.prototype.join.call(arguments, " ");
	return {
		toString: function() { return title; },
		complex: Array.prototype.slice.call(arguments)
	};
};
