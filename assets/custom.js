$(document).ready(function(){

  // faq blogs
  $('.accordion__header').click(function(e) {
    e.preventDefault();
    var $currentHeader = $(this);
    var $currentBody = $currentHeader.next('.accordion__body');
    var currentIsActive = $currentHeader.hasClass('is-active');
    $('.accordion__header').removeClass('is-active');
    $('.accordion__body').removeClass('is-active');
    if (!currentIsActive) {
      $currentHeader.addClass('is-active');
      $currentBody.addClass('is-active');
    }
  });

  // trigger whatsapp chat
  $('p.trigger_whatsapp_chat').on('click', function() {
    $('div.whatsapp_support a')[0].click();
  });

  // product page read more/less
  $('.prd_readmore').click(function (event) {
    event.preventDefault();
    var descriptionFull = document.querySelector('.product-description-full');
    descriptionFull.style.display = 'block';
    var descriptionShort = document.querySelector('.product-description-short');
    descriptionShort.style.display = 'none';
  });
    
  $('.prd_readless').click(function (event) {
    event.preventDefault();
    var descriptionFull = document.querySelector('.product-description-full');
    descriptionFull.style.display = 'none';
    var descriptionShort = document.querySelector('.product-description-short');
    descriptionShort.style.display = 'block';
  });  

  // footer menu button click for mobile
  $("#open_drawer").on("click",function(){
    $("header-drawer details#Details-menu-drawer-container summary.header__icon span").trigger("click");
  });

  // Scroll to top Button
  const $scrollToTopBtn = $('#scrollToTopBtn');
  const scrollTrigger = 1500;
  $(window).on('scroll', function() {
    if ($(document).scrollTop() > scrollTrigger) {
      $scrollToTopBtn.fadeIn();
    } else {
      $scrollToTopBtn.fadeOut();
    }
  });

  $scrollToTopBtn.on('click', function() {
    $('html, body').animate({ scrollTop: 0 }, 'smooth');
  });
  
  // Our Categories slider
  var $slider = $('.our-categorys-listing-slider');
  var $progressBar = $('.progress');
  var $progressBarLabel = $('.slider__label');
  var $slideNum = $('.slide_a_num p');
  
  $slider.on('beforeChange', function(event, slick, currentSlide, nextSlide) {   
    var calc = ( (nextSlide) / (slick.slideCount-1) ) * 100;  
    $progressBar.css('background-size', calc + '% 100%').attr('aria-valuenow', calc );
    $progressBarLabel.text( calc + '% completed' );
  });

  $slider.on('afterChange', function(event, slick, currentSlide) {
    var slideNumText = (currentSlide + 1) + ' / ' + slick.slideCount;
    $slideNum.text(slideNumText);
  });
  
  $('.our-categorys-listing-slider').slick({
    infinite: true,
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 700,
    slidesToShow: 4,
    slidesToScroll: 1,
    appendArrows: '.our-categorys-arrows',
    prevArrow:"<div class='prev_arrow'><svg width='19' height='35' viewBox='0 0 19 35' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M17.8354 34.8365C18.1308 34.8365 18.4332 34.7197 18.6599 34.493C19.1134 34.0395 19.1134 33.2975 18.6599 32.844L3.1384 17.3225L18.4332 2.02768C18.8867 1.5742 18.8867 0.832134 18.4332 0.378651C17.9797 -0.0748329 17.2376 -0.0748329 16.7841 0.378651L0.657984 16.4979C0.2045 16.9514 0.2045 17.6935 0.657984 18.147L17.004 34.493C17.2376 34.7266 17.533 34.8365 17.8354 34.8365Z' fill='white'/></svg></div>",
    nextArrow:"<div class='next_arrow'><svg width='19' height='35' viewBox='0 0 19 35' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.48251 34.8365C1.18705 34.8365 0.884697 34.7197 0.657955 34.493C0.20447 34.0395 0.20447 33.2975 0.657955 32.844L16.1795 17.3225L0.884695 2.02768C0.431211 1.5742 0.431211 0.832134 0.884695 0.378651C1.33818 -0.0748329 2.08024 -0.0748329 2.53373 0.378651L18.6599 16.4979C19.1134 16.9514 19.1134 17.6935 18.6599 18.147L2.31386 34.493C2.08025 34.7266 1.78483 34.8365 1.48251 34.8365Z' fill='white'/></svg></div>",
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        },
      },
    ],
  });

  // Logo List slider
  $('.logo-list-slider').slick({
    autoplay: true,
    autoplaySpeed: 1000,
    infinite: true,
    dots: false,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: `<div class="prev_arrow"><svg fill="#000000" height="200px" width="200px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 492 492" xml:space="preserve">
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier"><path d="M198.608,246.104L382.664,62.04c5.068-5.056,7.856-11.816,7.856-19.024c0-7.212-2.788-13.968-7.856-19.032l-16.128-16.12 C361.476,2.792,354.712,0,347.504,0s-13.964,2.792-19.028,7.864L109.328,227.008c-5.084,5.08-7.868,11.868-7.848,19.084 c-0.02,7.248,2.76,14.028,7.848,19.112l218.944,218.932c5.064,5.072,11.82,7.864,19.032,7.864c7.208,0,13.964-2.792,19.032-7.864 l16.124-16.12c10.492-10.492,10.492-27.572,0-38.06L198.608,246.104z"></path>
                  </g></svg></div>`,
    nextArrow: `<div class="next_arrow">
                  <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1_2)">
                      <path d="M119.265 100.042L44.4455 25.2195C42.3853 23.1642 41.252 20.4163 41.252 17.4862C41.252 14.5545 42.3853 11.8081 44.4455 9.74959L51.0016 3.19675C53.0585 1.13496 55.8081 0 58.7382 0C61.6683 0 64.4146 1.13496 66.4731 3.19675L155.558 92.2797C157.624 94.3447 158.756 97.1041 158.748 100.037C158.756 102.984 157.626 105.74 155.558 107.807L66.5561 196.803C64.4975 198.865 61.7512 200 58.8195 200C55.8894 200 53.143 198.865 51.0829 196.803L44.5284 190.25C40.2634 185.985 40.2634 179.042 44.5284 174.779L119.265 100.042Z" fill="black"/>
                    </g>
                    <defs>
                      <clipPath id="clip0_1_2">
                        <rect width="200" height="200" fill="white"/>
                      </clipPath>
                    </defs>
                  </svg>
                </div>`,
    responsive: [
      {
        breakpoint: 990,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        },
      },
    ],
  });

  // product page read more less
    $('span.yrm-button-text-1.yrm-button-text-span').click(function(){
     $(this).parents('.product-description').find('.yrm-content').css('visibility', 'visible');
     $(this).parents('.product-description').find('.yrm-content').toggleClass('activvee');
     var currentText = $(this).text();
     if (currentText == "Read more") {
      $(this).text("Read less");
    } else if (currentText == "Read less") {
      $(this).text("Read more");
    }
    });

  // value product page tabs

  $('.tab').click(function () {
    var targetTab = $(this).data('tab');
    $('.tab').removeClass('active');
    $('.tab-pane').removeClass('active');
    $(this).addClass('active');
    $('#' + targetTab).addClass('active');
  });

  // collection page read more 
  $('.full-text-collection').hide();
  $('.readmore').click(function (event) {
    event.preventDefault();
    $(this).parents('.collection-description').find('.full-text-collection').slideToggle('slow');
    $(this).text($(this).text() == 'Read less...' ? 'Read more...' : 'Read less...');
  });
  
  // See Product Components accordian product page 
  $(".acc-head").click(function () {
    $(this).next().slideToggle(500), $(this).toggleClass("active");
  });

  // product page add to cart required product 
  $('.required-item-cart').click(function(event){
    $(this).addClass("addingitem");
    var current_click = $(this);
    event.preventDefault();
    var VAR_ID = $(this).parents('.inner-main-required').find('.variantss-id').val();
    var QTY = $(this).parents('.inner-main-required').find('.required-item-quantity-qty').val();
    $.ajax({
      type: 'POST',
      url: '/cart/add.js',
      data: JSON.stringify({
        items: [
          {
            id: VAR_ID,
            quantity: QTY
          }
        ]
      }),
      contentType: 'application/json',
      dataType: 'json',
      beforeSend: function(){
        $('.required-item-cart.addingitem').attr('value','Adding Item...');
        console.log('Adding to cart...');
      },
      success: function(response){
        console.log('responseresponse',response);
        console.log('Item added to cart!', response);
        $('.inner-main-required').removeClass('sold-out');
        $(current_click).parents('.inner-main-required').find('.out-sold').hide();
        $.each(response, function (key, value) {
          if(key == 'quantity'){
            $(current_click).parents('.inner-main-required').find('.cart-count-pro').text(value+' item(s) in your cart');
            $.ajax({
              type: 'GET',
              url: '/cart.js',
              cache: false,
              dataType: 'json',
              success: function(cart) {
                console.log('cart',cart.item_count);
                $('.cart-count-bubble').html('<span aria-hidden="true">"'+cart.item_count+'"</span><span class="visually-hidden">"'+cart.item_count+'" items</span>');
              }
            });
          }
        });
      },
      complete: function () {
        console.log('Request complete.');
        $('.required-item-cart.addingitem').attr('value','Add to cart');
        $('.required-item-cart.addingitem').removeClass("addingitem");
      },
      error: function (xhr, status, error) {
        console.log('Error:', error);
        $(current_click).parents('.inner-main-required').addClass('sold-out');
        $(current_click).parents('.inner-main-required').find('.out-sold').show();
      }
    });
  });
  
  // brands page slider collection products 
  $('.brands-collection-slider').slick({
    infinite: true,
    dots: false,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow:"<div class='prev_arrow'><svg width='19' height='35' viewBox='0 0 19 35' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M17.8354 34.8365C18.1308 34.8365 18.4332 34.7197 18.6599 34.493C19.1134 34.0395 19.1134 33.2975 18.6599 32.844L3.1384 17.3225L18.4332 2.02768C18.8867 1.5742 18.8867 0.832134 18.4332 0.378651C17.9797 -0.0748329 17.2376 -0.0748329 16.7841 0.378651L0.657984 16.4979C0.2045 16.9514 0.2045 17.6935 0.657984 18.147L17.004 34.493C17.2376 34.7266 17.533 34.8365 17.8354 34.8365Z' fill='white'/></svg></div>",
    nextArrow:"<div class='next_arrow'><svg width='19' height='35' viewBox='0 0 19 35' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.48251 34.8365C1.18705 34.8365 0.884697 34.7197 0.657955 34.493C0.20447 34.0395 0.20447 33.2975 0.657955 32.844L16.1795 17.3225L0.884695 2.02768C0.431211 1.5742 0.431211 0.832134 0.884695 0.378651C1.33818 -0.0748329 2.08024 -0.0748329 2.53373 0.378651L18.6599 16.4979C19.1134 16.9514 19.1134 17.6935 18.6599 18.147L2.31386 34.493C2.08025 34.7266 1.78483 34.8365 1.48251 34.8365Z' fill='white'/></svg></div>",
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        },
      },
    ],
  });

  // homepage collection products 
  $('.collection-product-list-slider').slick({
    infinite: true,
    dots: false,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    prevArrow: "<div class='prev_arrow'><svg width='19' height='35' viewBox='0 0 19 35' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M17.8354 34.8365C18.1308 34.8365 18.4332 34.7197 18.6599 34.493C19.1134 34.0395 19.1134 33.2975 18.6599 32.844L3.1384 17.3225L18.4332 2.02768C18.8867 1.5742 18.8867 0.832134 18.4332 0.378651C17.9797 -0.0748329 17.2376 -0.0748329 16.7841 0.378651L0.657984 16.4979C0.2045 16.9514 0.2045 17.6935 0.657984 18.147L17.004 34.493C17.2376 34.7266 17.533 34.8365 17.8354 34.8365Z' fill='white'/></svg></div>",
    nextArrow: "<div class='next_arrow'><svg width='19' height='35' viewBox='0 0 19 35' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M1.48251 34.8365C1.18705 34.8365 0.884697 34.7197 0.657955 34.493C0.20447 34.0395 0.20447 33.2975 0.657955 32.844L16.1795 17.3225L0.884695 2.02768C0.431211 1.5742 0.431211 0.832134 0.884695 0.378651C1.33818 -0.0748329 2.08024 -0.0748329 2.53373 0.378651L18.6599 16.4979C19.1134 16.9514 19.1134 17.6935 18.6599 18.147L2.31386 34.493C2.08025 34.7266 1.78483 34.8365 1.48251 34.8365Z' fill='white'/></svg></div>",
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        },
      },
    ],
  });
  
});

// product page required item quantity
document.addEventListener('DOMContentLoaded', function() {
  const quantityInputs = document.querySelectorAll('.required-item-quantity-selector');

  quantityInputs.forEach(function(selector) {
    const input = selector.querySelector('input');
    const minusButton = selector.querySelector('.required-item-quantity-minus');
    const plusButton = selector.querySelector('.required-item-quantity-plus');

    minusButton.addEventListener('click', function() {
      let value = parseInt(input.value);
      if (value > 1) {
        input.value = value - 1;
      }
    });

    plusButton.addEventListener('click', function() {
      let value = parseInt(input.value);
      input.value = value + 1;
    });
  });
});
