App.SliderReviews = (function(App){

    "use strict";

    var module = function(){
        this.options = {
            self: '.js-reviews'
        };
        this.$root = $(this.options.self);

        this.init();
    };

    module.prototype = {
        constructor: module,
        init: function() {

            this.$slider = $('.js-reviews-slider', this.$root);

            this.init_slider();

        },
        init_slider: function() {
            var swiper = new Swiper( this.$slider , {
                slidesPerView: 3,
                spaceBetween: 60,
                autoplay: 2500,
                autoplayDisableOnInteraction: false,
                breakpoints: {
                    1000: {
                        slidesPerView: 2
                    },
                    768: {
                        slidesPerView: 1
                    }
                }
            });
        }
    };

    return module;

}(App));