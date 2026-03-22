
//Swiper
import Swiper from 'swiper';
import { Navigation, Pagination, Thumbs } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

//Fancybox
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
window.Fancybox = Fancybox;// Делаем Fancybox глобально доступным
Fancybox.bind("[data-fancybox]", {
	on: {
		done: (fancybox, slide) => {
			if(document.querySelector('.popup-window')){
				document.querySelector('.popup-window').classList.remove('hide');
			}
		},
		close: (fancybox, slide) => {
			if(document.querySelector('.popup-window')){
				document.querySelector('.popup-window').classList.add('hide');
			}
		}
	}
});

//Inputmask
import Inputmask from "inputmask";

// Маска для телефона
document.addEventListener("DOMContentLoaded", function(){
	if(document.querySelector('.js-phone')){
		Inputmask('+7 999 999-99-99').mask('.js-phone');
	}
});

//Очищаем поле при нажатии на крестик
document.querySelector('.js-auth-form-close').addEventListener('click', function(e){
	e.preventDefault();
	const authPhone = e.target.closest('.js-auth-form').querySelector('.js-phone');
	authPhone.value = '';
	authPhone.blur();
});

// Переключение полей кода sms
document.addEventListener('DOMContentLoaded', function() {
	const inputs = document.querySelectorAll('.js-code-input');
	
	inputs.forEach((input, index) => {
		// При вводе символа
		input.addEventListener('input', function(e) {
		// Если поле заполнено (длина 1 символ)
		if (this.value.length === 1 && index < inputs.length - 1) {
			// Перемещаем фокус на следующее поле
			inputs[index + 1].focus();
		}
		});

		// Обработка клавиши Backspace
		input.addEventListener('keydown', function(e) {
		if (e.key === 'Backspace' && !this.value && index > 0) {
			// Если поле пустое и нажат Backspace, переходим на предыдущее поле
			inputs[index - 1].focus();
		}
		});

		// Разрешаем только цифры (опционально)
		input.addEventListener('keydown', function(e) {
		if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Delete' && e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Tab') {
			e.preventDefault();
		}
		});
	});
});

// Верхний слайдер
if(document.querySelector('.js-main-slider')){
	const topSlider = new Swiper('.js-main-slider',
	{
		modules: [Navigation],
		loop:true,
		autoplay: 5000,
		navigation: {
			nextEl: '.js-main-slider-next',
			prevEl: '.js-main-slider-prev',
		},
	});
}

//Переключение табов в меню каталога
if(document.querySelector('.js-catalog-menu-sect-item')){
	// Находим все элементы меню (вкладки)
	const menuItems = document.querySelectorAll('.js-catalog-menu-sect-item');
	// Находим все секции попапа
	const popupSections = document.querySelectorAll('.js-catalog-menu-popup-sect');

	// Вешаем обработчик клика на каждый пункт меню
	menuItems.forEach(item => {
		item.addEventListener('click', function() {
			// Удаляем класс 'active' у всех пунктов меню
			menuItems.forEach(menuItem => {
				menuItem.classList.remove('active');
			});

			// Добавляем класс 'active' текущему пункту меню
			this.classList.add('active');

			// Получаем значение data-id текущего пункта меню
			const popupTargetId = this.dataset.id; // получится "catalog-menu-sect-0"

			// Удаляем класс 'active' у всех секций попапа
			popupSections.forEach(section => {
				section.classList.remove('active');
			});

			// Находим нужную секцию попапа и добавляем ей класс 'active'
			const targetSection = document.querySelector(`.js-catalog-menu-popup-sect[data-id="${popupTargetId}"]`);
			if (targetSection) {
				targetSection.classList.add('active');
			}
		});
	});
}

//Открыть мобильный сайдбар
document.querySelector('.js-open-mobile-sidebar').addEventListener('click', function(e){
	document.querySelector('.js-mobile-sidebar').classList.add('open');
	document.querySelector('.js-body').classList.add('no-scroll');
});

//Закрыть мобильный сайдбар
document.querySelector('.js-close-mobile-sidebar').addEventListener('click', function(e){
	document.querySelector('.js-mobile-sidebar').classList.remove('open');
	document.querySelector('.js-body').classList.remove('no-scroll');
});


// Открыть.Закрыть многостросчный текст

document.addEventListener('DOMContentLoaded', function() {
	if(document.querySelector('.js-more-text-btn')){
		const textMore = document.querySelectorAll('.js-more-text-content');

		textMore.forEach(content => {
			const maxLines = content.getAttribute('data-max-lines');
			const container = content.closest('.js-more-text');
			const btn = container.querySelector('.js-more-text-btn');
			const btnText = container.querySelector('.js-more-text-btn-text');
			console.log('btn = ', btn);

			let countLines = analyzeChildElements(content);

			content.setAttribute('data-lines', countLines + 5);

			if(countLines > maxLines){
				btn.classList.add('visible');
				content.style.webkitLineClamp = maxLines;
				content.style.lineClamp = maxLines;
				container.classList.add('truncated');
			}


			btn.addEventListener('click', function(){
				let secondText = this.getAttribute('data-text') || 'Свернуть';
				this.setAttribute('data-text', btnText.textContent);
				btnText.textContent = secondText;

				if(container.classList.contains('truncated')){
					content.style.webkitLineClamp = content.getAttribute('data-lines');
					content.style.lineClamp = content.getAttribute('data-lines');
					container.classList.remove('truncated');
				}else{
					content.style.lineClamp = maxLines;
					content.style.webkitLineClamp = maxLines;
					content.style.lineClamp = maxLines;
					container.classList.add('truncated');
				}
			})
		});
	}
});

function analyzeChildElements(container) {
	// Получаем всех непосредственных детей контейнера
	const childElements = container.children;
	let sumLines = 0;

	// Анализируем каждый элемент
	for (let i = 0; i < childElements.length; i++) {
		const child = childElements[i];

		// Получаем высоту элемента
		const height = child.offsetHeight;
		
		// Получаем стили элемента
		const computedStyle = window.getComputedStyle(child);
		const lineHeight = parseInt(computedStyle.lineHeight) || parseInt(computedStyle.fontSize) * 1.2;

		// Рассчитываем количество строк
		const estimatedLines = Math.round(height / lineHeight);
		sumLines = sumLines + estimatedLines;
	}

	return sumLines;
}
