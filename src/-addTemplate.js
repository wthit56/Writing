module.exports = function(obj, name) {
	if (obj.templates) {
		obj.templates.unshift(name);
		obj[name] = true;
	}
	else {
		(obj.templates = [name])[name] = true;
	}
}