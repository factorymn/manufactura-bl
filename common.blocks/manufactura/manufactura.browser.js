/* global modules:false */

modules.define('manufactura', ['i-bem__dom', 'control'], function(provide, BEMDOM, Control) {

    provide(BEMDOM.decl({ block : this.name, baseBlock : Control }, /** @lends link.prototype */{
        onSetMod : {
            js : {
                'inited' : function() {
                }
            }
        }
    }));


});

