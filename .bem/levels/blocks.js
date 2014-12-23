var PATH = require('path');
var environ = require('bem-environ');

environ.LIB_DIR = 'libs';

var getTechResolver = environ.getTechResolver;
var PRJ_ROOT = environ.PRJ_ROOT;
var PRJ_TECHS = PATH.resolve(PRJ_ROOT, '.bem/techs');
var BEMCORE_TECHS = environ.getLibPath('bem-core', '.bem/techs');


exports.getTechs = function() {
    var techs = {
        'stylus'        : 'v2/styl.js',
        'css'           : 'v2/css',
        'js'            : 'v2/js-i',
        'bemdecl.js'    : 'v2/bemdecl.js',
        'deps.js'       : 'v2/deps.js'
    };

    // use techs from project (.bem/techs)
    ['bemjson.js'].forEach(getTechResolver(techs, PRJ_TECHS));

    // use techs from lib bem-core
    ['bemhtml', 'bemtree', 'vanilla.js', 'browser.js', 'node.js'].forEach(getTechResolver(techs, BEMCORE_TECHS));

    return techs;
};

exports.defaultTechs = ['stylus', 'browser.js', 'bemhtml'];
