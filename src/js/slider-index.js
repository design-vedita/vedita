App.SliderIndex = (function(App){
    "use strict";

    var module = function(){
        this.options = {
            self: '.js-header'
        };
        this.$root = $(this.options.self);

        this.init();
    };

    module.prototype = {
        constructor: module,
        init: function() {

            this.$slider = $('.js-slider', this.$root);
            this.$rectangle = $('.js-rectangle-click', this.$root);
            this.$menu = $('.js-header-top', this.$root);

            this.init_slider();
            this.size_slider();

            App.win.on('resize', $.proxy(this.size_slider, this));
            App.win.on('resize', $.proxy( this.resize_images, this));

            this.$rectangle.on('click', $.proxy(this.rectangle_slider, this));

        },
        init_slider: function(){
            // Слайдер на главной
            this.swiper = new Swiper( this.$slider , {
                pagination: '.swiper-pagination',
                paginationClickable: true,
                direction: 'vertical'
            });
        },
        resize_images: function() {
            this.swiper.update(true);
        },
        size_slider: function() {
            var clientHeight = document.documentElement.clientHeight;
            var sum = this.$rectangle.outerHeight() + this.$menu.outerHeight();
            this.$slider.css({'height': clientHeight - sum + 'px'});
        },
        rectangle_slider: function(){
            var clientHeight = document.documentElement.clientHeight,
                $heightMenu = this.$menu.height();

            $("body,html").animate({
                scrollTop: clientHeight - $heightMenu
            }, 500);
            return false;
        }
    };

    return module;

}(App));