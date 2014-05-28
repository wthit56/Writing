listen(window, "load", function () {
	var image = document.getElementsByTagName("FIGURE");
	if (image.length > 0) { image = image[0].getElementsByTagName("IMG")[0]; }
	else { image = null; }

	var summary = document.getElementsByTagName("ASIDE");
	if (summary.length > 0) { summary = summary.innerText; }
	else { summary = null; }

	var title = document.title;
	var url = window.location.href;

	var share = document.getElementById("share");
	var links = share.getElementsByTagName("A"), link;
	for (var i = 0, l = links.length; i < l; i++) {
		link = links[i];
		switch (link.getAttribute("data-site")) {
			case "google-plus":
				link.href += "?url=" + url;
				break;
			case "facebook":
				link.href += "sharer/sharer.php?s=100" +
					"&p[url]=" + url +
					(image ? "&p[images][0]=" + image.src : "") +
					"&p[title]=" + title +
					(summary ? "&p[summary]=" + summary : "");
				break;
			case "twitter":
				link.href += "?text=" + title + ". " +
					"&url=" + url;
				break;
		}
	}

	(function() { // google plus button
		window.___gcfg = {lang: 'en-GB'};
		var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
		po.src = 'https://apis.google.com/js/platform.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	})();

	var facebookLike = document.getElementById("facebook-like");
	facebookLike.src += "&href=" + escape(url);
	facebookLike.src += "&href=" + escape("http://www.google.com/");


});
