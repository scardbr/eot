$(".g-stories-wrapper").each(function (index) {
	const swiper = new Swiper($(this).find(".swiper")[0], {
    navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
		spaceBetween: 20,
    speed: 800,
      breakpoints: {
    // when window width is >= 320px
    768: {
      slidesPerView: 1.5,
      spaceBetween: 40
    },
   },
	});
});
