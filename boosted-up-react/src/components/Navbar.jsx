import { Link, useLocation } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

function Navbar() {
  const { totalProductos } = useCarrito()
  const location = useLocation()

  const activo = (path) => location.pathname === path ? 'nav-link active' : 'nav-link'

  return (
    <nav className="navbar navbar-expand-lg vapor-nav" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src="/img/logo.png" alt="Logo" height="64" width="64" />
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Navegación móvil">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={activo('/')} to="/">Menú Principal</Link>
            </li>
            <li className="nav-item">
              <Link className={activo('/productos')} to="/productos">Productos</Link>
            </li>
          </ul>

          
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link position-relative" to="/carrito" style={{ color: 'var(--vw-cyan)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
                  style={{
                    background: 'var(--vw-pink)',
                    color: 'var(--vw-bg)',
                    fontSize: '0.6rem',
                    padding: '4px 8px',
                    border: '1px solid var(--vw-cyan)',
                    boxShadow: '0 0 10px var(--vw-pink)'
                  }}>
                  {totalProductos}
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar