// -- global declarations
var $ajaxLoader = $('#ajax-loader'),
    $ajaxLoaderBG = $ajaxLoader.find('.loader-background').eq(0),
    $html = $('html'),
    $copyrightYear = $('.copyright').eq(0).find('span').eq(0),
    $circleNav = $('.circle-nav').eq(0),
    slideIndex = 0,
    isScrolling,
    scrollDirection;

$(document).ready(function(){

    // -- add a class called "chrome" to <body> for ios chrome only
    $('body').removeClass('chrome');
    if( navigator.userAgent.match('CriOS') ) {
        $('body').addClass('chrome');
    }

    // -- show latest year for copyright
    $copyrightYear.html( (new Date()).getFullYear() );

    // -- animate the closing of the page preloader
    $ajaxLoaderBG.on('webkitTransitionEnd oTransitionEnd transitionend msTransitionEnd', function() {
        $ajaxLoader.hide().removeClass('loading stop-loading');
        $html.removeClass('ajax-loading');
    });

    // -- mark the circle nav as ready for interaction
    $circleNav.removeClass('circle-nav-initial').addClass('circle-nav-ready');

    // -- change slide when user clicks on the buttons
    $(document).on('click', '.circle-nav-item', function(e){
        e.preventDefault();
        var index = $(this).data('item-index');

        slideIndex = index;

        changeSlide();
    });

    // -- detect scroll end and change slide based on up/down scroll direction
    $('.circle-nav').bind('DOMMouseScroll mousewheel touchmove', function(e){
        /*e.preventDefault();
        e.stopPropagation();*/

        if( e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0 ) {
            scrollDirection = 'down'
        } else {
            scrollDirection = 'up'
        }

        clearTimeout(isScrolling);

        isScrolling = setTimeout(function() {
            console.log( 'Scrolling has stopped.', scrollDirection );

            if ( scrollDirection == 'down' ) nextSlide();
            else prevSlide();

        }, 50);
    });
});

// -- () to change slide of the circle nav
function changeSlide(){
    $('.circle-nav-item').removeClass('active');
    $('.circle-nav-item[data-item-index="' + slideIndex.toString() + '"]').addClass('active');

    $('article').removeClass('active');
    $('#article-' + slideIndex.toString()).addClass('active');

    $circleNav.attr('data-active', slideIndex).data('active', slideIndex);

    return false;
}

// -- () to show the next slide based crrent slideIndex (defined on top as global)
function nextSlide() {
    slideIndex++;
    if( slideIndex >= $('.circle-nav-item').length ) slideIndex = $('.circle-nav-item').length - 1;

    changeSlide();
}

// -- () to show the prev slide based crrent slideIndex (defined on top as global)
function prevSlide() {
    slideIndex--;
    if( slideIndex < 0 ) slideIndex = 0;

    changeSlide();
}

// -- hide the page preloader when window has finished loading
$(window).on('load', function() {
    $ajaxLoader.removeClass('loading').addClass('stop-loading');
});