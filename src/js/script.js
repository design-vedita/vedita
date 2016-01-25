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
        var burger = document.getElementsByClassName('js-transform')[0], //get button menu
            menu = document.getElementsByClassName('js-menu')[0], // get the menu itself
            menu_div = menu.getElementsByTagName('div')[0],
            client_height = document.documentElement.clientHeight;

            menu.style.cssText = 'height: '+ client_height + 'px; transform: translateY(-'+ client_height + 'px);';

            burger.onclick = function(){
                burger.classList.toggle('menu--open');
                menu.classList.toggle('menu-show');
                menu_div[0].classList.toggle('menu-show');
                menu_div[1].classList.toggle('menu-show');
            }

        /*----------------slider index---------------*/

        function slider_size() {
            var client_height = document.documentElement.clientHeight,
                slider = document.getElementsByClassName('js-slider')[0];

            slider.style.height = (client_height - 137) + 'px';
        }

        slider_size();

        $(window).resize(function() {
            slider_size();
        });

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
            }, 800);
            return false;
        });

        /*--------------------portfolio click arrow top-----------------*/
            var portfolio_top = document.getElementsByClassName('js-up-page')[0];

        $(portfolio_top).click(function (){
            $("body,html").animate({
                scrollTop: 0
            }, 800);
            return false;
        });


    });
}());