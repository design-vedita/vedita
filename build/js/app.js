var App = {
    doc: $(document),
    win: $(window),
    body: $('body'),
    htmlTag: $('html'),
    is_touch: $('html').hasClass('touch'),
    container: $(window),
    scroll_container: $('html').add($('body')),
    is_touch_device: Modernizr.touch && (typeof(window.orientation) !== 'undefined'),
    modules: {},
    is_ie: window.navigator.userAgent.indexOf("MSIE") > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./),
    is_ff: navigator.userAgent.indexOf("Firefox") !== -1,
    is_safari: navigator.userAgent.indexOf("Safari") !== -1,
    is_chr: navigator.userAgent.indexOf("Chrome") !== -1,
    is_op: navigator.userAgent.indexOf("Opera") !== -1,
    is_android: navigator.userAgent.indexOf("Android") !== -1,
    is_mac: navigator.userAgent.indexOf("Mac") !== -1,
    is_ios: navigator.userAgent.match(/iPhone|iPad|iPod/i),
    is_edge: navigator.userAgent.indexOf("Edge") !== -1,
    update_delay: 400
    // debug: false
};

(function(App){

    App.doc.ready(function() {

        // Добавляем браузерные классы
        if (App.is_ff) {
            App.htmlTag.addClass('ff');
        }
        if (App.is_chr) {
            App.htmlTag.addClass('chrome');
        }
        if (App.is_ie) {
            App.htmlTag.addClass('ie');
        }
        if (App.is_android) {
            App.htmlTag.addClass('android');
        }
        if (App.is_mac) {
            App.htmlTag.addClass('mac');
        }
        if (App.is_safari) {
            App.htmlTag.addClass('safari');
        }
        if (App.is_ios) {
            App.htmlTag.addClass('ios');
        }

        if (App.is_edge) {
            App.htmlTag.addClass('edge');
        }

        App.modules.sliderIndex = new App.SliderIndex();
        App.modules.preloader = new App.Preloader();
        App.modules.menu = new App.Menu();
        App.modules.hideblock = new App.HideBlock();
        App.modules.topscroll = new App.TopScroll();
        App.modules.ourtechnologies = new App.OurTechnologies();
        App.modules.tariffplan = new App.TariffPlan();
        App.modules.sliderreviews = new App.SliderReviews();

    });

}(App));
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

                $(this).css({'height': ''}); //������� ������ � ���� ������, ����� �� ������� ���������� ������

                if (max < $(this).height()) {
                    max = $(this).height();
                    maxIndex = i;
                }

            });

            this.$items.eq(maxIndex).addClass('js-anchor'); // ��������� �����, �� ������� �� ������ ������

            this.$items.each(function(){
                (!$(this).hasClass('js-anchor'))
                    ? $(this).css({'height': max + 'px'})
                    : '';
            });
        }
    };

    return module;

}(App));
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