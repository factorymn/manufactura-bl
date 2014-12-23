var environ = require('bem-environ');

environ.LIB_DIR = 'libs';

var getTechResolver = environ.getTechResolver;
var BEMCORE_TECHS = environ.getLibPath('bem-core', '.bem/techs');

exports.baseLevelPath = require.resolve('./blocks');

exports.getTechs = function() {
    var techs = this.__base();

    // Use techs from lib bem-core
    ['browser.js+bemhtml', 'html'].forEach(getTechResolver(techs, BEMCORE_TECHS));

    return techs;
};

// Create bundles in bemjson.js tech
exports.defaultTechs = ['bemjson.js'];
