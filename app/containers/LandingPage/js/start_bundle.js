const isiPad = () => (navigator.platform.indexOf('iPad') !== -1);

const isiPhone = () => (
    (navigator.platform.indexOf('iPhone') !== -1) ||
    (navigator.platform.indexOf('iPod') !== -1)
);

// Carousel Feature Slide
const testimonialCarousel = () => {
    const owl = $('.owl-carousel-fullwidth');
    owl.owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        loop: true,
        margin: 0,
        nav: false,
        dots: true,
        smartSpeed: 800,
        autoHeight: false,
    });
};

const sliderMain = () => {
    $('#qbootstrap-slider-hero .flexslider').flexslider({
        animation: 'fade',
        slideshowSpeed: 5000,
        directionNav: true,
        start: () => {
            setTimeout(() => {
                $('.slider-text').removeClass('animated fadeInUp');
                $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
            }, 500);
        },
        before: () => {
            setTimeout(() => {
                $('.slider-text').removeClass('animated fadeInUp');
                $('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
            }, 500);
        },
    });
};

// animate-box
// const contentWayPoint = () => {
//     $('.animate-box').waypoint((direction) => {
//         if (direction === 'down' && !$(this).hasClass('animated')) {
//             $(this.element).addClass('fadeInUp animated');
//         }
//     }, { offset: '75%' });
// };

// Burger Menu
const burgerMenu = () => {
    $('body').on('click', '.js-qbootstrap-nav-toggle', (event) => {
        if ($('#navbar').is(':visible')) {
            $(this).removeClass('active');
        } else {
            $(this).addClass('active');
        }
        event.preventDefault();
    });
};

// Parallax
const parallax = () => {
    if ( !isiPad() || !isiPhone() ) {
        $(window).stellar();
    }
};

// Page Nav
const clickMenu = () => {
    $('a:not([class="external"])').click((event) => {
        const section = $(this).data('nav-section');
        const navbar = $('#navbar');
        $('html, body').animate({
            scrollTop: $(`[data-section="${section}"]`).offset().top,
        }, 500);

        if ( navbar.is(':visible')) {
            navbar.removeClass('in');
            navbar.attr('aria-expanded', 'false');
            $('.js-qbootstrap-nav-toggle').removeClass('active');
        }
        event.preventDefault();
        return false;
    });
};

// Reflect scrolling in navigation
const navActive = (section) => {
    const $el = $('#navbar > ul');
    $el.find('li').removeClass('active');
    $el.each(() => {
        $(this).find(`a[data-nav-section="${section}"]`).closest('li').addClass('active');
    });
};
const navigationSection = () => {
    const $section = $('div[data-section]');
    $section.waypoint((direction) => {
        if (direction === 'down') {
            navActive($(this.element).data('section'));
        }
    }, {
        offset: '150px',
    });
    $section.waypoint((direction) => {
            if (direction === 'up') {
                navActive($(this.element).data('section'));
            }
    }, {
        offset: () => -$(this.element).height() + 155,
    });
};

// Window Scroll
// const windowScroll = () => {
//     $(window).scroll(() => {
//         const header = $('#qbootstrap-header');
//         const scrlTop = $(this).scrollTop();
//         if (scrlTop > 500 && scrlTop <= 2000) {
//             header.addClass('navbar-fixed-top qbootstrap-animated slideInDown');
//         } else if (scrlTop <= 500) {
//             if (header.hasClass('navbar-fixed-top')) {
//                 header.addClass('navbar-fixed-top qbootstrap-animated slideOutUp');
//                 setTimeout(() => {
//                     header.removeClass('navbar-fixed-top qbootstrap-animated slideInDown slideOutUp');
//                 }, 100);
//             }
//         }
//     });
// };

// Animations
const contentWayPoint = () => {
    $('.animate-box').waypoint((direction) => {
        if(direction === 'down' && !$(this.element).hasClass('animated')) {
            $(this.element).addClass('item-animate');
            setTimeout(() => {
                $('body .animate-box.item-animate').each((k) => {
                    const el = $(this);
                    setTimeout(() => {
                        const effect = el.data('animate-effect');
                        if (effect === 'fadeIn') {
                            el.addClass('fadeIn animated');
                        } else if (effect === 'fadeInLeft') {
                            el.addClass('fadeInLeft animated');
                        } else if (effect === 'fadeInRight') {
                            el.addClass('fadeInRight animated');
                        } else {
                            el.addClass('fadeInUp animated');
                        }

                        el.removeClass('item-animate');
                    }, k * 50, 'easeInOutExpo');
                });
            }, 50);
        }
    }, { offset: '85%' });
};

const inlineSVG = () => {
    $('img.svg').each(() =>{
        const $img = $(this);
        const imgID = $img.attr('id');
        const imgClass = $img.attr('class');
        const imgURL = $img.attr('src');

        $.get(imgURL, (data) => {
            // Get the SVG tag, ignore the rest
            let $svg = jQuery(data).find('svg');
            // Add replaced image's ID to the new SVG
            if (typeof imgID !== 'undefined') {
                $svg = $svg.attr('id', imgID);
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', `${imgClass}replaced-svg`);
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr('xmlns:a');

            // Replace image with new SVG
            $img.replaceWith($svg);
        }, 'xml');
    });
};

// Set the date we're counting down to
const countDownDate = new Date('Oct 26, 2019 9:30:00').getTime();

// Update the count down every 1 second
const x = setInterval(() => {
    // Get todays date and time
    const now = new Date().getTime();

    // Find the distance between now an the count down date
    const distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in an element with id="demo"
    // document.getElementById("demo").innerHTML = days + "Days " + hours + "Hours "
    // + minutes + "Minutes " + seconds + "Seconds ";

    // Display the result in an element with id="demo"
    document.getElementById('days').innerHTML = `${days}<small>days</small>`;
    document.getElementById('hours').innerHTML = `${hours}<small>hours</small>`;
    document.getElementById('minutes').innerHTML = `${minutes}<small>minutes</small>`;
    document.getElementById('seconds').innerHTML = `${seconds}<small>seconds</small>`;

    // If the count down is finished, write some text
    if (distance < 0) {
        clearInterval(x);
        const e = document.getElementById('demo');
        if (e) {
            e.innerHTML = 'The Wedding Ceremony is Over';
        }
    }
}, 1000);

const bgVideo = () => {
    $('.player').mb_YTPlayer();
};

// Document on load.
setTimeout(() => {
    $();
}, 0);

const start_bundle = () => {
    burgerMenu();
    testimonialCarousel();
    sliderMain();
    clickMenu();
    parallax();
    // windowScroll();
    navigationSection();
    contentWayPoint();
    inlineSVG();
    bgVideo();
};

export default start_bundle;
