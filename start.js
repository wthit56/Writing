var child_process = require("child_process");

function clearScreen() {
	console.log(new Array(process.stdout.getWindowSize()[1]).join("\r\n"));
}

var host;
function boot() {
	console.log("booting...");
	host = child_process.spawn("node", ["host.js"], { stdio: "inherit" });
	host.on("exit", handleExit);
}
function shutdown() {
	//restarts = 0;
	host.kill("SIGINT");
}
boot();

var restarts = 0;
function handleExit(code, signal) {
	if (!signal) {
		if (restarts++ > 3) {
			console.log("** Too many restarts (" + restarts + "); exiting start.js. **");
			process.exit();
		}
		else {
			shutdown(); boot();
		}
	}
}

function captureSTDIN() {
	process.stdin.setEncoding("utf8");
	var chunk, isReset = /^r(?:eset)?\r?\n$/, isBuild = /^b(?:uild)?\r?\n$/;
	process.stdin.on("readable", function() {
		chunk = process.stdin.read();
		if (isReset.test(chunk)) {
			console.log("resetting server. shutting down...");
			restarts = 0;
			shutdown(); clearScreen(); boot();
		}
		else if (isBuild.test(chunk)) {
			console.log("building site..."); clearScreen();
			child_process.spawnSync("node", ["build.js"], { stdio: "inherit" });
			console.log("build complete.\n");
		}
	});
}
captureSTDIN();