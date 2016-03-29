(function () {
    "use strict";

    $(function(){

        var menu = document.getElementById('menu'), // get the menu itself;
            clientHeight = document.documentElement.clientHeight,
            clientWidth = document.documentElement.clientWidth,
            content = document.getElementById('content'),
            footer = document.getElementById('footer'),
            hideBlock = document.getElementsByClassName('js-hide-block')[0],
            rectangle = document.getElementsByClassName('js-rectangle-click')[0],
            topMenu = document.getElementsByClassName('js-header-top')[0];


        /*--------------------------------------slider index--------------------------------------*/

        function slider_size(clientHeight, rectangle, topMenu) {
            var slider = document.getElementsByClassName('js-slider')[0];


            var sum = rectangle.offsetHeight + topMenu.offsetHeight; // sum height rectagle and header top-menu

            slider.style.height = (clientHeight - sum) + 'px';
        }

        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            direction: 'vertical'
        });

        /*---------------------------------------------------------------------------------------*/

        /*-----------------preloader--------------------*/
        $(window).on('load', function () {
            var $preloader = $('.page-preloader'),
                $spinner   = $preloader.find('.spinner');
            $spinner.fadeOut();
            $preloader.addClass('slow');
        });

        /*-------------------------------------------height open menu-----------------------------------------------*/
        function setClient(max, menu, clientHeight, clientWidth) {
            var menu_right = document.getElementsByClassName('js-menu-right')[0],
                menu_left = document.getElementsByClassName('js-menu-left')[0];

            if (clientHeight < max) {
                menu_right.style.cssText = 'height: '+ max + 'px';
                menu.style.cssText = 'height: '+ clientHeight + 'px';

                /**
                 * Если высота окна больше максильмальной высоты submenu, то значение высоты правого блока меню и меню = высоте клиента
                 * If the height is greater than the maximum height of the window submenu, that is the height of the right block menu and equal to the height of the client
                 */

                (clientWidth > 1000) ? menu_left.style.top = '0px' : menu_left.style.top = max + 'px';
                /*
                 * У больших экранов делаем левый блок top 0, чтобы не убегал вниз, иначе его делам под правым блоком
                 * Larger screens do top left block 0, not to run away down, otherwise it works under the right unit
                 * */

            } else {
                menu_right.style.cssText = 'height: '+ max + 'px';
                menu.style.cssText = 'height: '+ clientHeight + 'px';

                /**
                 * Иначе правый равен высоте максимального, а само меню клиенту (подтягиваем до размера экрана)
                 * Otherwise, the right is the maximum altitude, and the menu itself to the client (tightens up the screen size)
                 */

                if (clientWidth > 1000) {
                    menu_left.style.cssText = 'height: ' + clientHeight + 'px; \ top: 0';
                    menu_right.style.cssText = 'height: ' + clientHeight + 'px';
                } else {
                    menu_left.style.cssText = 'height: '+ clientHeight + 'px; \ top: ' + max +'px';
                }
                /**
                 * У больших экранов делаем левый блок высотой по максимальному submenu, иначе по высоте клиента
                 * Larger screens make the left block of the maximum height submenu, otherwise the height of the client
                 **/
            }
        }

        /*-------------------------------- maximum list------------------------------------*/
        function getOffsetRect(elem) {
            /**
             *   Получаем отступ сверху и слева для элемента
             *   We get the top margin and the left of the item
             **/

            var box = elem.getBoundingClientRect()

            var body = document.body;
            var docElem = document.documentElement;

            var scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
            var scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

            var clientTop = docElem.clientTop || body.clientTop || 0;
            var clientLeft = docElem.clientLeft || body.clientLeft || 0;

            var top  = box.top +  scrollTop - clientTop;
            var left = box.left + scrollLeft - clientLeft;

            return { top: Math.round(top), left: Math.round(left) }
        }

        var arr = Array(),
            submenu_li = document.getElementsByClassName('submenu'); //get all submenu
        for (var i = 0; i < submenu_li.length; i++) {
            arr[i] = getOffsetRect(submenu_li[i]).top + 2000 + submenu_li[i].offsetHeight;
            /**
             * В массив получаем точную координату нижнего угла для каждого submenu, это нам даёт понять, насколько ниже нашей области просмотра может быть выпадающее меню.
             * Добавляем 2000, т.к. на "-" это расстояние мы прячем наше меню и также добавляем высоту нашего submenu
             *
             * The array to get the exact coordinates of the lower corner of each submenu, it allows us to understand how our viewing area below can be a drop-down menu.
             * Adding 2000 as on "-" the distance we hide our menu and also add the height of our submenu
             **/
        }
        var max = Math.max.apply(0, arr); // max value in array

        /*----------------------------------------------------------------------------------------*/



        /*--------------------------------hide content if open menu-----------------------------*/

        function hideShowPercentBlock(clientWidth) {
            var right_hide = document.getElementsByClassName('right-percent')[0],
                left_hide = document.getElementsByClassName('left-percent')[0];

            if (clientWidth <= 1960 && clientWidth > 1000) {
                right_hide.style.right = '0';
                right_hide.style.display = 'block';
                left_hide.style.display = 'block';
            } else if (clientWidth <= 1000 && clientWidth >= 0 ) {
                left_hide.style.width = '100%';
                right_hide.style.display = 'none';
            }
        }

        /*-----------------------------------------------------------------------------------*/

        /**/
        function floatingMenu() {
            var scrolled = window.pageYOffset || document.documentElement.scrollTop,
                header = document.getElementsByClassName('js-header-top')[0],
                header_height = header.offsetHeight;

            if ( scrolled >= header_height && !header.classList.contains('scrolled')) {
                header.classList.add('float-menu');
            } else {
                header.classList.remove('float-menu');
            }


        }
        /**/
        -
            /*--------------------------------------function call--------------------------------*/

            setClient(max, menu, clientHeight, clientWidth);
        slider_size(clientHeight, rectangle, topMenu);
        hideShowPercentBlock(clientWidth);
        setSizeHideContent(content, footer);
        rectangleClick(clientHeight);

        window.onload = function(){

            floatingMenu();

            window.onscroll = function() {
                floatingMenu();
            }
        }


        window.onresize = function() {
            var clientHeight = document.documentElement.clientHeight,
                clientWidth = document.documentElement.clientWidth,
                content = document.getElementById('content'),
                rectangle = document.getElementsByClassName('js-rectangle-click')[0],
                topMenu = document.getElementsByClassName('js-header-top')[0];

            slider_size(clientHeight, rectangle, topMenu);
            setClient(max, menu, clientHeight, clientWidth);
            setSizeHideContent(content, footer);
            hideShowPercentBlock(clientWidth);
        }





        /*----------------------------------------------------------------------------------*/


        /*-------------------------------click on bird in hide-menu------------------------*/

        $('.js-arrow-menu').on('click', function(){
            var $parent = $(this).parent(),
                $menu_hide = $('.js-hide-menu li');

            // We close everything except this
            $($menu_hide).each(function(){
                $(this).removeClass('show-before');
            });

            $parent.addClass('show-before');
        });
        // close this menu item
        $('.js-close').click(function(){
            var $parent = $(this).parent();
            $parent.removeClass('show-before');
        });

        /*-------------------------------------------------------------------------------*/

        /*--------------------------------slider rectangle click-------------------------*/
        function rectangleClick(clientHeight) {
            var $rectangle = $('.js-rectangle-click');

            $($rectangle).click(function (){
                $("body,html").animate({
                    scrollTop: clientHeight
                }, 500);
                return false;
            });
        }

        /*-------------------------------------------------------------------------------*/

        /*---------------------------portfolio click arrow top---------------------------*/
        var portfolio_top = document.getElementsByClassName('js-up-page')[0];

        $(portfolio_top).click(function (){
            $("body,html").animate({
                scrollTop: 0
            }, 800);
            return false;
        });
        /*-------------------------------------------------------------------------------*/


        /*-------------------------------------visible menu--------------------------------------*/

        function setSizeHideContent(content, footer) {
            var content_height = content.offsetHeight, //get height content
                footer_height = footer.offsetHeight; //get height footer

            var sum = content_height + footer_height;



            if (content.classList.contains('menu--open')) {
                hideBlock.style.height = sum + 'px'; // if open menu hide block height = height content + height footer
            } else {
                hideBlock.style.height = ''; // else auto
            }

        }

        var burger = document.getElementsByClassName('js-transform')[0], //get button menu
            header_top  = document.getElementsByClassName('js-header-top')[0];

        burger.onclick = function(){
            burger.classList.toggle('menu--open');
            content.classList.toggle('menu--open');
            menu.classList.toggle('menu-show');
            hideBlock = document.getElementsByClassName('js-hide-block')[0];
            header_top.classList.remove('float-menu');
            header_top.classList.toggle('scrolled'); // add/remove class scrolled

            hideBlock.style.zIndex = '7';

            if(!burger.classList.contains('menu--open')) {
                hideBlock.style.zIndex = '-1';
            }


            $("body,html").animate({
                scrollTop: 0
            }, 500);
            return false;

            setSizeHideContent(content, footer);
        }
        /*---------------------------------------------------------------------------------------*/
    });
}());