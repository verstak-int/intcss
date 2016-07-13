var path = require('path');

var importTransform = function (content, pathOfFile) {

	if (!pathOfFile) {
		return content;
	};

	var curDir = path.dirname(path.relative(process.cwd(), pathOfFile));

	content = content.replace(/url\(([^(]*)\)/g, function (string, url) {
		var result;

		if (url.match(/[data:|^\/]/)) {
			result = url;
		}
		else {
			url = path.normalize(url);
			result = '/'+ path.normalize(path.join(curDir, url)).replace(/\\/g, '/');
		};

		return 'url("' + result.replace(/['"]?/g, '') +'")';
	});

	return content;
};

module.exports = importTransform;
