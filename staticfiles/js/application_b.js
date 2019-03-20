// -- global declarations
var currentWizardTabIndex = 0,
    $name = $('.form-control[name="name"]'),
    $location = $('.form-control[name="location"]'),
    $intro = $('.form-control[name="introduction"]'),
    $logo = $('input[name="logo"]'),
    $proposal = $('input[name="proposal"]'),
    $niServerLocation = $('input[name="server_location"]'),
    $niTypeOfServers = $('input[name="server_type"]'),
    $niServerSpecs = $('textarea[name="server_spec"]'),
    isValidBiName = true,
    isValidBiLocation = true,
    isValidBiIntro = true,
    isValidFileLogo = true,
    isValidFileProposal = true,
    isValidNiServerLocation = true,
    isValidNiTypeOfServers = true,
    isValidNiServerSpecs = true;

$(document).ready(function(){

    $(document).on('click', '.btn-photo', function(e){
       var $img = $(this).parents('div').eq(0).find('input[type="file"]').eq(0),
           $preview = $(this).parents('div').eq(0).find('.preview').eq(0);

       $img.trigger('click');

        $img.change(function() {
            if( $(this)[0].files[0].name.split('.').pop().toLowerCase() === 'pdf' ) {
                $preview.removeClass('has-danger').find('img').attr('src', 'assets/images/pdf-icon.jpg' );
                $preview.parents('div').eq(0).find('.error-msg').remove();
            }else{
                var reader = new FileReader();
                reader.onload = function (e) {
                    $preview.removeClass('has-danger').find('img').attr('src', e.target.result );
                    $preview.parents('div').eq(0).find('.error-msg').remove();
                }
                reader.readAsDataURL( $(this)[0].files[0] );
            }
        });
    });

    $(document).on('click', '.btn-add-row', function(e){

        var $cloneMaster = $(this).parents('div.col').eq(0).find('div.clone-master').eq(0),
            clonedRow = $cloneMaster.clone();

        clonedRow.find('input').val('');
        clonedRow.find('.preview').eq(0).find('img').attr('src', 'assets/images/preview.jpg');
        clonedRow.find('textarea').val('');
        clonedRow.insertBefore( $(this) );
    });

    $(document).on('click', '.btn-delete-row', function(e){
        total_team--;
        console.log("Total Team: " +total_team);
        if( $(this).parents('div.col').eq(0).find('div.form-row').length === 1 ) {
            return false;
        }else{
            if ( confirm('Do you really want to delete this row?') ) {
                $(this).parents('div.form-row').eq(0).fadeOut(function(){
                    $(this).remove();
                });
            }
        }
    });

    $(document).on('click', '.btn-next-tab', function(e){
        wizardNextTab('next');
    });

    $(document).on('click', '.btn-previous-tab', function(e){
        wizardNextTab('previous');
    });

    $(document).on('click', '.nav-link', function(e){
        e.preventDefault();
        e.stopPropagation();
        return false;
    });

    $(document).on('focus', '.form-control', function(e){
        if ( $(this).parents('.input-group').length ) {
            $(this).parents('.input-group').eq(0).addClass('input-group-focus');
        }
    });
    $(document).on('blur', '.form-control', function(e){
        if ( $(this).parents('.input-group').length ) {
            $(this).parents('.input-group').eq(0).removeClass('input-group-focus');
        }
    });

    // -- validation for first tab
    $name.on('blur', function(e){
        if( $.trim( $(this).val() ) === '' ) {
            $(this).parents('.input-group').addClass('has-danger');
            if( !$(this).parents('.input-group').parents('div').eq(0).find('.error-msg').length ) {
                $('<span />').addClass('error-msg').html('This field is required.').insertAfter( $(this).parents('.input-group') );
            }
            isValidBiName = false;
        }else{
            $(this).parents('.input-group').removeClass('has-danger').addClass('has-success');
            $(this).parents('.input-group').parents('div').eq(0).find('.error-msg').eq(0).remove();
            isValidBiName = true;
        }
    });

    $location.on('blur', function(e){
        if( $.trim( $(this).val() ) === '' ) {
            $(this).parents('.input-group').addClass('has-danger');
            if( !$(this).parents('.input-group').parents('div').eq(0).find('.error-msg').length ) {
                $('<span />').addClass('error-msg').html('This field is required.').insertAfter( $(this).parents('.input-group') );
            }
            isValidBiLocation = false;
        }else{
            $(this).parents('.input-group').removeClass('has-danger').addClass('has-success');
            $(this).parents('.input-group').parents('div').eq(0).find('.error-msg').eq(0).remove();
            isValidBiLocation = true;
        }
    });

    $intro.on('blur', function(e){
        if( $.trim( $(this).val() ) === '' ) {
            $(this).parents('.input-group').addClass('has-danger');
            if( !$(this).parents('.input-group').parents('div').eq(0).find('.error-msg').length ) {
                $('<span />').addClass('error-msg').html('This field is required.').insertAfter( $(this).parents('.input-group') );
            }
            isValidBiIntro = false;
        }else{
            $(this).parents('.input-group').removeClass('has-danger').addClass('has-success');
            $(this).parents('.input-group').parents('div').eq(0).find('.error-msg').eq(0).remove();
            isValidBiIntro = true;
        }
    });

    // -- validation for second tab
    $niServerLocation.on('blur', function(e){
        if( $.trim( $(this).val() ) === '' ) {
            $(this).parents('.input-group').addClass('has-danger');
            if( !$(this).parents('.input-group').parents('div').eq(0).find('.error-msg').length ) {
                $('<span />').addClass('error-msg').html('This field is required.').insertAfter( $(this).parents('.input-group') );
            }
            isValidNiServerLocation = false;
        }else{
            $(this).parents('.input-group').removeClass('has-danger').addClass('has-success');
            $(this).parents('.input-group').parents('div').eq(0).find('.error-msg').eq(0).remove();
            isValidNiServerLocation = true;
        }
    });

    $niTypeOfServers.on('blur', function(e){
        if( $.trim( $(this).val() ) === '' ) {
            $(this).parents('.input-group').addClass('has-danger');
            if( !$(this).parents('.input-group').parents('div').eq(0).find('.error-msg').length ) {
                $('<span />').addClass('error-msg').html('This field is required.').insertAfter( $(this).parents('.input-group') );
            }
            isValidNiTypeOfServers = false;
        }else{
            $(this).parents('.input-group').removeClass('has-danger').addClass('has-success');
            $(this).parents('.input-group').parents('div').eq(0).find('.error-msg').eq(0).remove();
            isValidNiTypeOfServers = true;
        }
    });

    $niServerSpecs.on('blur', function(e){
        if( $.trim( $(this).val() ) === '' ) {
            $(this).parents('.input-group').addClass('has-danger');
            if( !$(this).parents('.input-group').parents('div').eq(0).find('.error-msg').length ) {
                $('<span />').addClass('error-msg').html('This field is required.').insertAfter( $(this).parents('.input-group') );
            }
            isValidNiServerSpecs = false;
        }else{
            $(this).parents('.input-group').removeClass('has-danger').addClass('has-success');
            $(this).parents('.input-group').parents('div').eq(0).find('.error-msg').eq(0).remove();
            isValidNiServerSpecs = true;
        }
    });
});

