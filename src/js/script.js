(function () {
    "use strict";

    $(function(){

        $(window).on('load', function () {
            var $preloader = $('.page-preloader'),
                $spinner   = $preloader.find('.spinner');
            $spinner.fadeOut();
            $preloader.addClass('slow');
        });

        var burger = document.getElementsByClassName('js-transform')[0],
            menu = document.getElementsByClassName('js-menu')[0],
            menu_div = menu.getElementsByTagName('div');



            burger.onclick = function(){
                burger.classList.toggle('header-top__burger-menu--open');
                menu.classList.toggle('menu-show');
                menu_div[0].classList.toggle('menu-show');
                menu_div[1].classList.toggle('menu-show');
            }

        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            direction: 'vertical'
        });

    });
}());