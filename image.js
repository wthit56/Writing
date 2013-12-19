var imageReplaced = false;
(function () {
	var figure = document.getElementsByTagName("FIGURE");
	if (figure.length > 0) {
		var registered = null;
		var image = figure[0].getElementsByTagName("IMG")[0];

		var findRes = /\s*\(small\)(?=\.[^.]+$)/;
		function checkImage() {
			if (screen.width > image.width) {
				var largeImage = new Image();
				largeImage.onload = function () {
					// console.log("large image loaded.");
					image.parentNode.replaceChild(largeImage, image);
					figure = image = null;
				};
				// console.log("loading large image...");
				largeImage.src = image.getAttribute("src").replace(findRes, "");

				if (registered) {
					console.log("removing window resize listener");
					listen.remove(window, "resize", checkImage);
					registered = false;
				}
			}
		}

		if (image.complete) {
			checkImage();
		}
		else {
			image.onload = function () {
				checkImage();
				image.onload = null;
			};
		}

		if (registered === null) {
			registered = true;
			listen(window, "resize", checkImage);
		}
	}
})();