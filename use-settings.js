var foundStyle = /\bstyle=([^;]+)\b/.exec(document.cookie);
if (foundStyle) {
  	document.documentElement.className = foundStyle[1];
}

var size = 15;
var foundSize = /\bsize=([^;]+)\b/.exec(document.cookie);
if (foundSize) {
	document.body.style.fontSize = foundSize[1] + "px";
}
