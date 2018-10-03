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

    var Spinner = function( _element ) {
        this.$element = $( _element );
        this.setBounds();
    }
    Spinner.prototype.top = null;
    Spinner.prototype.bottom = null;
    Spinner.prototype.$element = null;
    Spinner.prototype.setBounds = function() {
        this.top = this.$element.offset().top - $( window ).height();
        // console.log( "window height", $(window).height() );
        // console.log( "top", this.top );
        if( this.top < 0 ) {
            this.top = 0;
        }
        var largestDimension = Math.max( this.$element.height(), this.$element.width() );
        this.bottom = this.$element.offset().top+largestDimension;
    }
    Spinner.prototype.spin = function( scrollTop ) {
        if( scrollTop > this.top && scrollTop < this.bottom ) {
            var degrees = (scrollTop - this.top)/15.0 % 360;
            this.$element.css('transform', 'rotate(' + degrees + 'deg)');
        }
    }

    function registerListeners() {
        $( window ).scroll( function() {
            var scrollTop = $(window).scrollTop();
            for( var i = 0; i < spinners.length; i++ ) {
                spinners[i].spin.call( spinners[i], scrollTop );
            }
        });
        $( window ).resize( function() {
            for( var i = 0; i < spinners.length; i++ ) {
                spinners[i].setBounds.call( spinners[i] );
            }
        });
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
