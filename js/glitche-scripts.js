/**
*	Glitche - CV/Resume/Portfolio Template (HTML)
*	Version: 1.3
*	Author: beshleyua
*	Author URL: http://themeforest.net/user/beshleyua
*	Copyright © Cvio by beshleyua. All Rights Reserved.
**/

$(function () {
	'use strict';
	
	$(window).unload(function() {});
	
	/* Set full height in blocks */
	var width = $(window).width();
	var height = $(window).height();
	$('.section.started').css({'height': height-60});
	
	/* Typed preload text */
	$('.typed-load').typed({
		stringsElement: $('.typing-load'),
		loop: true
	});
	
	/* Preloader */
	$(window).load(function() {
		$(".preloader .pre-inner").fadeOut(800, function(){
			/* Preload hide */
			$('.preloader').fadeOut();
			$('body').addClass('loaded');
			
			/* Typed subtitle */
			$('.typed-subtitle').typed({
				stringsElement: $('.typing-subtitle'),
				loop: true
			});
			
			/* Typed breadcrumbs */
			$('.typed-bread').typed({
				stringsElement: $('.typing-bread'),
				showCursor: false
			});

			/* One Page Nav */
			var url_hash = location.hash;
			var sectionElem = $(url_hash);
			if(url_hash.indexOf('#section-') == 0 && sectionElem.length){
				$('body, html').animate({scrollTop: $(url_hash).offset().top - 70}, 400);
			}
		});
	});
	
	/*Fade-out animation between load pages*/
	$('header .top-menu, .typed-bread').on('click', 'a', function(){
		var link = $(this).attr('href');
		if(link.indexOf('#section-') == 0){
			if(!$('body').hasClass('home')){
				location.href = '/'+link;
			}

			$('body, html').animate({scrollTop: $(link).offset().top - 110}, 400);
			if($('header').hasClass('active')){
				$('.menu-btn').trigger('click');
			}
		} else {
			$('body').removeClass('loaded');
			setTimeout(function() {
				location.href = "" + link;
			}, 500);
		}
		return false;
	});
	
	/*Menu mobile*/
	$('header').on('click', '.menu-btn', function(){
		if($('header').hasClass('active')){
			$('header').removeClass('active');
			$('body').addClass('loaded');
		} else {
			$('header').addClass('active');
			$('body').removeClass('loaded');
		}
		
		return false;
	});
	
	/* Hide mouse button on scroll */
	$(window).scroll(function(){
		if ($(this).scrollTop() >= 1 /*$('#blue_bor').offset().top*/) {
			$('.mouse_btn').fadeOut();
		}
		else {
			$('.mouse_btn').fadeIn();
		}
	});
	
	/* On click mouse button, page scroll down */
	$('.section').on('click', '.mouse_btn', function(){
		$('body,html').animate({
			scrollTop: height - 150
		}, 800);
	});
	
	$('body').on({
		mouseenter: function () {
			$(this).addClass('glitch-effect-white');
		},
		mouseleave: function () {
			$(this).removeClass('glitch-effect-white');
			$('.top-menu ul li.active a.btn').addClass('glitch-effect-white');
		}
	}, 'a.btn, .btn');
	
	/* Validate contact form */
	$("#cform").validate({
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		},
		success: "valid",
		submitHandler: function() {
			$.ajax({
				url: 'mailer/feedback.php',
				type: 'post',
				dataType: 'json',
				data: 'name='+ $("#cform").find('input[name="name"]').val() + '&email='+ $("#cform").find('input[name="email"]').val() + '&message=' + $("#cform").find('textarea[name="message"]').val(),
				beforeSend: function() {
				
				},
				complete: function() {
				
				},
				success: function(data) {
					$('#cform').fadeOut();
					$('.alert-success').delay(1000).fadeIn();
				}
			});
		}
	});
	
	/* Validate commect form */
	$("#comment_form").validate({
		rules: {
			name: {
				required: true
			},
			message: {
				required: true
			},
			email: {
				required: true,
				email: true
			}
		},
		success: "valid",
		submitHandler: function() {
		}
	});
	
	/* Initialize masonry items */
	var $container_clients = $('.section.clients .box-items');
	$container_clients.imagesLoaded(function() {
		$container_clients.isotope({
			itemSelector: '.box-item'
		});
	});

	/* Initialize masonry items */
	var $container_blog = $('.section.blog .box-items');
	$container_blog.imagesLoaded(function() {
		$container_blog.isotope({
			itemSelector: '.box-item'
		});
	});
	
	/*
		Initialize portfolio items
	*/
	var $container = $('.section.works .box-items');
	$container.imagesLoaded(function() {
		$container.isotope({
			itemSelector: '.box-item'
		});
	});

	/*
		Filter items on button click
	*/
	$('.filters').on( 'click', '.btn-group', function() {
		var filterValue = $(this).find('input').val();
		$container.isotope({ filter: filterValue });
		$('.filters .btn-group label').removeClass('glitch-effect');
		$(this).find('label').addClass('glitch-effect');
	});
	
	/*
		Gallery popup
	*/
	if(/\.(?:jpg|jpeg|gif|png)$/i.test($('.gallery-item:first a').attr('href'))){
		$('.gallery-item a').magnificPopup({
			gallery: {
				enabled: true
			},
			type: 'image',
			closeBtnInside: false,
			mainClass: 'mfp-fade'
		});
	}

	/*
		Media popup
	*/
	$('.has-popup-media').magnificPopup({
		type: 'inline',
		overflowY: 'auto',
		closeBtnInside: true,
		mainClass: 'mfp-fade'
	});

	/*
		Image popup
	*/
	$('.has-popup-image').magnificPopup({
		type: 'image',
		closeOnContentClick: true,
		mainClass: 'mfp-fade',
		image: {
			verticalFit: true
		}
	});
	
	/*
		Video popup
	*/
	$('.has-popup-video').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		iframe: {
            patterns: {
                youtube_short: {
                  index: 'youtu.be/',
                  id: 'youtu.be/',
                  src: 'https://www.youtube.com/embed/%id%?autoplay=1'
                }
            }
        },
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade',
		callbacks: {
			markupParse: function(template, values, item) {
				template.find('iframe').attr('allow', 'autoplay');
			}
		}
	});
	
	/*
		Music popup
	*/
	$('.has-popup-music').magnificPopup({
		disableOn: 700,
		type: 'iframe',
		removalDelay: 160,
		preloader: false,
		fixedContentPos: false,
		mainClass: 'mfp-fade'
	});

	/*
		Gallery popup
	*/
	$('.has-popup-gallery').on('click', function() {
        var gallery = $(this).attr('href');
    
        $(gallery).magnificPopup({
            delegate: 'a',
            type:'image',
            closeOnContentClick: false,
            mainClass: 'mfp-fade',
            removalDelay: 160,
            fixedContentPos: false,
            gallery: {
                enabled: true
            }
        }).magnificPopup('open');

        return false;
    });
	
	/* Resize function */
	$(window).resize(function() {
		var width = $(window).width();
		var height = $(window).height();
		
		$('.section.started').css({'height': height-60});

		/* Dotted Skills Line On Resize Window */
		var skills_dotted = $('.skills-list.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w+1});
		}
	});
	
	if(width < 840) {
		$('.section.started').css({'height': height-30});
	}

	/* One Page Menu Nav */
	if($('.section').length && $('.top-menu li a').length) {
		$(window).on('scroll', function(){
			var scrollPos = $(window).scrollTop();
			$('.top-menu ul li a').each(function () {
				if($(this).attr('href').indexOf('#section-') == 0){
					var currLink = $(this);
					var refElement = $(currLink.attr("href"));
					if(refElement.length){
						if (refElement.offset().top <= scrollPos + 120) {
							$('.top-menu ul li').removeClass("active");
							currLink.closest('li').addClass("active");
						}
					}
					if(scrollPos == 0) {
						$('.top-menu ul li').removeClass("active");
					}
				}
			});
		});
	}

	/*
		Dotted Skills Line
	*/

	function skills(){
		var skills_dotted = $('.skills.dotted .progress');
		var skills_dotted_w = skills_dotted.width();
		if(skills_dotted.length){
			skills_dotted.append('<span class="dg"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
			skills_dotted.find('.percentage').append('<span class="da"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></span>');
			skills_dotted.find('.percentage .da').css({'width':skills_dotted_w});
		}
	}
	setTimeout(skills, 1000);

	/*
		Circle Skills Line
	*/

	var skills_circles = $('.skills.circles .progress');
	if(skills_circles.length){
		skills_circles.append('<div class="slice"><div class="bar"></div><div class="fill"></div></div>');
	}
});

