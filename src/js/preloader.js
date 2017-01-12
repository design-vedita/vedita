App.Preloader = (function(App){
    "use strict";

    var module = function(){
        this.options = {
            self: '.page-preloader'
        };
        this.$root = $(this.options.self);

        this.init();
    };

    module.prototype = {
        constructor: module,
        init: function(){

            App.win.on('load', $.proxy(this.preloader, this));

        },
        preloader: function(){
            // Прелоадер
            this.$spinner = $('.spinner', this.$root);
            this.$spinner.fadeOut();
            this.$root.addClass('slow');
        }
    };

    return module;

}(App));