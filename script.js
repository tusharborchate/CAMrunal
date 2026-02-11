$(document).ready(function () {

    // ===== PRELOADER =====
    $(window).on('load', function () {
        setTimeout(function () {
            $('#preloader').addClass('hidden');
        }, 800);
    });

    // Fallback: hide preloader after 3 seconds
    setTimeout(function () {
        $('#preloader').addClass('hidden');
    }, 3000);

    // ===== PARTICLES =====
    function createParticles() {
        var container = $('#particles');
        for (var i = 0; i < 20; i++) {
            var size = Math.random() * 150 + 50;
            var particle = $('<div class="particle"></div>').css({
                width: size + 'px',
                height: size + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: Math.random() * 10 + 's',
                animationDuration: (Math.random() * 15 + 10) + 's'
            });
            container.append(particle);
        }
    }
    createParticles();

    // ===== NAVBAR SCROLL =====
    var navbar = $('#navbar');

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 80) {
            navbar.addClass('scrolled');
        } else {
            navbar.removeClass('scrolled');
        }
    });

    // ===== MOBILE MENU =====
    var hamburger = $('#hamburger');
    var navLinks = $('#navLinks');
    var mobileOverlay = $('#mobileOverlay');

    hamburger.on('click', function () {
        $(this).toggleClass('active');
        navLinks.toggleClass('mobile-active');
        mobileOverlay.toggleClass('active');
        $('body').toggleClass('no-scroll');
    });

    mobileOverlay.on('click', function () {
        hamburger.removeClass('active');
        navLinks.removeClass('mobile-active');
        mobileOverlay.removeClass('active');
        $('body').removeClass('no-scroll');
    });

    navLinks.find('a').on('click', function () {
        hamburger.removeClass('active');
        navLinks.removeClass('mobile-active');
        mobileOverlay.removeClass('active');
        $('body').removeClass('no-scroll');
    });

    // ===== ACTIVE NAV LINK ON SCROLL =====
    var sections = $('section[id]');

    $(window).on('scroll', function () {
        var scrollPos = $(this).scrollTop() + 100;

        sections.each(function () {
            var top = $(this).offset().top;
            var bottom = top + $(this).outerHeight();
            var id = $(this).attr('id');

            if (scrollPos >= top && scrollPos < bottom) {
                $('.nav-links a').removeClass('active');
                $('.nav-links a[href="#' + id + '"]').addClass('active');
            }
        });
    });

    // ===== SMOOTH SCROLL =====
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        var target = $($(this).attr('href'));
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 800, 'swing');
        }
    });

    // ===== SCROLL ANIMATIONS (Intersection Observer) =====
    function handleScrollAnimations() {
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        var el = $(entry.target);
                        var delay = el.data('delay') || 0;
                        setTimeout(function () {
                            el.addClass('visible');
                        }, delay);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            $('.fade-up, .fade-left, .fade-right').each(function () {
                observer.observe(this);
            });
        } else {
            // Fallback for older browsers
            $('.fade-up, .fade-left, .fade-right').addClass('visible');
        }
    }
    handleScrollAnimations();

    // ===== PARALLAX EFFECT =====
    $(window).on('scroll', function () {
        var scrollTop = $(this).scrollTop();

        $('.parallax-section').each(function () {
            var speed = $(this).data('speed') || 0.5;
            var offset = $(this).offset().top;
            var windowHeight = $(window).height();

            if (scrollTop + windowHeight > offset && scrollTop < offset + $(this).outerHeight()) {
                var yPos = (scrollTop - offset) * speed;
                $(this).css('background-position-y', yPos + 'px');
            }
        });
    });

    // ===== COUNTER ANIMATION =====
    var counterAnimated = {};

    function animateCounters() {
        $('.counter').each(function () {
            var el = $(this);
            var id = el.index('.counter');

            if (counterAnimated[id]) return;

            var top = el.offset().top;
            var windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > top + 50) {
                counterAnimated[id] = true;
                var target = parseInt(el.data('target'));
                var duration = 2000;
                var start = 0;
                var startTime = null;

                function step(timestamp) {
                    if (!startTime) startTime = timestamp;
                    var progress = Math.min((timestamp - startTime) / duration, 1);
                    // Ease out cubic
                    var eased = 1 - Math.pow(1 - progress, 3);
                    var current = Math.floor(eased * target);
                    el.text(current);
                    if (progress < 1) {
                        requestAnimationFrame(step);
                    } else {
                        el.text(target);
                    }
                }

                requestAnimationFrame(step);
            }
        });
    }

    $(window).on('scroll', animateCounters);
    animateCounters();

    // ===== SERVICE FILTER TABS =====
    $('.tab-btn').on('click', function () {
        var filter = $(this).data('filter');

        $('.tab-btn').removeClass('active');
        $(this).addClass('active');

        if (filter === 'all') {
            $('.service-card').removeClass('hidden');
            $('.service-card').each(function (i) {
                var card = $(this);
                setTimeout(function () {
                    card.css({ opacity: 0, transform: 'translateY(20px)' });
                    setTimeout(function () {
                        card.css({ opacity: 1, transform: 'translateY(0)', transition: '0.4s ease' });
                    }, 50);
                }, i * 80);
            });
        } else {
            $('.service-card').each(function (i) {
                var card = $(this);
                var category = card.data('category');

                if (category === filter) {
                    card.removeClass('hidden');
                    setTimeout(function () {
                        card.css({ opacity: 0, transform: 'translateY(20px)' });
                        setTimeout(function () {
                            card.css({ opacity: 1, transform: 'translateY(0)', transition: '0.4s ease' });
                        }, 50);
                    }, i * 80);
                } else {
                    card.addClass('hidden');
                }
            });
        }
    });

    // ===== TESTIMONIAL SLIDER =====
    var currentSlide = 0;
    var totalSlides = $('.testimonial-card').length;
    var track = $('#testimonialTrack');
    var dotsContainer = $('#testDots');

    // Create dots
    for (var i = 0; i < totalSlides; i++) {
        dotsContainer.append('<div class="test-dot' + (i === 0 ? ' active' : '') + '" data-slide="' + i + '"></div>');
    }

    function goToSlide(index) {
        if (index < 0) index = totalSlides - 1;
        if (index >= totalSlides) index = 0;
        currentSlide = index;
        track.css('transform', 'translateX(-' + (currentSlide * 100) + '%)');
        $('.test-dot').removeClass('active');
        $('.test-dot[data-slide="' + currentSlide + '"]').addClass('active');
    }

    $('#nextTest').on('click', function () {
        goToSlide(currentSlide + 1);
    });

    $('#prevTest').on('click', function () {
        goToSlide(currentSlide - 1);
    });

    $(document).on('click', '.test-dot', function () {
        goToSlide($(this).data('slide'));
    });

    // Auto-slide
    var autoSlide = setInterval(function () {
        goToSlide(currentSlide + 1);
    }, 5000);

    // Pause auto-slide on hover
    $('.testimonial-slider').on('mouseenter', function () {
        clearInterval(autoSlide);
    }).on('mouseleave', function () {
        autoSlide = setInterval(function () {
            goToSlide(currentSlide + 1);
        }, 5000);
    });

    // Touch/swipe support for testimonials
    var touchStartX = 0;
    var touchEndX = 0;

    $('.testimonial-slider').on('touchstart', function (e) {
        touchStartX = e.originalEvent.changedTouches[0].screenX;
    });

    $('.testimonial-slider').on('touchend', function (e) {
        touchEndX = e.originalEvent.changedTouches[0].screenX;
        var diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                goToSlide(currentSlide + 1);
            } else {
                goToSlide(currentSlide - 1);
            }
        }
    });

    // ===== BACK TO TOP =====
    var backToTop = $('#backToTop');

    $(window).on('scroll', function () {
        if ($(this).scrollTop() > 500) {
            backToTop.addClass('visible');
        } else {
            backToTop.removeClass('visible');
        }
    });

    backToTop.on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // ===== TILT EFFECT ON SERVICE CARDS =====
    if (window.innerWidth > 768) {
        $('.service-card, .exp-card').on('mousemove', function (e) {
            var rect = this.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            var centerX = rect.width / 2;
            var centerY = rect.height / 2;
            var rotateX = ((y - centerY) / centerY) * -5;
            var rotateY = ((x - centerX) / centerX) * 5;

            $(this).css('transform', 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-8px)');
        }).on('mouseleave', function () {
            $(this).css('transform', 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)');
        });
    }

    // ===== CONTACT FORM =====
    $('#contactForm').on('submit', function (e) {
        e.preventDefault();

        var btn = $(this).find('button[type="submit"]');
        var originalText = btn.html();

        btn.html('<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>');
        btn.prop('disabled', true);

        // Simulate form submission (replace with actual backend later)
        setTimeout(function () {
            btn.html('<span>Message Sent!</span> <i class="fas fa-check"></i>');
            btn.css({ background: '#22c55e', borderColor: '#22c55e' });

            setTimeout(function () {
                btn.html(originalText);
                btn.css({ background: '', borderColor: '' });
                btn.prop('disabled', false);
                $('#contactForm')[0].reset();
            }, 3000);
        }, 1500);
    });

    // ===== MAGNETIC EFFECT ON BUTTONS =====
    if (window.innerWidth > 768) {
        $('.btn-primary, .btn-outline').on('mousemove', function (e) {
            var rect = this.getBoundingClientRect();
            var x = e.clientX - rect.left - rect.width / 2;
            var y = e.clientY - rect.top - rect.height / 2;
            $(this).css('transform', 'translate(' + x * 0.15 + 'px, ' + y * 0.15 + 'px)');
        }).on('mouseleave', function () {
            $(this).css('transform', '');
        });
    }

    // ===== TYPING EFFECT FOR HERO (Optional Enhancement) =====
    var heroSubtitle = $('.hero-subtitle');
    if (heroSubtitle.length) {
        heroSubtitle.css('opacity', '0');
        setTimeout(function () {
            heroSubtitle.css({ opacity: 1, transition: 'opacity 0.6s ease' });
        }, 800);
    }

    // ===== NAVBAR HIDE/SHOW ON SCROLL =====
    var lastScroll = 0;

    $(window).on('scroll', function () {
        var currentScroll = $(this).scrollTop();

        if (currentScroll > 600) {
            if (currentScroll > lastScroll) {
                navbar.css('transform', 'translateY(-100%)');
            } else {
                navbar.css('transform', 'translateY(0)');
            }
        } else {
            navbar.css('transform', 'translateY(0)');
        }

        lastScroll = currentScroll;
    });

    // ===== CURSOR GLOW (Desktop only) =====
    if (window.innerWidth > 1024) {
        var glow = $('<div class="cursor-glow"></div>').css({
            position: 'fixed',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200,164,90,0.06) 0%, transparent 70%)',
            pointerEvents: 'none',
            zIndex: '1',
            transform: 'translate(-50%, -50%)',
            transition: 'opacity 0.3s'
        });
        $('body').append(glow);

        $(document).on('mousemove', function (e) {
            glow.css({ left: e.clientX + 'px', top: e.clientY + 'px' });
        });
    }

});
