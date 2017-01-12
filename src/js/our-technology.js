App.OurTechnologies = (function(App){
    "use strict";

    var module = function() {
        this.options = {
            self: '.js-technologies'
        };
        this.$root = $(this.options.self);

        this.init();
    };

    module.prototype = {
        constructor: module,
        init: function(){
            this.$li = $('.js-li-bird', this.$root);

            this.$li.on('click', $.proxy(this.open_li, this));
        },
        open_li: function(e) {
            var _this = e.currentTarget,
                parent = _this.parentNode;

            var $liText = $('.js-li-text', parent);

            if ($liText.length > 0) {
                $(_this).toggleClass('open');
                $liText.toggle(400);
            }
        }
    };

    return module;
}(App));