( function( $ ) {
	'use strict';
	
	// load html
	$.get("https://bslthemes.site/html/glitche/bar/bar.html", function (data) {
        $('body').append(data);
 		console.log(data);
    });
	
} )( jQuery );

$(function() {
$('body').append('<div class="fix-bts" style=" position: fixed; top: 60vh; right: -70px; z-index: 1111; transition: all 0.2s ease 0s;"> <a target="blank" title="Check our portfolio on Themeforest" href="https://1.envato.market/JERja" class="fix-btn brand" style=" position: relative; margin-bottom: 5px; padding: 0 10px; display: block; height: 38px; line-height: 38px; background: #fff; text-transform: uppercase; font-size: 11px; box-shadow: 0 5px 30px rgba(0, 0, 0, 0.1); font-weight: 700; text-decoration: none; color: #000; "><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="415.441px" height="415.441px" viewBox="0 0 415.441 415.441" xml:space="preserve" style=" width: 18px; height: 38px; display: inline-block; vertical-align: middle; margin-right: 10px; "> <g> <g> <path fill="#7cb342" d="M324.63,22.533C135.173,226.428,80.309,371.638,80.309,371.638c41.149,47.743,111.28,43.72,111.28,43.72 c73.921,2.31,119.192-43.522,119.192-43.522c91.861-92.516,80.549-355.302,80.549-355.302 C372.769-23.891,324.63,22.533,324.63,22.533z"></path> <path fill="#7cb342" d="M32.369,181.983c0,0-28.983,57.964,18.859,155.495L178.367,58.01C176.916,58.538,63.691,98.037,32.369,181.983z"></path> </g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>Beshleyua</a> <a target="blank" title="Buy HTML template on Themeforest" href="https://1.envato.market/QLWZ9" class="fix-btn bh" style=" position: relative; margin-bottom: 5px; padding: 0 10px; display: none; height: 38px; line-height: 38px; background: #fff; text-transform: uppercase; font-size: 11px; box-shadow: 0 5px 30px rgb(0 0 0 / 10%); font-weight: 700; text-decoration: none; color: #000; "><svg id="Capa_1" enable-background="new 0 0 512 512" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" style=" width: 18px; height: 38px; display: inline-block; vertical-align: middle; margin-right: 10px; "><path d="m504.399 185.065c-6.761-8.482-16.904-13.348-27.83-13.348h-98.604l-53.469-122.433c-3.315-7.591-12.157-11.06-19.749-7.743-7.592 3.315-11.059 12.158-7.743 19.75l48.225 110.427h-178.458l48.225-110.427c3.315-7.592-.151-16.434-7.743-19.75-7.591-3.317-16.434.15-19.749 7.743l-53.469 122.434h-98.604c-10.926 0-21.069 4.865-27.83 13.348-6.637 8.328-9.086 19.034-6.719 29.376l52.657 230c3.677 16.06 17.884 27.276 34.549 27.276h335.824c16.665 0 30.872-11.216 34.549-27.276l52.657-230.001c2.367-10.342-.082-21.048-6.719-29.376zm-80.487 256.652h-335.824c-2.547 0-4.778-1.67-5.305-3.972l-52.657-229.998c-.413-1.805.28-3.163.936-3.984.608-.764 1.985-2.045 4.369-2.045h85.503l-3.929 8.997c-3.315 7.592.151 16.434 7.743 19.75 1.954.854 3.99 1.258 5.995 1.258 5.782 0 11.292-3.363 13.754-9l9.173-21.003h204.662l9.173 21.003c2.462 5.638 7.972 9 13.754 9 2.004 0 4.041-.404 5.995-1.258 7.592-3.315 11.059-12.158 7.743-19.75l-3.929-8.997h85.503c2.384 0 3.761 1.281 4.369 2.045.655.822 1.349 2.18.936 3.983l-52.657 230c-.528 2.301-2.76 3.971-5.307 3.971z"></path><path d="m166 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15 15s15-6.716 15-15v-110c0-8.284-6.715-15-15-15z"></path><path d="m256 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15 15s15-6.716 15-15v-110c0-8.284-6.716-15-15-15z"></path><path d="m346 266.717c-8.284 0-15 6.716-15 15v110c0 8.284 6.716 15 15 15s15-6.716 15-15v-110c-.001-8.284-6.716-15-15-15z"></path></svg>Buy HTML</a> <a target="blank" title="Buy WordPress theme on Themeforest" href="https://1.envato.market/Ba1m0" class="fix-btn wp" style="display: none!important; position: relative; margin-bottom: 5px; padding: 0 10px; display: block; height: 38px; line-height: 38px; background: #fff; text-transform: uppercase; font-size: 11px; box-shadow: 0 5px 30px rgb(0 0 0 / 10%); font-weight: 700; text-decoration: none; color: #000; "><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 300 300" xml:space="preserve" style=" width: 18px; height: 38px; display: inline-block; vertical-align: middle; margin-right: 10px; "> <g id="XMLID_21_"> <path id="XMLID_4_" fill="#297197" d="M0.005,149.995c0,59.367,34.502,110.683,84.543,134.992L12.994,88.953 C4.674,107.607,0.005,128.25,0.005,149.995z M251.259,142.429c0-18.544-6.661-31.377-12.367-41.366 c-7.602-12.362-14.729-22.817-14.729-35.18c0-13.788,10.449-26.621,25.184-26.621c0.668,0,1.301,0.081,1.943,0.122 C224.608,14.932,189.049,0,150,0C97.597,0,51.497,26.89,24.674,67.603c3.525,0.116,6.843,0.188,9.655,0.188 c15.685,0,39.98-1.907,39.98-1.907c8.083-0.476,9.033,11.406,0.956,12.362c0,0-8.129,0.951-17.163,1.422l54.619,162.478 l32.827-98.447L122.18,79.667c-8.083-0.471-15.73-1.422-15.73-1.422c-8.083-0.48-7.138-12.838,0.95-12.362 c0,0,24.766,1.907,39.505,1.907c15.686,0,39.98-1.907,39.98-1.907c8.083-0.476,9.039,11.406,0.956,12.362 c0,0-8.138,0.951-17.162,1.422l54.203,161.238l14.962-49.984C247.45,171.427,251.259,155.266,251.259,142.429z M152.636,163.116 L107.628,293.89C121.067,297.841,135.28,300,150,300c17.471,0,34.224-3.015,49.813-8.503c-0.395-0.643-0.769-1.324-1.072-2.068 L152.636,163.116z M281.624,78.038c0.647,4.774,1.012,9.898,1.012,15.422c0,15.215-2.854,32.326-11.412,53.723l-45.812,132.459 c44.598-26,74.583-74.311,74.583-129.646C299.995,123.915,293.328,99.398,281.624,78.038z"></path> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg>Buy Theme</a></div>');
$('.fix-bts').on('mouseenter', function() {
$('.fix-bts').css({'right':'0'});
});
$('.fix-bts').on('mouseleave', function() {
$('.fix-bts').css({'right':'-70px'});
});
if (window.location.href.indexOf("envato-elements") > -1) {
	$('.fix-bts').hide();
}
});