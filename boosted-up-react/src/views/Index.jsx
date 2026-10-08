import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getDestacados } from '../services/api'

function Index() {
  const navigate = useNavigate()
  const [destacados, setDestacados] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getDestacados()
      .then(data => setDestacados(data))
      .catch(err => setError(err.message))
      .finally(() => setCargando(false))
  }, [])

  const irColeccion = (tituloPortada) => {
    const nombre = tituloPortada.replace('Colección ', '')
    navigate(`/productos?coleccion=${encodeURIComponent(nombre)}`)
  }

  const formatearPrecio = (n) =>
    new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      maximumFractionDigits: 0
    }).format(n)

  if (cargando) return <div className="container my-4"><p>Cargando...</p></div>
  if (error) return <div className="container my-4"><p className="text-danger">Error: {error}</p></div>

  const primeras = destacados.slice(0, 3)

  return (
    <>
      {/* ===== CARRUSEL ===== */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                {primeras.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={i}
                    className={i === 0 ? 'active' : ''}
                    aria-current={i === 0 ? 'true' : undefined}
                    aria-label={`Slide ${i + 1}`}
                  ></button>
                ))}
              </div>

              <div className="carousel-inner">
                {primeras.map((c, i) => (
                  <div
                    key={c.id}
                    className={`carousel-item ${i === 0 ? 'active' : ''}`}
                    onClick={() => irColeccion(c.titulo)}
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={`/${c.img}`}
                      className="d-block w-100"
                      style={{ height: '350px', objectFit: 'cover' }}
                      alt={c.titulo}
                    />
                    <div className="carousel-caption text-start caption-steam">
                      <h3 className="titulo-juego">{c.titulo}</h3>
                      <span
                        style={{
                          fontSize: '1.6rem',
                          fontWeight: 'bold',
                          color: '#fafafa'
                        }}
                      >
                        Desde {formatearPrecio(c.precio)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== TABLA NUEVOS LANZAMIENTOS ===== */}
      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            <h2 className="titulo-seccion mt-5 mb-4">NUEVOS LANZAMIENTOS</h2>
            <div className="table-responsive">
              <table className="table tabla-vaporwave">
                <tbody>
                  {primeras.map((c, i) => (
                    <tr
                      key={c.id}
                      onClick={() => irColeccion(c.titulo)}
                      style={{ cursor: 'pointer' }}
                    >
                      <td className="ranking">{i + 1}</td>
                      <td>
                        <img src={`/${c.img}`} className="img-items" alt={c.titulo} />
                      </td>
                      <td>
                        <div className="nombre-items">{c.titulo}</div>
                      </td>
                      <td className="text-end precio-items">
                        Desde {formatearPrecio(c.precio)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Index