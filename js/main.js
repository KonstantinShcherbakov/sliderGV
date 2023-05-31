let slider_sections = document.querySelectorAll('.slider__section');
let slider_images = document.querySelectorAll('.slider__img');
let slider_headers = document.querySelectorAll('.slider__section-header-wrp');
let slider_dots = document.querySelectorAll('.slider__controls-dot');
let slider_mobileImagesWrap = document.querySelector('.slider__mobile-img-wrp');
let slider_ImagesWrap = document.querySelector('.slider__img-wrp');
let slider_Wrap = document.querySelector('.slider__wrp');
let slider_sectionsWrap = document.querySelector('.slider__sections');
let next_btn = document.querySelector('.next-btn');
let prev_btn = document.querySelector('.prev-btn');
let arrSlid = [slider_sections, slider_images, slider_dots];
let currentSliderIndex = 0;
let x1 = null;
let x2 = null;

function changeSlide() {
	let slideWidth = slider_ImagesWrap.offsetWidth;
	slider_mobileImagesWrap.style.transform = 'translateX(-'+slideWidth*currentSliderIndex+'px)';
	slider_sections[currentSliderIndex].classList.add('active');
	slider_dots[currentSliderIndex].classList.add('active');
}

function delActive(paramArr, index) {
	paramArr.forEach(el => {
		el[index].classList.remove('active');
	})
}

changeSlide();

changeSectionsWrapHeight();

function changeSectionsWrapHeight() {
	let maxSectionHeight = slider_sections[0].offsetHeight;
	slider_sections.forEach((el, index) => {
		console.log(el.offsetHeight);
		if(el.offsetHeight > maxSectionHeight) {
			maxSectionHeight = el.offsetHeight;
		}
	})
	slider_sectionsWrap.style.height = maxSectionHeight + 'px';
}

window.addEventListener('resize', () => {
	if(window.screen.width<=860) {
		changeSectionsWrapHeight();
	}
	changeSlide();
});

slider_headers.forEach((el, index) => {
	el.addEventListener('click', () => {
		if(index===currentSliderIndex||window.screen.width<=860) {
			return;
		}
		delActive(arrSlid, currentSliderIndex);
		currentSliderIndex = index;
		changeSlide();
	});
});

slider_dots.forEach((el, index) => {
	el.addEventListener('click', () => {
		delActive(arrSlid, currentSliderIndex);
		currentSliderIndex = index;
		changeSlide();
	});
});

slider_Wrap.addEventListener('touchstart', (event) => {
	x1 = event.touches[0].clientX;
})

slider_Wrap.addEventListener('touchmove', (event) => {
	x2 = event.touches[0].clientX;
})

slider_Wrap.addEventListener('touchend', () => {
	let diff = x1-x2;
	if(diff >= 100 && x2) {
		delActive(arrSlid, currentSliderIndex);
		currentSliderIndex++;
		if(currentSliderIndex >= slider_images.length) {
			currentSliderIndex = 0;
		}
		changeSlide();
	} else if (diff <= -100 && x2) {
		delActive(arrSlid, currentSliderIndex);
		currentSliderIndex--;
		if(currentSliderIndex < 0) {
			currentSliderIndex = slider_images.length - 1;
		}
		changeSlide();
	}
	x1 = null;
	x2 = null;
})

prev_btn.addEventListener('click', () => {
	delActive(arrSlid, currentSliderIndex);
	currentSliderIndex--;
	if(currentSliderIndex < 0) {
		currentSliderIndex = slider_images.length - 1;
	}
	changeSlide();
})

next_btn.addEventListener('click', () => {
	delActive(arrSlid, currentSliderIndex);
		currentSliderIndex++;
		if(currentSliderIndex >= slider_images.length) {
			currentSliderIndex = 0;
		}
		changeSlide();
})