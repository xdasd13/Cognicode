import { register } from 'swiper/element/bundle';
import 'swiper/swiper-bundle.css';

register();

function initClientsCarousel() {
	const swiperEl = document.querySelector<HTMLElement>('swiper-container#clients-swiper');
	if (!swiperEl || swiperEl.dataset.initialized === 'true') {
		return;
	}

	Object.assign(swiperEl, {
		loop: true,
		speed: 1000,
		spaceBetween: 32,
		slidesPerView: 'auto',
		centeredSlides: false,
		allowTouchMove: true,
		freeMode: true,
		loopAdditionalSlides: 8,
		autoplay: {
			delay: 0,
			disableOnInteraction: false,
			pauseOnMouseEnter: true,
		},
		breakpoints: {
			320: { spaceBetween: 16 },
			640: { spaceBetween: 20 },
			1024: { spaceBetween: 32 },
		},
	});

	swiperEl.dataset.initialized = 'true';
	(swiperEl as any).initialize?.();
}

function initRevealAnimations() {
	const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');
	if (!elements.length) {
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add('is-visible');
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.1,
			rootMargin: '0px 0px -10% 0px',
		}
	);

	elements.forEach((element) => {
		observer.observe(element);
	});
}

function initContactForm() {
	const form = document.getElementById('contact-form') as HTMLFormElement | null;
	const messageBox = document.getElementById('form-message');

	if (!form) {
		return;
	}

	const setMessage = (text: string, type: 'success' | 'error') => {
		if (!messageBox) return;
		messageBox.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700');
		if (type === 'success') {
			messageBox.classList.add('bg-green-100', 'text-green-700');
		} else {
			messageBox.classList.add('bg-red-100', 'text-red-700');
		}
		messageBox.textContent = text;
	};

	form.addEventListener('submit', async (event) => {
		event.preventDefault();

		const submitButton = form.querySelector('button[type="submit"]') as HTMLButtonElement | null;
		const originalLabel = submitButton?.innerHTML;

		if (submitButton) {
			submitButton.disabled = true;
			submitButton.innerHTML = '<span>Enviando...</span>';
		}

		try {
			const response = await fetch('https://api.web3forms.com/submit', {
				method: 'POST',
				body: new FormData(form),
			});
			const data = await response.json();

			if (data.success) {
				setMessage('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.', 'success');
				form.reset();
			} else {
				throw new Error(data.message || 'Error al enviar el formulario');
			}
		} catch (error) {
			setMessage('Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.', 'error');
		} finally {
			if (submitButton && typeof originalLabel === 'string') {
				submitButton.disabled = false;
				submitButton.innerHTML = originalLabel;
			}
			if (messageBox) {
				setTimeout(() => {
					messageBox.classList.add('hidden');
				}, 5000);
			}
		}
	});
}

function hydrateHomePage() {
	initRevealAnimations();
	initClientsCarousel();
	initContactForm();
}

if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', hydrateHomePage, { once: true });
} else {
	hydrateHomePage();
}