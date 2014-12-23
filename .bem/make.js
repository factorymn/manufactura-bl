/* global MAKE:false */

// process.env.YENV = 'production';
// process.env.BEMHTML_ENV = 'development'; // Сборка не сжатого bemhtml

var PATH = require('path');

require('bem-tools-autoprefixer').extendMake(MAKE);

MAKE.decl('Arch', {

    blocksLevelsRegexp : /^.+?\.blocks/,
    bundlesLevelsRegexp : /^.+?\.bundles$/,
    getBundlesLevels: function() {
        return [
            'test/desktop.bundles'
        ];
    },
    // Оптимизирует скорость сборки за счет кеша библиотек
    getLevelCachePolicy: function() {
        return {
            cache: false,
            except: [
                'bem-core',
                'bem-components'
            ]
        };
    }

});


MAKE.decl('BundleNode', {

    getTechs : function() {

        return [
            'bemjson.js',
            'bemdecl.js',
            'deps.js',
            'bemhtml',
            'browser.js+bemhtml',
            'stylus',
            'css',
            'html'
        ];

    },

    getForkedTechs : function() {
        return this.__base().concat(['browser.js+bemhtml', 'stylus']);
    },

    getLevelsMap : function() {
        return {
            'test/desktop' : [
                'libs/bem-core/common.blocks',
                'libs/bem-core/desktop.blocks',
                'libs/bem-components/common.blocks',
                'libs/bem-components/desktop.blocks',
                'libs/bem-components/design/common.blocks',
                'libs/bem-components/design/desktop.blocks',
                'libs/bem-factory/common.blocks',
                'common.blocks',
                'desktop.blocks',
                'test/common.blocks',
                'test/desktop.blocks'
            ]
        };
    },

    getLevels : function() {
        var resolve = PATH.resolve.bind(PATH, this.root),
             buildLevel = this.getLevelPath().split('.')[0],
             levels = this.getLevelsMap()[buildLevel] || [];

        return levels
             .map(function(path) { return resolve(path); })
             .concat(resolve(PATH.dirname(this.getNodePrefix()), 'blocks'));
    },

    'create-css-node' : function(tech, bundleNode, magicNode) {
        var source = this.getBundlePath('stylus');
        if(this.ctx.arch.hasNode(source)) {
            return this.createAutoprefixerNode(tech, this.ctx.arch.getNode(source), bundleNode, magicNode);
        }
    },


    // собираем bemtree через borschik
    // 'create-bemtree-optimizer-node' : function(tech, bundleNode, magicNode) {
    //     return this['create-js-optimizer-node'].apply(this, arguments);
    // }

});

MAKE.decl('AutoprefixerNode', {

    getBrowsers : function() {
        return [
            'last 2 versions',
            'ie 10',
            'ff 24',
            'opera 12.16',
            'android 4',
            'ios 5',
            'android 4',
            'ios 6'
        ];
    }

});
