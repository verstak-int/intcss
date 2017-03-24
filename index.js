var postcss = require('postcss');

var processors = [
	{
		plugin:    require('postcss-import'),
		namespace: 'import',
		defaults:  {
			glob: true,
			transform: require('./import-transform')
		}
	},
	{
		plugin:    require('postcss-mixins'),
		namespace: 'mixins',
		defaults:  {}
	},
	{
		plugin:    require('postcss-axis'),
		namespace: 'axis',
		defaults:  {
			trbl: true
		}
	},
	{
		plugin:    require('postcss-property-lookup'),
		namespace: 'lookup',
		defaults:  {
			logLevel: 'error'
		}
	},
	{
		plugin:    require('postcss-assets'),
		namespace: 'assets',
		defaults:  {}
	},
	{
		plugin:    require('postcss-advanced-variables'),
		namespace: 'variables',
		defaults:  {}
	},
	{
		plugin:    require('postcss-color-function'),
		namespace: 'color',
		defaults:  {}
	},
	{
		plugin:    require('postcss-strip-units'),
		namespace: 'strip',
		defaults:  {}
	},
	{
		plugin:    require('postcss-conditionals'),
		namespace: 'conditionals',
		defaults:  {}
	},
	{
		plugin:    require('postcss-nested'),
		namespace: 'nested',
		defaults:  {}
	},
	{
		plugin:    require('postcss-extend'),
		namespace: 'extend',
		defaults:  {}
	},
	{
		plugin:    require('postcss-calc'),
		namespace: 'calc',
		defaults:  {}
	},
	{
		plugin:    require('postcss-svg'),
		namespace: 'svg',
		defaults:  {
			defaults: '[color]: black',
			svgo: true
		}
	},
	{
		plugin:    require('postcss-url'),
		namespace: 'url',
		defaults:  {
			url: 'inline',
			maxSize: 7
		}
	},
	{
		plugin:    require('postcss-svg-fallback'),
		namespace: 'svg-fallback',
		defaults:  {}
	},
	{
		plugin:    require('postcss-color-rgba-fallback'),
		namespace: 'rgba-fallback',
		defaults:  {}
	},
	{
		plugin:    require('autoprefixer'),
		namespace: 'autoprefixer',
		defaults:  {}
	},
	{
		plugin:    require('postcss-data-packer'),
		namespace: 'data-packer',
		defaults:  {}
	}
];

module.exports = postcss.plugin('intcss', function (options) {
	options = options || {};

	var instance = postcss();

	processors.forEach(function (processor) {
		var namespaceOptions = processor.namespace in options ? options[processor.namespace] : options;
		var processorOptions = {};

		Object.keys(processor.defaults).forEach(function (key) {
			processorOptions[key] = processor.defaults[key];
		});

		Object.keys(namespaceOptions).forEach(function (key) {
			processorOptions[key] = namespaceOptions[key];
		});

		if (namespaceOptions && !processorOptions.disable) {
			instance.use(processor.plugin(processorOptions));
		}
	});

	return instance;
});
