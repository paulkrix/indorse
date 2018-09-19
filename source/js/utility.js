var Genesis = (function( my, $ ) {

    //initialise
    jQuery(document).ready( function() {
        console.log( "Genesis online" );
    });

    // -------
    // 1. Steps

    // *. Public variables and functions
    // -----

    // 1. Steps
    // --------

    var Steps = function( _element ) {
        this.$element = $( _element );
        this.registerHandlers();
    }
    Steps.prototype.$element = null;
    Steps.prototype.open = null;

    Steps.prototype.registerHandlers = function() {
        var steps = this;
        this.$element.find( '.steps__step' ).on('click', function() {
            var index = $( this ).index();
            steps.open( index );
        });
        this.$element.find( '.steps__step-close-btn' ).on('click', function( evt ) {
            evt.preventDefault();
            evt.stopPropagation();
            steps.close();
        });
    }

    Steps.prototype.open = function( index ) {
        this.$element.addClass('owl-carousel');
        this.$element.owlCarousel({
          items: 1,
          startPosition: index,
          mouseDrag: false,
          touchDrag: false,
          pullDrag: false,
          nav: true,
          navText: [ 'PREV', 'NEXT' ]
        });
        // this.$element.trigger( 'to.owl.carousel', index );
    }

    Steps.prototype.close = function() {
        console.log("destroy");
        this.$element.trigger( 'destroy.owl.carousel' );
        this.$element.removeClass('owl-carousel');
    }

    // *. Public variables and functions
    // --------

    my.Steps = Steps;
    return my;

}( Genesis || {}, jQuery ));
