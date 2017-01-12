App.TopScroll = (function(App){

    // Кнопка вверх в портфолио в нижнем плавающем меню

    var module = function (){
        this.options = {
            self: '.js-up-page'
        };
        this.$root = $(this.options.self);

        this.init();
    };

    module.prototype = {
        constructor: module,
        init: function(){

            this.$root.on('click', $.proxy(this.top_scroll, this));
        },
        top_scroll: function() {
            $("body,html").animate({
                scrollTop: 0
            }, 800);
            return false;
        }
    };

    return module;

}(App));