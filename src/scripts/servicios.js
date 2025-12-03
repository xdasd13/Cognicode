/**
 * Script interactivo para manejo de servicios
 * Funcionalidades: modal de más información, consulta
 */

// Configuración de acciones de botones
document.addEventListener('DOMContentLoaded', () => {
	// Botones "Más información"
	const botonesInfo = document.querySelectorAll('.btn-secundario');
	botonesInfo.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			mostrarMasInformacion(btn);
		});
	});

	// Botones "Consultar"
	const botonesConsulta = document.querySelectorAll('.btn-primario');
	botonesConsulta.forEach((btn) => {
		btn.addEventListener('click', (e) => {
			e.preventDefault();
			mostrarConsulta(btn);
		});
	});
});

/**
 * Muestra más información del servicio
 * @param {HTMLElement} elemento - Botón que disparó el evento
 */
function mostrarMasInformacion(elemento) {
	const tarjeta = elemento.closest('.tarjeta-servicio');
	const titulo = tarjeta.querySelector('.titulo').textContent;

	// Simulación de modal o redirección
	console.log(`Más información solicitada para: ${titulo}`);

	// Aquí se puede implementar:
	// - Modal con más detalles
	// - Redirección a página de detalles
	// - Scroll a sección de contacto

	// Ejemplo: cambiar color del botón temporalmente
	elemento.style.background = 'rgba(6, 182, 212, 0.1)';
	setTimeout(() => {
		elemento.style.background = '';
	}, 300);

	// Alert temporal (reemplazar con modal en producción)
	mostrarNotificacion(`Solicitud de información: ${titulo}`);
}

/**
 * Muestra formulario de consulta para el servicio
 * @param {HTMLElement} elemento - Botón que disparó el evento
 */
function mostrarConsulta(elemento) {
	const tarjeta = elemento.closest('.tarjeta-servicio');
	const titulo = tarjeta.querySelector('.titulo').textContent;

	console.log(`Consulta iniciada para: ${titulo}`);

	// Redirigir a página de contacto con parámetro del servicio
	const urlContacto = new URL('/Contacto', window.location.origin);
	urlContacto.searchParams.append('servicio', titulo);
	// window.location.href = urlContacto.toString();

	// Alternativa: mostrar notificación
	mostrarNotificacion(`Consulta iniciada para: ${titulo}. Redirigiendo a contacto...`);
}

/**
 * Muestra una notificación temporal
 * @param {string} mensaje - Mensaje a mostrar
 */
function mostrarNotificacion(mensaje) {
	console.log(`📬 ${mensaje}`);
	// Aquí se puede implementar un sistema de toast/notificaciones
	// Ejemplo básico con alert:
	// alert(mensaje);
}

/**
 * Anima elementos cuando entran en vista
 */
function observarElementos() {
	const opciones = {
		threshold: 0.1,
		rootMargin: '0px 0px -100px 0px'
	};

	const observador = new IntersectionObserver((entradas) => {
		entradas.forEach((entrada) => {
			if (entrada.isIntersecting) {
				entrada.target.classList.add('animado');
				observador.unobserve(entrada.target);
			}
		});
	}, opciones);

	const tarjetas = document.querySelectorAll('.tarjeta-servicio');
	tarjetas.forEach((tarjeta) => {
		observador.observe(tarjeta);
	});
}

// Inicializar observador de elementos
document.addEventListener('DOMContentLoaded', observarElementos);
