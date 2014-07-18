var foundStyle = /\bstyle=([^;]+)\b/.exec(document.cookie);
if (foundStyle) {
  	document.documentElement.className = foundStyle[1];
}

var size = 15;
var foundSize = /\bsize=([^;]+)\b/.exec(document.cookie);
if (foundSize) {
	document.body.style.fontSize = foundSize[1] + "px";
}

var article = document.getElementsByTagName("ARTICLE")[0];

{
	var controls = article.appendChild(document.createElement("DIV"));
	controls.id = "controls";

	var indexLink = controls.appendChild(document.createElement("A"));
	indexLink.href = "../";
	indexLink.innerText = "Read More Stories";

	{
		var group = controls.appendChild(document.createElement("SPAN"));
		group.className = "group";

		var style = group.appendChild(document.createElement("SELECT"));
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

		var sizeControls = group.appendChild(document.createElement("SPAN"));
		sizeControls.className = "size";

		sizeControls.innerHTML = "&nbsp;";

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
	}
}