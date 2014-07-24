(function addEventListener_shim() {
	if (!window.addEventListener && window.attachEvent) { // addEventListener
		(HTMLDocument || Window).prototype.addEventListener = Element.prototype.addEventListener =
			function addEventListener(type, listener, useCapture) {
				return this.attachEvent("on" + type, listener, useCapture);
			};

		(HTMLDocument || Window).prototype.removeEventListener = Element.prototype.removeEventListener =
			function removeEventListener(type, listener, useCapture) {
				return this.detachEvent("on" + type, listener);
			};
	}
})();

(function setupImages() {
	var sw = screen.width, sh=screen.height;
	
	var findSmall = /(?: |%20)\(small\)(?=\.[^.]+$)/;
	function processImage() {
		this.removeEventListener("load", processImage);

		if (
			(
				((sw > this.width) && (sh > this.height)) ||
				((sw > this.height) && (sh > this.width))
			) &&
			findSmall.test(this.src)
		) {
			var large = new Image();
			large.small = this;
			large.className = "large";
			large.addEventListener("load", processLarge);
			large.src = this.src.replace(findSmall, "");
		}
	}
	function processLarge() {
		this.removeEventListener("load", processLarge);
		this.small.parentNode.insertBefore(this, this.small);
		this.small.className = "small";
	}

	Array.prototype.forEach.call(document.getElementsByClassName("image"), function(img) {
		img = img.getElementsByTagName("IMG")[0];
		if (img.complete) {
			processImage.call(img);
		}
		else {
			img.addEventListener("load", processImage);
		}
	});
})();

(function setupControls() {
	var controls = document.getElementById("controls");
	controls.className = controls.className.replace(/^no-script +| +no-script(?= |$)/, "");

	var cookie = document.cookie,
		expires = new Date(Date.now() + (28 * 24 * 60 * 60 * 1000));

	function setClass() {
		document.body.className = "print-hook " + colours + " " + (justified ? "justified" : "not-justified");
	}

	var colours = "b-w";
	(function setupColours() {
		var options = ["b-w", "grey", "sepia", "w-b"];
			
		var form = document.getElementById("colours");
		form.addEventListener("reset", function() {
			setTimeout(update, 0);
		});
			
		var value = document.getElementById("colours-value");
		value.addEventListener("change", update);
		
		function update(forceSave) {
			if (colours !== value.value) {
				colours = value.value;
				setClass();
				save();
			}
			else if (forceSave) {
				save();
			}
		}
		function save() {
			document.cookie = "c="+options.indexOf(value.value)+";expires="+expires;
		}
		
		var cookieColours = cookie.match(/(?:^|;\s*)c=([0-4])(?=;|$)/);
		if (cookieColours) {
			value.value = colours = options[cookieColours[1]];
			save();
		}
	})();
	
	var justified = true;
	(function setupJustified() {
		var value = document.getElementById("justified");
		value.addEventListener("change", update);
		
		function update(forceSave) {
			if (value.checked !== justified) {
				justified = value.checked;
				setClass();
				save();
			}
			else if (forceSave) {
				save();
			}
		}
		function save() {
			document.cookie = "j=" + (justified ? 1 : 0) + ";expires=" + expires;
		}
		
		var cookieJustified = cookie.match(/(?:^|;\s*)j=([01])(?=;|$)/);
		if (cookieJustified) {
			value.checked = justified = (cookieJustified[1] === "1");
			save();
		}
	})();
	
	var fontSize = 17;
	(function setupFontSize() {
		var min = 15, max = 30;
		
		var form = document.getElementById("font-size");
		form.addEventListener("reset", function() {
			setTimeout(update, 0);
		});
		form.addEventListener("submit", function(e) {
			e.preventDefault();
		});
		
		var value = document.getElementById("font-size-value");
		value.addEventListener("change", update);
		
		document.getElementById("font-size-lower").addEventListener("click", function(e) {
			if (fontSize > min) {
				value.value = fontSize - 1;
				update();
			}
			e.preventDefault();
		});
		document.getElementById("font-size-higher").addEventListener("click", function(e){
			if (fontSize < max) {
				value.value = fontSize + 1;
				update();
			}
			e.preventDefault();
		});
		
		function update() {
			if(isNaN(value.value)){
				form.reset();
			}
			else if (value.value != fontSize) {
				var newValue = +value.value;
				if(newValue<min){newValue=min;}
				else if(newValue>max){newValue=max;}
				fontSize = newValue;
				document.body.style.fontSize = fontSize + "px";
				save();
			}
		}
		function save() {
			document.cookie = "fs=" + value.value + ";expires=" + expires;
		}
		
		var cookieFontSize = cookie.match(/(?:^|;\s*)fs=(1[5-9]|2[0-9]|30)(?=;|$)/);
		if (cookieFontSize) {
			value.value = cookieFontSize[1];
			update(true);
		}
	})();
	
	setClass();
	cookie = null;
})();


(function setupLikeButtons() {
	(function setupGooglePlusButton() {
		window.___gcfg = {lang: 'en-GB'};
		var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
		po.src = 'https://apis.google.com/js/platform.js';
		var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
	})();

	document.getElementById("facebook-like").src += "&href=" + window.location.href;
})();