function wizardNextTab(step){

    // form validation
    if( currentWizardTabIndex === 0 ) { // validation for tab 1

        $name.trigger('blur');
        $location.trigger('blur');
        $intro.trigger('blur');

        if( !isValidBiName || !isValidBiLocation || !isValidBiIntro ) {
            $('html, body').animate({ scrollTop: 0 }, 500);
            return false;
        }
    }

    if( currentWizardTabIndex === 1 ) { // validation for tab 2
        $niServerLocation.trigger('blur');
        $niTypeOfServers.trigger('blur');
        $niServerSpecs.trigger('blur');

        if( !isValidNiServerLocation || !isValidNiTypeOfServers || !isValidNiServerSpecs ) {
            $('html, body').animate({ scrollTop: 0 }, 500);
            return false;
        }
    }

    if( currentWizardTabIndex === 2 ) { // validation for tab 3


    }

    // if we're here that means all validation passed already
    if( step === 'next' ) {
        $('.wizard-navigation .nav-link').eq(currentWizardTabIndex).addClass('checked').removeClass('active');
        $( $('.wizard-navigation .nav-link').eq(currentWizardTabIndex).attr('href') ).removeClass('active');
    }else{
        $('.wizard-navigation .nav-link').eq(currentWizardTabIndex-1).removeClass('checked').removeClass('active');
        $( $('.wizard-navigation .nav-link').eq(currentWizardTabIndex-1).attr('href') ).removeClass('active');
    }

    if( step === 'next' ) {
        currentWizardTabIndex = currentWizardTabIndex + 1;
        if( currentWizardTabIndex > $('.wizard-navigation .nav-link').length ) currentWizardTabIndex = $('.nav-link').length;
    }else{
        currentWizardTabIndex = currentWizardTabIndex - 1;
        if( currentWizardTabIndex < 0 ) currentWizardTabIndex = 0;
    }

    $('.wizard-navigation .nav-link').eq(currentWizardTabIndex).addClass('active');
    $( $('.wizard-navigation .nav-link').eq(currentWizardTabIndex).attr('href') ).addClass('active');

    if( step === 'previous' ) {
        $('.wizard-navigation .nav-link').eq(currentWizardTabIndex+1).removeClass('active');
        $( $('.wizard-navigation .nav-link').eq(currentWizardTabIndex+1).attr('href') ).removeClass('active');
    }

    var width = '16.6667%'; // default progressbar width i.e tab 1
    if( currentWizardTabIndex === 1 ) width = '50%'; // progressbar width for tab 2
    if( currentWizardTabIndex === 2 ) width = '83.3333%'; // progressbar width for tab 3
    $('.progress-with-circle').eq(0).find('.progress-bar').eq(0).css('width', width);

    if( currentWizardTabIndex > 0 ) { // show/hide previous button
        $('.btn-previous-tab').eq(0).removeClass('disabled').show();
    }else{
        $('.btn-previous-tab').eq(0).addClass('disabled').hide();
    }

    if( currentWizardTabIndex === 2 ) { // show/hide finish submit button
        $('.btn-finish-submit').eq(0).removeClass('disabled').show();
        $('.btn-next-tab').eq(0).addClass('disabled').hide();
    }else{
        $('.btn-next-tab').eq(0).removeClass('disabled').show();
        $('.btn-finish-submit').eq(0).addClass('disabled').hide();
    }

    $('html, body').animate({ scrollTop: 0 }, 500);
}

