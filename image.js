var imageReplaced = false;
(function () {
	var figure = document.getElementsByTagName("FIGURE");
	if (figure.length > 0) {
		var registered = null;

		var findRes = /\s*\(480\)(?=\.[^.]+$)/;
		function checkImage() {
			if (screen.width > 480) {
				var image = figure[0].getElementsByTagName("IMG")[0];
				figure = null;

				var largeImage = new Image();
				largeImage.onload = function () {
					// console.log("large image loaded.");
					image.parentNode.replaceChild(largeImage, image);
					image = null;
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
		checkImage();

		if (registered === null) {
			registered = true;
			listen(window, "resize", checkImage);
		}
	}
})();