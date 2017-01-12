App.Menu = (function(App){
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

            this.$menu = $('.js-menu', this.$root);
            this.$submenu = $('.js-submenu', this.$root);
            this.$menuRight = $('.js-menu-right', this.$root);
            this.$menuLeft = $('.js-menu-left', this.$root);
            this.$headerTop = $('.js-header-top', this.$root);
            this.$arrowOpen = $('.js-arrow-menu', this.$root);
            this.$arrowClose = $('.js-close', this.$root);
            this.$hideMenu = $('.js-hide-menu li', this.$root);
            this.$content = $('#content');
            this.$footer = $('#footer');
            this.hideblock = $('.js-hide-block');
            this.$burger = $('.js-transform', this.$root);

            this.max_index();
            this.height_open_menu();
            this.float_menu();

            App.win.on('resize', $.proxy(this.height_open_menu, this));
            App.win.on('resize', $.proxy(this.set_size_hide_content, this));
            App.win.on('scroll', $.proxy(this.float_menu, this));

            this.$arrowOpen.on('click', $.proxy(this.bird_open, this));
            this.$arrowClose.on('click', $.proxy(this.bird_close, this));
            this.$burger.on('click', $.proxy(this.open_menu, this));

        },
        max_index: function(){
            /**
             * В массив получаем точную координату нижнего угла для каждого submenu, это нам даёт понять, насколько ниже нашей области просмотра может быть выпадающее меню.
             * Добавляем 2000, т.к. на "-" это расстояние мы прячем наше меню и также добавляем высоту нашего submenu
             */
            var arr = [];
            $(this.$submenu).each(function(i){
                arr[i] = $(this).offset().top + 2000 + $(this).outerHeight(true);
            });

            this.max = Math.max.apply(0, arr);
        },
        height_open_menu: function() {
            // Высота открытого меню
            var clientHeight  = document.documentElement.clientHeight,
                clientWidth = document.documentElement.clientWidth;

            if (clientHeight < this.max) {

                //Если высота окна больше максильмальной высоты submenu, то значение высоты правого блока меню и меню = высоте клиента
                this.$menuRight.css({'height': this.max + 'px'});
                this.$menu.css({'height': clientHeight + 'px'});

                (clientWidth > 1000) ? this.$menuLeft.css({'top':0}) : this.$menuLeft.css({'top': this.max + 'px'});

                // У больших экранов делаем левый блок top 0, чтобы не убегал вниз, иначе его делам под правым блоком
            } else {

                // Иначе правый равен высоте максимального, а само меню клиенту (подтягиваем до размера экрана)
                this.$menuRight.css({'height': this.max + 'px'});
                this.$menu.css({'height': clientHeight + 'px'});

                // У больших экранов делаем левый блок высотой по максимальному submenu, иначе по высоте клиента
                if (clientWidth > 1000) {
                    this.$menuLeft.css({'height': clientHeight + 'px','top': 0});
                    this.$menuRight.css({'height': clientHeight + 'px'});
                } else {
                    this.$menuLeft.css({'height': clientHeight + 'px', 'top': this.max + 'px'});
                }
            }
        },
        float_menu: function(){

            // Прилипает к верху экрана при прокрутке
            var scrolled = window.pageYOffset || document.documentElement.scrollTop,
                $headerHeight = this.$headerTop.outerHeight(true);

            if (scrolled >= $headerHeight && !this.$headerTop.hasClass('scrolled')) {
                this.$headerTop.addClass('float-menu');
                this.$root.css({'padding-top': $headerHeight + 'px'});
            } else {
                this.$headerTop.removeClass('float-menu');
                this.$root.css({'padding-top': ''});
            }
        },
        bird_open: function(e) {
            var parent =  e.currentTarget.parentNode;

            this.$hideMenu.each(function(){
                $(this).removeClass('show-before');
            });

            $(parent).addClass('show-before');
        },
        bird_close: function(e) {
            var parent = e.currentTarget.parentNode;

            $(parent).removeClass('show-before');
        },
        set_size_hide_content: function(){

            var $contentHeight = this.$content.outerHeight(true),
                $footerHeight = this.$footer.outerHeight(true);

            var sum = $contentHeight + $footerHeight;

            (this.$content.hasClass('menu--open')) ? this.hideblock.css({'height': sum + 'px'}) : this.hideblock.css({'height': ''});
        },
        open_menu: function(e){

            var _this = e.currentTarget;

            $(_this).toggleClass('menu--open');
            this.$content.toggleClass('menu--open');
            this.$menu.toggleClass('menu-show');
            this.$headerTop
                .removeClass('float-menu')
                .toggleClass('scrolled');
            this.hideblock.css({'z-index': 7});

            if (!$(_this).hasClass('menu--open')) {
                this.hideblock.css({'z-index': '-1'});
            }

            $("body,html").animate({
                scrollTop: 0
            }, 500);

            return false;

            this.set_size_hide_content();
        }
    };

    return module;

}(App));