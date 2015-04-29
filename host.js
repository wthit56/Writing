/*
### request
### request-file-missing
### request-file-found
### request-directory-found
### request-directory-redirect
### request-directory-index-found
### request-directory-index-missing
*/

var root = __dirname + "/src";

var __ = require("./__.js");
__.root = root;

var fs = require("fs"), path = require("path");
var wrap_callback = require("wrap-callback");
require("./prerequire.js")("./src");

var is_ = /\.\.js$/, isHidden = /^-/;

var quick_host = require("C:/Users/Thomas Giles/JavaScript/Quick-Host/v2/index.js");
quick_host(__dirname + "/src", 8000, function(error, host) {
	if (error) { throw error; }
	else {
		console.log("Server running http://localhost:" + host.port + "/...");
		host.on("request", function(request, response, resume, cancel) {
			if (is_.test(request.url)) {
				send404(request, response); cancel("..js files are hidden");
			}
			else {
				resume();
			}
		}).on("request-file-missing", function(request, response, resume, cancel) {
			if (isHidden.test(path.basename(response.path))) {
				send404(request, response); cancel("-filename files are hidden");
			}
			else {
				var callback = wrap_callback(endResponse, { request: request, response: response, resume: resume, cancel: cancel, host: host, missing: _missing });	
				response.path_ = host.root + request.path + "..js";
				fs.exists(response.path_, callback.set(check_Exists));
			}
		}).on("request-directory-index-missing", function(request, response, resume, cancel) {
			var callback = wrap_callback(endResponse, { request: request, response: response, resume: resume, cancel: cancel, host: host, missing: renderIndex });
			response.path_ = host.root + request.path + "/index.html..js";
			fs.exists(response.path_, callback.set(check_Exists));
		}).on("request-complete", function(request, response, comment) {
			console.log(
				request.path + " -> [" + response.statusCode + "]" +
				(
					comment ? " " + comment :
					response.statusCode === 404
						? "" : " \\" + path.relative(host.root, response.path)
				) + (response.mime ? " (" + response.mime + ")" : "")
			);
		});
	}
}); {
	function endResponse(error, handled, comment) {
		if (error) {
			this.state.response.writeHead(500, { "Content-Type": "text/html" });
			this.state.response.end(
				"<h1>Error serving " + path.relative(this.state.host.root, this.state.response.path) + "</h1>" +
				"<pre>" + (error.stack || error) + "</pre>"
			);
			this.state.cancel("problem serving content");
		}
		else if (handled) { this.state.cancel(comment); }
		else { this.state.resume(); }
	}

	function send404(request, response) {
		response.writeHead(404, { "Content-Type": "text/html" });
		response.end("<h1>404 - '" + request.path + "' Not Found</h1>");
	}
	{
		function check_Exists(exists) {
			var request = this.state.request, response = this.state.response;
			if (exists) {
				response.path = response.path_; delete response.path_;
				
				var ext = (request.url[request.url.length - 1] === "/") ? ".html" : path.extname(request.url);
				
				if (!ext || !(ext in quick_host.mime)) { response.writeHead(200); }
				else { response.writeHead(200, { "Content-Type": response.mime = quick_host.mime[ext] }); }
				
				var renderpath = path.relative(this.state.host.root, response.path);
				try {
					var render = require(response.path).toString(this.state.request, this.state.response);
				}
				catch (error) {
					this.error(error); return;
				}
				
				response.end(render); this.end(true, "rendered by " + renderpath);
			}
			else {
				this.state.missing.call(this);
			}
		}
		function _missing() {
			delete this.state.response.path_;
			send404(this.state.request, this.state.response);
			this.end();
		}
	}
	{
		function renderIndex() {
			fs.readdir(this.state.response.path, this.set(renderIndexFiles));
		}
		
		function renderIndexFiles(error, files) {
			if (error) { throw error; }
			else {
				var request = this.state.request, response = this.state.response;
				response.writeHead(200, { "Content-Type": quick_host.mime[".html"] });
				response.write('<h1>Index of ' + request.path + '</h1><ul>');
				if (request.path !== "/") { response.write('<li><a href="..">.. (up)</a></li>'); }
				
				for (var i = 0, l = files.length; i < l; i++) {
					var path = files[i];
					if (!isHidden.test(path)) {
						if (is_.test(path)) { path = path.replace(is_, ""); }
						response.write('<li><a href="' + path + '">' + path + '</a>');
					}
				}
				
				response.end('</ul>');
			}
		}
	}
}