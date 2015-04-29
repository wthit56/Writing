(function shimRAF() {
	if(!("requestAnimationFrame" in window)){
		window.requestAnimationFrame = function(callback) {
			return setTimeout(function() {
				callback.apply(this, Date.now());
			}, Date.now()%16);
		};
		window.cancelAnimationFrame = function(id){
			clearTimeout(id);
		}
	}
})();

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
	var ratio = ("devicePixelRatio" in window) ? window.devicePixelRatio : 1;
	var sw = screen.width * ratio, sh = screen.height * ratio;
	
	var findSmall = /(?: |%20)\(small\)(?=\.[^.]+$)/;
	function processImage() {
		removeListeners(this);

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
			large.addEventListener("error", errorLarge);
			large.src = this.src.replace(findSmall, "");
		}
	}
	function errorImage(img){
		img = img.target;
		img.className = "error";
		removeListeners(img);
	}
	function removeListeners(img) {
		img.removeEventListener("load", processImage);
		img.removeEventListener("error", errorImage);
	}
	
	function processLarge() {
		removeListenersLarge(this);
		
		this.small.parentNode.insertBefore(this, this.small);
		this.small.className = "small";
		delete this.small;
	}
	function errorLarge(img) {
		img = img.target;
		removeListenersLarge(img);
	}
	function removeListenersLarge(img) {
		img.removeEventListener("load", processLarge);
		img.removeEventListener("error", errorLarge);
	}

	Array.prototype.forEach.call(document.getElementsByClassName("image"), function(img) {
		img = img.getElementsByTagName("IMG")[0];
		img.addEventListener("load", processImage);
		img.addEventListener("error", errorImage);
		if (img.complete) {
			var src = img.src;
			img.src = "";
			img.src = src;
		}
	});
})();

(function setupControls() {
	var controls = document.getElementById("controls");
	controls.className = controls.className.replace(
		/^no-script\s+|\s+no-script(?=\s|$)/,
		""
	);
	
	controls.open = true;
	var height = controls.offsetHeight;
	controls.open = false;
	if (controls.offsetHeight !== height) {
		controls.className += " opener";
	}
	//controls.open = true;

	var cookie = document.cookie,
		tail = ";path=/;expires="+new Date(Date.now() + (28 * 24 * 60 * 60 * 1000));

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
			document.cookie = "c="+options.indexOf(value.value)+tail;
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
			document.cookie = "j=" + (justified ? 1 : 0) + tail;
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
		form.addEventListener("submit", function(e) {
			e.preventDefault();
		});
		form.addEventListener("reset", function(e) {
			update(17, true);
		});
		
		var value = document.getElementById("font-size-value");
		value.value = fontSize;
		var autoUpdate = true;
		value.addEventListener("change", set);
		value.addEventListener("blur", set);
		function set(){
			if(autoUpdate){
				update(this.value, true);
			}
		}
		value.addEventListener("input", function() {
			if (autoUpdate) {
				update(this.value, false);
			}
		});
		
		document.getElementById("font-size-higher").addEventListener("click", function(e){
			e.preventDefault();
			update(fontSize + 1, true);
		});

		document.getElementById("font-size-lower").addEventListener("click", function(e) {
 			e.preventDefault();
 			update(fontSize - 1, true);
		});
		
		function update(newFontSize, set) {
			newFontSize = +newFontSize;
			
			if(isNaN(newFontSize)){
				autoUpdate = false;
				value.value = fontSize;
				autoUpdate = true;
			}
			else {
				if(newFontSize<min){
					if(!set){return;}
					newFontSize=min;
				}
				else if(newFontSize>max){
					if(!set){return;}
					newFontSize=max;
				}
				
				if(newFontSize!==fontSize){
					fontSize = newFontSize;
					document.body.style.fontSize=fontSize+"px";
					save();
				}
				
				if(value.value!=fontSize){
					autoUpdate = false;
					value.value = fontSize;
					autoUpdate = true;
				}
			}
		}
		
		function save() {
			console.log(document.cookie = "fs=" + fontSize + tail);
		}
		
		var cookieFontSize = cookie.match(/(?:^|;\s*)fs=(1[5-9]|2[0-9]|30)(?=;|$)/);
		if (cookieFontSize) {
			update(cookieFontSize[1], true);
			save();
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

(function setupEmailLink() {
	document.getElementById("email-link").href="mailto:"+
		"?subject="+encodeURIComponent("I just read "+document.title)+
		"&body="+encodeURIComponent("You can read it at: "+window.location.href);
})();
