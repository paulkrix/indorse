/*
 * Scroll spinner
 * Rotates an element as the screen is scrolled
 */

var Genesis = (function( my, $ ) {

    //initialise
    jQuery(document).ready( function() {
        initialiseSpinners();
    });

    // -------
    // 1. Spinner
    // 2. Public variables and functions
    // -----

    // 1. Spinner
    // --------

    var spinners = [];
    var latestScrollY = 0;
    var ticking = false;

    var Spinner = function( _element ) {
        this.$element = $( _element );
    }
    Spinner.prototype.top = null;
    Spinner.prototype.bottom = null;
    Spinner.prototype.$element = null;

    Spinner.prototype.spin = function( scrollTop ) {
        var boundingRect = this.$element[0].getBoundingClientRect();
        if( boundingRect.top < $( window ).height() && boundingRect.bottom > 0 ) {
            var degrees = (scrollTop - this.top)/15.0 % 360;
            this.$element.css('transform', 'rotate(' + degrees + 'deg)');
        }
    }

    function registerListeners() {
        $( window ).scroll( onScroll );
    }

    function onScroll() {
        latestScrollY = $(window).scrollTop();
        requestTick();
    }

    function requestTick() {
        if( !ticking ) {
            requestAnimationFrame( update );
        }
        ticking = true;
    }

    function update() {
        ticking = false;
        var scrollTop = latestScrollY;
        for( var i = 0; i < spinners.length; i++ ) {
            spinners[i].spin.call( spinners[i], scrollTop );
        }
    }

    function initialiseSpinners() {
        $('.scroll-spinner').each( function() {
            spinners.push( new Spinner( this ) );
        });
        registerListeners();
    }

    // 2. Public variables and functions
    // --------

    my.Spinner = Spinner;
    return my;

}( Genesis || {}, jQuery ));
