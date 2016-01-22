(function () {
    "use strict";

    $(function(){

        /*-----------------preloader--------------------*/
        $(window).on('load', function () {
            var $preloader = $('.page-preloader'),
                $spinner   = $preloader.find('.spinner');
            $spinner.fadeOut();
            $preloader.addClass('slow');
        });

        /*-----------------visible menu----------------*/
        var burger = document.getElementsByClassName('js-transform')[0],
            menu = document.getElementsByClassName('js-menu')[0],
            menu_div = menu.getElementsByTagName('div');

            console.log(menu);



            burger.onclick = function(){
                burger.classList.toggle('menu--open');
                menu.classList.toggle('menu-show');
                menu_div[0].classList.toggle('menu-show');
                menu_div[1].classList.toggle('menu-show');
            }

        /*----------------slider index---------------*/
        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            direction: 'vertical'
        });

        /*--------------click on bird in hide-menu----------*/
        $('.js-arrow-menu').on('click', function(){
            var $parent = $(this).parent(),
                $menu_hide = $('.js-hide-menu li');

                $($menu_hide).each(function(){
                    $(this).removeClass('show-before');
                });

                $parent.addClass('show-before');
        });

        /*-----------------slider rectangle click---------------*/
        var $rectangle = $('.js-rectangle-click'),
            height = document.documentElement.clientHeight;


        $($rectangle).click(function (){
            $("body,html").animate({
                scrollTop: height
            }, 1000);
            return false;
        });

    });
}());