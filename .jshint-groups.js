module.exports = {
    options : {
        boss : true,
        eqeqeq : true,
        evil : true,
        expr : true,
        forin : true,
        immed : true,
        loopfunc : true,
        maxdepth : 4,
        noarg : true,
        noempty : true,
        onecase : true,
        quotmark : 'single',
        sub : true,
        supernew : true,
        trailing : true,
        undef : true,
        unused : true
    },

    groups : {
        browserjs : {
            options : {
                browser : true,
                predef : ['modules']
            },
            includes : ['*.blocks/**/*.js'],
            excludes : [
                '**/*.bem/*.js',
                '**/_*.js',
                '**/*.bh.js',
                '**/*.spec.js',
                '**/*.deps.js',
                '**/*.bemjson.js',
                'desktop.blocks/redactor/plugins/**',
                'desktop.blocks/redactor/ru.js',
                'desktop.blocks/redactor/redactor.min.js'
            ]
        },

        bemhtml : {
            options : {
                predef : [
                    'apply',
                    'applyCtx',
                    'applyNext',
                    'attrs',
                    'bem',
                    'block',
                    'cls',
                    'content',
                    'def',
                    'elem',
                    'js',
                    'local',
                    'match',
                    'mix',
                    'mod',
                    'mode',
                    'tag'
                ]
            },
            includes : ['*.blocks/**/*.bemhtml']
        },

        bhjs : {
            options : {
                node : true
            },
            includes : [
                '*.blocks/**/*.bh.js',
                'design/*.blocks/**/*.bh.js'
            ]
        },

        bemjsonjs : {
            options : {
                asi : true
            },
            includes : ['*.bundles/**/*.bemjson.js']
        },

        nodejs : {
            options : {
                node : true
            },
            includes : ['**/.bem/**/*.js'],
            excludes : [
                '.bem/cache/**',
                '.bem/**',
                'libs/**',
                'test/**',
                'node_modules/**'
            ]
        }
    }
};