function validateFileUploads(){
    if( $logo[0].files.length === 0 ) {
        $logo.parents('div').eq(0).find('.preview').addClass('has-danger no-icon');
        if( !$logo.parents('div').eq(0).find('.error-msg').length ) {
            $('<span />').addClass('error-msg text-center').html('This field is required.').insertAfter( $logo.parents('div').eq(0).find('.preview') );
        }
        isValidFileLogo = false;
    }else{
        $logo.parents('div').eq(0).find('.preview').removeClass('has-danger');
        $logo.parents('div').eq(0).find('.error-msg').remove();
        isValidFileLogo = true;
    }

    if( $proposal[0].files.length === 0 ) {
        $proposal.parents('div').eq(0).find('.preview').addClass('has-danger no-icon');
        if( !$proposal.parents('div').eq(0).find('.error-msg').length ) {
            $('<span />').addClass('error-msg text-center').html('This field is required.').insertAfter( $proposal.parents('div').eq(0).find('.preview') );
        }
        isValidFileProposal = false;
    }else{
        $proposal.parents('div').eq(0).find('.preview').removeClass('has-danger');
        $proposal.parents('div').eq(0).find('.error-msg').remove();
        isValidFileProposal = true;
    }

    return ( isValidFileLogo && isValidFileProposal );
}