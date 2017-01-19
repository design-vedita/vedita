App.TariffPlan = (function(App){

    var module  = function() {
        this.options = {
            self: '.js-tariff-plan'
        };
        this.$root = $(this.options.self);

        this.init();
    };

    module.prototype = {
        constructor: module,
        init: function(){

            this.$items = $('.js-tariff-item', this.$root);

            this.items_height();

            App.win.on('resize', $.proxy(this.items_height, this));
        },
        items_height: function() {

            var $anchor = $('.js-anchor', this.$root);

            var max = 0,
                maxIndex = '';

            $anchor.each(function(){
                $(this).removeClass('js-anchor');
            });

            this.$items.each(function(i){

                $(this).css({'height': ''}); //очищаем высоту у всех элементов
                if (max < $(this).height()) {
                    max = $(this).height();
                    maxIndex = i;
                }

            });

            this.$items.eq(maxIndex).addClass('js-anchor'); // добавляем анкор

            this.$items.each(function(){
                (!$(this).hasClass('js-anchor'))
                    ? $(this).css({'height': max + 'px'})
                    : '';
            });
        }
    };

    return module;

}(App));