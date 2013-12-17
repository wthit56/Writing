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

	var story = document.getElementsByTagName("SECTION")[0];
	var controls = story.insertBefore(document.createElement("DIV"), story.childNodes[0]);
	controls.id = "controls";

	var style = controls.appendChild(document.createElement("SELECT"));
	function addStyle(name, className) {
		if (className == null) { className = name; }

		var option = style.appendChild(document.createElement("OPTION"));
		option.innerText = name;
		option.value = option.className = className;
		return option;
	}

	addStyle("Black on White", "Black-White");
	addStyle("Grey");
	addStyle("White on Black", "White-Black");
	addStyle("Sepia");

	listen(style, "change", function () {
		document.documentElement.className = style.value;

		var expires = new Date();
		expires.setFullYear(expires.getFullYear() + ((style.value === "Black-White") ? -1 : 1));

		document.cookie = "style=" + style.value + ";path=/;expires=" + expires.toGMTString();
		console.log(document.cookie);
	});

	if (foundStyle) {
		style.value = foundStyle[1];
	}

	controls.appendChild(document.createTextNode(" "));

	var sizeControls = controls.appendChild(document.createElement("SPAN"));
	sizeControls.className = "size";

	var sizeDown = sizeControls.appendChild(document.createElement("BUTTON"));
	sizeDown.innerText = "-";
	sizeDown.className = "change down";
	sizeDown.change = -1;
	listen(sizeDown, "click", changeSize);

	var sizeDisplay = sizeControls.appendChild(document.createElement("BUTTON"));
	sizeDisplay.className = "display";
	sizeDisplay.title = "Click to reset to default size (15px)";
	listen(sizeDisplay, "click", defaultSize);

	var sizeUp = sizeControls.appendChild(document.createElement("BUTTON"));
	sizeUp.innerText = "+";
	sizeUp.className = "change up";
	sizeUp.change = 1;
	listen(sizeUp, "click", changeSize);

	if (foundSize) {
		size = +foundSize[1];
	}
	updateSize();

	function changeSize(e) {
		if (
			((size <= 10) && (e.target.change === -1)) ||
			((size >= 30) && (e.target.change === 1))
		) { return; }

		size += e.target.change;
		updateSize();
	}

	function defaultSize() {
		size = 15;
		updateSize();
	}

	function updateSize() {
		if (size === 10) {
			console.log("size = 10");
			if (!sizeDown.disabled) {
				sizeDown.disabled = true;
			}
		}
		else if (sizeDown.disabled) {
			sizeDown.disabled = false;
		}

		if (size === 30) {
			if (!sizeUp.disabled) {
				sizeUp.disabled = true;
			}
		}
		else if (sizeUp.disabled) {
			sizeUp.disabled = false;
		}

		if (size === 15) {
			if (!sizeDisplay.disabled) {
				sizeDisplay.disabled = true;
			}
		}
		else if (sizeDisplay.disabled) {
			sizeDisplay.disabled = false;
		}

		sizeDisplay.innerText = size + "px";
		document.body.style.fontSize = size + "px";

		var expires = new Date();
		expires.setFullYear(expires.getFullYear() + ((size === 15) ? -1 : 1));
		document.cookie = "size=" + size + ";path=/;expires=" + expires.toGMTString();
	}
});
