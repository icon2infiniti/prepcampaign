var $navOverlay = $('.sidebar-overlay').eq(0),
    $navBar = $('#sidebar').eq(0);

$(document).ready(function(){
    $(document).on('click', '.btn-sidebar', function(e){

        $(this).toggleClass('open');
        $navOverlay.toggleClass('active');
        $navBar.toggleClass('active');

        if ( $navBar.hasClass('active') ) {
            $navBar.find('a').addClass('animated fadeInRight');
        } else {
            $navBar.find('a').removeClass('animated fadeInRight');
        }
    });
});