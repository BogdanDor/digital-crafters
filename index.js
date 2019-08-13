document.onreadystatechange = function() {
	switch (document.readyState) {
		case 'complete':
		  onComplete();
		  break;
	}
}

function onComplete() {
	menu();
	const sliderItems = document.getElementsByClassName('slider');
	for (let i=0; i<sliderItems.length; i++) {
		slider(sliderItems[i]);
	}
}

function menu() {
	const page = document.getElementsByClassName('page')[0];
	const header = document.getElementsByClassName('header')[0];
	const menu = document.getElementsByClassName('menu')[0];
	const burger = document.getElementsByClassName('burger-icon')[0];
	let isActive = false;
	burger.addEventListener('click', function() {
		if (isActive) {
			close();
		} else {
			open();
		}
	});
	const links = menu.getElementsByClassName('menu__link');
	for (let i=0; i<links.length; i++) {
		links[i].addEventListener('click', close);
	}
	
	function open() {
		page.classList.add('page--open-menu');
		burger.classList.add('burger-icon--active');
		menu.classList.add('menu--open');
		isActive = true;
	}
	function close() {
		page.classList.remove('page--open-menu');
		burger.classList.remove('burger-icon--active');
		menu.classList.remove('menu--open');
		isActive = false;	
	}
}

function slider(sliderItem) {
	const items = sliderItem.getElementsByClassName('slider__item');
	const ellipses = sliderItem.getElementsByClassName('slider__ellipse');
	let current = 0;

	update();
	
	const prevButton = sliderItem.getElementsByClassName('slider__prev')[0];
	const nextButton = sliderItem.getElementsByClassName('slider__next')[0];
	prevButton.addEventListener('click', () => setItem(current-1));
	nextButton.addEventListener('click', () => setItem(current+1));
	window.addEventListener('resize', update);
	for (let i=0; i<ellipses.length; i++) {
		ellipses[i].addEventListener('click', () => setItem(i));
	}
	setTimeout(function() {
		for (let i=0; i<items.length; i++) {
			items[i].style['transition'] = 'all .5s linear';
		}	
	}, 0);

	function setItem(newValue) {
		if (newValue < 0 || newValue >= items.length) {
			return;
		}
		items[current].classList.remove('slider__item--active');
		ellipses[current].classList.remove('slider__ellipse--active');
		items[newValue].classList.add('slider__item--active');
		ellipses[newValue].classList.add('slider__ellipse--active');
		current = newValue;
		update();
	}

	function update() {
		/*const elementWidth = items[current].getBoundingClientRect().width;
		const sliderWidth = sliderItem.getBoundingClientRect().width;
		const marginLeft = parseInt(window.getComputedStyle(items[current], null)['margin-left'], 10);	
	  const left = (sliderWidth - elementWidth) / 2 - current*(elementWidth+marginLeft);
		items[0].style['transform'] = 'translateX(' + left + '%)';*/
		const marginLeft = parseInt(window.getComputedStyle(items[current], null)['margin-left'], 10);
		const left = -50 - (current * 100);
		const ml = marginLeft*current;
		for (let i=0; i<items.length; i++) {
			items[i].style['transform'] = 'translateX(calc(' + left + '% - ' + ml + 'px))';
		}
	}
}

