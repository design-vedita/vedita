App.HideBlock = (function(App){
    "use strict";

    var module = function(){
        this.options = {
            self: '.js-hide-block'
        };
        this.$root = $(this.options.self);

        this.init();
    };

    module.prototype = {
        constructor: module,
        init: function(){

            this.rightHide = $('.right-percent', this.$root);
            this.leftHide = $('.left-percent', this.$root);

            this.percent_block();

            App.win.on('resize', $.proxy(this.percent_block, this));
        },
        percent_block: function() {
            // Прячем контент при открытом меню
            var clientWidth = document.documentElement.clientWidth;

            if (clientWidth <= 1960 && clientWidth > 1000) {
                this.rightHide.css({'right': 0, 'display': 'block'});
                this.leftHide.css({'display': 'block'});
            } else if (clientWidth <= 1000 && clientWidth >= 0) {
                this.leftHide.css({'width':'100%'});
                this.rightHide.css({'display':'none'});
            }
        }
    };

    return module;

}(App));