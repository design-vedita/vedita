(function () {
    "use strict";

    $(function(){

        var menu = document.getElementById('menu'), // get the menu itself;
            client_height = document.documentElement.clientHeight,
            client_width = document.documentElement.clientWidth,
            content = document.getElementById('content'),
            footer = document.getElementById('footer'),
            hide_block = document.getElementsByClassName('js-hide-block')[0];

       /*-----------------preloader--------------------*/
        $(window).on('load', function () {
            var $preloader = $('.page-preloader'),
                $spinner   = $preloader.find('.spinner');
            $spinner.fadeOut();
            $preloader.addClass('slow');
        });

        /*-------------------------------------------height open menu-----------------------------------------------*/
        function setClient(max, menu, client_height, client_width) {
            var menu_right = document.getElementsByClassName('menu__right')[0],
                menu_left = document.getElementsByClassName('menu__left')[0];

            if (client_height > max) {
                menu_right.style.cssText = 'height: '+ client_height + 'px';
                menu.style.cssText = 'height: '+ client_height + 'px';

                /**
                 * ���� ������ ���� ������ �������������� ������ submenu, �� �������� ������ ������� ����� ���� � ���� = ������ �������
                 * If the height is greater than the maximum height of the window submenu, that is the height of the right block menu and equal to the height of the client
                 */

                (client_width > 1000) ? menu_left.style.top = '0px' : menu_left.style.top = max + 'px';
                /*
                 * � ������� ������� ������ ����� ���� top 0, ����� �� ������ ����, ����� ��� ����� ��� ������ ������
                 * Larger screens do top left block 0, not to run away down, otherwise it works under the right unit
                 * */

            } else {
                menu_right.style.cssText = 'height: '+ max + 'px';
                menu.style.cssText = 'height: '+ client_height + 'px';

                /**
                 * ����� ������ ����� ������ �������������, � ���� ���� ������� (����������� �� ������� ������)
                 * Otherwise, the right is the maximum altitude, and the menu itself to the client (tightens up the screen size)
                 */

                (client_width > 1000) ?  menu_left.style.cssText = 'height: '+ max + 'px; \ top: 0' : menu_left.style.cssText = 'height: '+ client_height + 'px; \ top: ' + max +'px';
                /**
                 * � ������� ������� ������ ����� ���� ������� �� ������������� submenu, ����� �� ������ �������
                 * Larger screens make the left block of the maximum height submenu, otherwise the height of the client
                 **/
            }
        }

        /*-------------------------------- maximum list------------------------------------*/
        function getOffsetRect(elem) {
            /**
             *   �������� ������ ������ � ����� ��� ��������
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
             * � ������ �������� ������ ���������� ������� ���� ��� ������� submenu, ��� ��� ���� ������, ��������� ���� ����� ������� ��������� ����� ���� ���������� ����.
             * ��������� 2000, �.�. �� "-" ��� ���������� �� ������ ���� ���� � ����� ��������� ������ ������ submenu
             *
             * The array to get the exact coordinates of the lower corner of each submenu, it allows us to understand how our viewing area below can be a drop-down menu.
             * Adding 2000 as on "-" the distance we hide our menu and also add the height of our submenu
             **/
        }
        var max = Math.max.apply(0, arr); // max value in array

        /*----------------------------------------------------------------------------------------*/

        /*--------------------------------------slider index--------------------------------------*/

        function slider_size() {
            var client_height = document.documentElement.clientHeight,
                slider = document.getElementsByClassName('js-slider')[0];

                slider.style.height = (client_height - 137) + 'px';
        }

        var swiper = new Swiper('.swiper-container', {
            pagination: '.swiper-pagination',
            paginationClickable: true,
            direction: 'vertical'
        });

        /*---------------------------------------------------------------------------------------*/

        /*-------------------------------------visible menu--------------------------------------*/

        function setSizeHideContent(content) {
            var content_height = content.offsetHeight, //get height content
                footer_height = footer.offsetHeight; //get height footer

            var sum = content_height + footer_height;

                if (content.classList.contains('menu--open')) {
                    hide_block.style.height = sum + 'px'; // if open menu hide block height = height content + height footer
                } else {
                    hide_block.style.height = ''; // else auto
                }

        }

        var burger = document.getElementsByClassName('js-transform')[0]; //get button menu

            burger.onclick = function(){
                burger.classList.toggle('menu--open');
                content.classList.toggle('menu--open');
                menu.classList.toggle('menu-show'),
                hide_block = document.getElementsByClassName('js-hide-block')[0];

                hide_block.style.zIndex = '7';  

                setSizeHideContent(content);
            }
        /*---------------------------------------------------------------------------------------*/

        /*--------------------------------hide content if open menu-----------------------------*/

        function hideShowPercentBlock(client_width) {
            var right_hide = document.getElementsByClassName('right-percent')[0],
                left_hide = document.getElementsByClassName('left-percent')[0];

                if (client_width <= 1960 && client_width > 1000) {
                    right_hide.style.right = '0';
                    right_hide.style.display = 'block';
                    left_hide.style.display = 'block';
                } else if (client_width <= 1000 && client_width >= 0 ) {
                    left_hide.style.width = '100%';
                    right_hide.style.display = 'none';
                }
        }

        /*-----------------------------------------------------------------------------------*/
-
        /*--------------------------------------function call--------------------------------*/

        setClient(max, menu, client_height, client_width);
        slider_size();
        hideShowPercentBlock(client_width);

        window.onresize = function() {
            var client_height = document.documentElement.clientHeight,
                client_width = document.documentElement.clientWidth,
                content = document.getElementById('content');

                slider_size();
                setClient(max, menu, client_height, client_width);
                setSizeHideContent(content);
                hideShowPercentBlock(client_width);
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
        var $rectangle = $('.js-rectangle-click'),
            height = document.documentElement.clientHeight;

            $($rectangle).click(function (){
                $("body,html").animate({
                    scrollTop: height
                }, 800);
                return false;
            });
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

    });
}());