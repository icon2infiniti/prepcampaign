// -- global declarations
var $ajaxLoader = $('#ajax-loader'),
    $ajaxLoaderBG = $ajaxLoader.find('.loader-background').eq(0),
    $html = $('html');

$(document).ready(function(){

    // -- add a class called "chrome" to <body> for ios chrome only
    $('body').removeClass('chrome');
    if( navigator.userAgent.match('CriOS') ) {
        $('body').addClass('chrome');
    }

    // -- animate the closing of the page preloader
    if( $ajaxLoader ) {
        $ajaxLoaderBG.on('webkitTransitionEnd oTransitionEnd transitionend msTransitionEnd', function() {
            $ajaxLoader.hide().removeClass('loading stop-loading');
            $html.removeClass('ajax-loading');
        });
    }
});

// -- hide the page preloader when window has finished loading
$(window).on('load', function() {
    if( $ajaxLoader ) $ajaxLoader.removeClass('loading').addClass('stop-loading');
});