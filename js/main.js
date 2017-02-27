/* global jQuery */
/* jshint browser: true */

(function ($, undefined) {
  'use strict';

  /* Sticky navbar */


  $(window).resize(function () {
    $(document.body).css("margin-top", $(".s-header").height());
  }).resize();

})(jQuery);


var Drupal = Drupal || {};

(function ($, Drupal) {

  Drupal.behaviors.fixHeader = {
    attach: function (context, settings) {
      $(document).scroll(function () {
        var scroll = $(window).scrollTop();
        if (scroll > 80) {
          $('.s-header').addClass('s-header--small');
        }
        else {
          $('.s-header').removeClass('s-header--small');
          $('.s-menu__canvas').removeClass('active');
          $('.s-menu__toggle').removeClass('active');
        }
      });
      $(document.body).css("margin-top", $(".s-header").height()).resize();
    }
  };

  Drupal.behaviors.sidebarCanvas = {
    attach: function (context, settings) {
      $('.s-menu__toggle')
        .click(function () {
          $(this).toggleClass('active');
          $('.s-menu__canvas').toggleClass('active');
        });
    }
  };


  Drupal.behaviors.mobMenu = {
    attach: function (context, settings) {

      $(function() {

        /* iterate through nested list */
console.log('start');
        $('ul.menu ul').each(function() {
          var listItem = $(this).closest('li');
          var itemLink = listItem.find('> a');
          var title = 'Espandi il menu ' + $.trim(itemLink.text());

          var trigger = $('<span></span>').attr({
            tabindex: 0,
            'aria-label': title,
            'title': title,
          });

          itemLink.append(trigger);


        });

        $('ul.menu span').click(function() {
      //    event.preventDefault();
          var node = $(this).is('a') ? $(this) : $(this).closest('a');
          /* Clear all open and not nested element  */
          console.log(this);
          if (!$(this).closest('li.open').length) {

            console.log(5);
            $('ul.menu ul li ul').slideUp(300);
            $('ul.menu li').removeClass('open');
          }

          if (node.siblings('ul').is(':visible')) {
            node.siblings('ul').slideUp(300);
            node.parent().removeClass('open');
          } else {
            node.siblings('ul').slideDown(300);
            node.parent().addClass('open');
          }
          return false;
        })
      });

    }
  };

})(jQuery, Drupal);