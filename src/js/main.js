
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