//window.getComputedStyle(

var fixed = document.createDocumentFragment();

Array.prototype.forEach.call(document.querySelectorAll("a:empty"), function (emptyA) {
	emptyA.parentNode.removeChild(emptyA);
});

Array.prototype.forEach.call(document.querySelectorAll("span"), function (span) {
	if (window.getComputedStyle(span).fontStyle === "italic") {
		var addTo;
		if (span.previousElementSibling && (span.previousElementSibling.tagName === "EM")) {
			addTo = span.previousElementSibling;
		}
		else {
			addTo = span.parentNode.insertBefore(document.createElement("EM"), span);
		}

		for (var i = 0, l = span.childNodes.length; i < l; i++) {
			addTo.appendChild(span.childNodes[i]);
		}
	}
	else {
		span.parentNode.insertBefore(document.createTextNode(span.innerText), span);
	}

	span.parentNode.removeChild(span);
});

// [“”‘’—…]
var HTML = document.body.innerHTML.replace(/&nbsp;|(\s+class="[^"]*")/g, function (match, classAttr) {
	if (classAttr) { return ""; }
	else if (match === "&nbsp;") { return " "; }
});
var script = HTML.lastIndexOf("<script");
if (script !== -1) { HTML = HTML.substring(0, script); }
HTML = (HTML
	.replace(/^\s*|\s*(?=\s)|\s*$/g, "")
	.replace(/<\/p>\s*<p>/g, "\n")
	.replace(/<\/(h1|p)>/g, "$&\n")
	.replace(/<em>|<\/em>/g, "_")
);

var source = document.body.appendChild(document.createElement("TEXTAREA"));
source.onclick = function () { this.select(); }
source.value = HTML;
source.style.width = "700px";
source.style.height = "400px";
