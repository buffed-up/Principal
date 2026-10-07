import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer-vapor">
      <div className="container">
        <div className="row">

          {/* Columna 1: Info */}
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h4 className="footer-titulo">BOOSTED UP!</h4>
            <p className="footer-texto">
              Tu punto de ocio favorito.<br />
              Videojuegos, coleccionables y más.
            </p>
            <div className="mt-3">
              <p className="footer-contacto">📍 Santiago, Chile</p>
              <p className="footer-contacto">📧 contacto@boostedup.cl</p>
              <p className="footer-contacto">📞 (+56) 2 1234 5678</p>
              <p className="footer-contacto">💬 +569 1234 5678</p>
            </div>
          </div>

          {/* Columna 2: Navegación */}
          <div className="col-lg-3 col-md-6 mb-4 mb-lg-0">
            <h4 className="footer-titulo">NAVEGACIÓN</h4>
            <Link to="/" className="footer-enlace">Inicio</Link>
            <Link to="/productos" className="footer-enlace">Productos</Link>
            <Link to="/carrito" className="footer-enlace">Carrito</Link>
          </div>

          {/* Columna 3: Categorías */}
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h4 className="footer-titulo">CATEGORÍAS</h4>
            <a href="#" className="footer-enlace">Anime</a>
            <a href="#" className="footer-enlace">Videojuegos</a>
            <a href="#" className="footer-enlace">Películas</a>
          </div>

          {/* Columna 4: Redes y Newsletter */}
          <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
            <h4 className="footer-titulo">SÍGUENOS</h4>
            <div className="mb-3">
              <a href="#" className="social-icon">📘</a>
              <a href="#" className="social-icon">🐦</a>
              <a href="#" className="social-icon">📷</a>
              <a href="#" className="social-icon">🎮</a>
              <a href="#" className="social-icon">▶️</a>
              <a href="#" className="social-icon">🎵</a>
            </div>
            <p className="footer-texto" style={{ fontSize: '0.8rem' }}>
              Suscríbete a nuestro newsletter<br />
              para recibir ofertas exclusivas.
            </p>
            <div className="d-flex">
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Tu email"
                style={{
                  background: 'rgba(26,11,46,0.5)',
                  border: '1px solid var(--vw-purple)',
                  color: 'var(--vw-text)',
                  borderRadius: '4px 0 0 4px',
                  fontSize: '0.8rem'
                }}
              />
              <button
                className="btn btn-sm"
                style={{
                  background: 'var(--vw-purple)',
                  color: '#fff',
                  borderRadius: '0 4px 4px 0',
                  border: 'none',
                  padding: '0 12px'
                }}>
                ✉️
              </button>
            </div>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="footer-copy">
          &copy; 2026 BOOSTED UP! Todos los derechos reservados. |{' '}
          <a href="#">Política de Privacidad</a> |{' '}
          <a href="#">Términos de Uso</a>
        </div>
      </div>
    </footer>
  )
}

export default Footer