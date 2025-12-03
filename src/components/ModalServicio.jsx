import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import MicroModal from 'micromodal';
import './ModalServicio.css';

export const ModalServicio = ({ servicio }) => {
	const modalId = `modal-${servicio.id}`;
	const [portalNode, setPortalNode] = useState(null);

	useEffect(() => {
		const node = document.createElement('div');
		node.setAttribute('data-modal-servicio-root', '');
		document.body.appendChild(node);
		setPortalNode(node);

		MicroModal.init({
			onClose: () => {
				document.body.style.overflow = 'auto';
			},
			onShow: () => {
				document.body.style.overflow = 'hidden';
			}
		});

		return () => {
			document.body.removeChild(node);
		};
	}, []);

	const openModal = () => {
		if (!portalNode) return;
		MicroModal.show(modalId);
	};

	const closeModal = () => {
		MicroModal.close(modalId);
	};

	const obtenerDetalles = (titulo) => {
		const detalles = {
			'Desarrollo de E-commerce': {
				caracteristicas: [
					'Carrito de compras avanzado',
					'Pasarela de pagos integrada',
					'Gestión completa de inventario',
					'Sincronización con sistemas POS',
					'Reportes de ventas en tiempo real',
					'Seguridad SSL/TLS',
					'Responsive design',
					'SEO optimizado'
				],
				proceso: [
					'Análisis de requisitos y maquetación',
					'Diseño de interfaz y UX',
					'Desarrollo del backend y frontend',
					'Integración de pagos',
					'Testing y QA',
					'Deployment y capacitación'
				],
				plazo: '6-12 semanas',
				tecnologias: 'Node.js, React, MongoDB, Stripe'
			},
			'Desarrollo de Página Web': {
				caracteristicas: [
					'Diseño responsivo y moderno',
					'Optimización SEO técnico',
					'Velocidad ultra rápida',
					'Contacto y formularios',
					'Integración de redes sociales',
					'Blog o área de noticias',
					'Google Analytics integrado',
					'Certificado SSL'
				],
				proceso: [
					'Planificación y estrategia',
					'Diseño de wireframes',
					'Desarrollo del sitio',
					'Optimización SEO',
					'Testing en navegadores',
					'Lanzamiento y monitoreo'
				],
				plazo: '4-8 semanas',
				tecnologias: 'HTML5, CSS3, JavaScript, Astro'
			},
			'Desarrollo de App Web': {
				caracteristicas: [
					'Interfaz interactiva y fluida',
					'Funcionalidades avanzadas',
					'Compatible con todos los navegadores',
					'Offline capabilities',
					'Sincronización en tiempo real',
					'Notificaciones push',
					'Autenticación segura',
					'API RESTful'
				],
				proceso: [
					'Especificación de requisitos',
					'Diseño de arquitectura',
					'Desarrollo frontend con React/Vue',
					'Desarrollo backend',
					'Integración de APIs',
					'Testing y debugging',
					'Deploy y mantenimiento'
				],
				plazo: '8-14 semanas',
				tecnologias: 'React, Node.js, MongoDB, Firebase'
			},
			'Gestor de Inventarios': {
				caracteristicas: [
					'Dashboard intuitivo',
					'Código de barras y SKU',
					'Alertas automáticas de stock bajo',
					'Historial de movimientos',
					'Reportes personalizables',
					'Acceso multi-usuario',
					'Exportación de datos',
					'Respaldo automático'
				],
				proceso: [
					'Análisis de flujos de inventario',
					'Diseño de base de datos',
					'Desarrollo del sistema',
					'Pruebas de carga',
					'Importación de datos históricos',
					'Capacitación de usuarios',
					'Soporte post-lanzamiento'
				],
				plazo: '4-10 semanas',
				tecnologias: 'Node.js, React, PostgreSQL'
			}
		};

		return detalles[titulo] || {};
	};

	const detalles = obtenerDetalles(servicio.titulo);

	return (
		<>
			<button className="btn btn-info" onClick={openModal}>
				Más información
			</button>

			{portalNode &&
				createPortal(
					<div className="modal micromodal-slide" id={modalId} aria-hidden="true">
						<div className="modal__overlay" onClick={closeModal} data-micromodal-close>
							<div className="modal__container" onClick={(e) => e.stopPropagation()}>
								<header className="modal__header">
									<h2 className="modal__title">{servicio.titulo}</h2>
									<button
										className="modal__close"
										aria-label="Close modal"
										onClick={closeModal}
										data-micromodal-close
									>
										✕
									</button>
								</header>

								<main className="modal__content">
									<div className="modal__section">
										<h3>Características Principales</h3>
										<ul className="features-list">
											{detalles.caracteristicas?.map((item, idx) => (
												<li key={idx}>
													<span className="feature-icon">✓</span>
													{item}
												</li>
											))}
										</ul>
									</div>

									<div className="modal__section">
										<h3>Nuestro Proceso</h3>
										<ol className="process-list">
											{detalles.proceso?.map((item, idx) => (
												<li key={idx}>
													<span className="process-number">{idx + 1}</span>
													{item}
												</li>
											))}
										</ol>
									</div>

									<div className="modal__info-grid">
										<div className="info-box">
											<strong>Plazo Estimado:</strong>
											<p>{detalles.plazo}</p>
										</div>
										<div className="info-box">
											<strong>Tecnologías:</strong>
											<p>{detalles.tecnologias}</p>
										</div>
									</div>

									<div className="modal__cta">
										<p>¿Interesado en este servicio?</p>
										<a href="/Contacto" className="btn-contact">
											Contáctanos Hoy
										</a>
									</div>
								</main>
							</div>
						</div>
					</div>,
					portalNode
				)}
		</>
	);
};
