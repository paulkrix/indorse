var Genesis = (function( my, $ ) {

    //initialise
    jQuery(document).ready( function() {
        console.log( "Genesis online" );
    });

    // -------
    // 1. Menu
    // *. Steps
    // *. Public variables and functions
    // -----

    // 1. Menu
    // --------

    var Menu = function( _element, _button ) {
        this.$element = $( _element );
        this.$button = $( _button );
        this.registerHandlers();
    }
    Menu.prototype.$element = null;
    Menu.prototype.$button = null;

    Menu.prototype.registerHandlers = function() {
        this.$button.on('click', this.toggle );
    }
    Menu.prototype.toggle = function() {
        $('body').toggleClass('body--menu-open');
    }

    // *. Steps
    // --------

    var Steps = function( _element ) {
        this.$element = $( _element );
        this.registerHandlers();
    }
    Steps.prototype.$element = null;
    Steps.prototype.storedScrollPosition = 0;

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
        this.storedScrollPosition = $( '.non-menu' ).scrollTop();
        this.$element.addClass('owl-carousel');
        this.$element.owlCarousel({
            items: 1,
            dots: false,
            startPosition: index,
            mouseDrag: false,
            touchDrag: false,
            pullDrag: false,
            nav: true,
            navText: [ 'PREV', 'NEXT' ]
        });
        this.$element.find('.owl-nav').attr('data-index', index+1 );
        var that = this;
        this.$element.on( 'change.owl.carousel', function( parameter ) {
            if( parameter.name === 'position' ) {
                that.$element.find('.owl-nav').attr('data-index', parameter.property.value+1 );
            }
        });

        //Lock scrolling
        $( '.non-menu' ).addClass('pause-scroll');
        $( '.non-menu' ).css( 'top', -this.storedScrollPosition + 'px' );
    }

    Steps.prototype.close = function() {
        this.$element.trigger( 'destroy.owl.carousel' );
        this.$element.off( 'change.owl.carousel' );
        this.$element.removeClass('owl-carousel');

        //Unlock scrolling
        $( '.non-menu' ).removeClass('pause-scroll');
        $( '.non-menu' ).css('top', '');
        $( '.non-menu' ).scrollTop( this.storedScrollPosition );
    }

    // *. Public variables and functions
    // --------

    my.Steps = Steps;
    my.Menu = Menu;
    return my;

}( Genesis || {}, jQuery ));
