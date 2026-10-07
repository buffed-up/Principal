import React from 'react'
import { useNavigate } from 'react-router-dom'

function Index() {
  const navigate = useNavigate()

  const irColeccion = (id) => {
    navigate(`/productos?coleccion=${id}&desde=index`)
  }

  return (
    <>
      {/* ===== CARRUSEL ===== */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              </div>

              <div className="carousel-inner">
                {/* SLIDE 1: Warhammer */}
                <div className="carousel-item active" onClick={() => irColeccion(8)} style={{ cursor: 'pointer' }}>
                  <img src="/img/ultra.png" className="d-block w-100" style={{ height: '350px', objectFit: 'cover' }} alt="Warhammer 40k" />
                  <div className="carousel-caption text-start caption-steam">
                    <h3 className="titulo-juego">Colección Warhammer 40k: Ultramarines</h3>
                    <p className="subtitulo-juego">Ya disponible en preventa</p>
                    <span style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#fafafa' }}>$150.990 - $400.990</span>
                  </div>
                </div>

                {/* SLIDE 2: Destiny */}
                <div className="carousel-item" onClick={() => irColeccion(7)} style={{ cursor: 'pointer' }}>
                  <img src="/img/thorn.png" className="d-block w-100" style={{ height: '350px', objectFit: 'cover' }} alt="Destiny" />
                  <div className="carousel-caption text-start caption-steam">
                    <h3 className="titulo-juego">Destiny Collection</h3>
                    <p className="subtitulo-juego">Recompensas dentro del juego incluidas</p>
                    <span style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#fafafa' }}>$90.990 - $380.990</span>
                  </div>
                </div>

                {/* SLIDE 3: Jujutsu Kaisen */}
                <div className="carousel-item" onClick={() => irColeccion(4)} style={{ cursor: 'pointer' }}>
                  <img src="/img/kaisen.jpg" className="d-block w-100" style={{ height: '350px', objectFit: 'cover' }} alt="Jujutsu Kaisen" />
                  <div className="carousel-caption text-start caption-steam">
                    <h3 className="titulo-juego">Colección Jujutsu Kaisen</h3>
                    <p className="subtitulo-juego">Anime, Ciencia ficción</p>
                    <span style={{ fontSize: '1.6rem', fontWeight: 'bold', color: '#fafafa' }}>$20.990 - $25.990</span>
                  </div>
                </div>
              </div>

              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Anterior</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Siguiente</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mt-5 mb-5">
        <div className="row justify-content-center">
          <div className="col-lg-10 col-md-12">
            <h2 className="titulo-seccion mt-5 mb-4">NUEVOS LANZAMIENTOS</h2>
            <div className="table-responsive">
              <table className="table tabla-vaporwave">
                <tbody>
                  <tr onClick={() => irColeccion(7)} style={{ cursor: 'pointer' }}>
                    <td className="ranking">1</td>
                    <td><img src="/img/destiny.png" className="img-items" alt="destiny" /></td>
                    <td>
                      <div className="nombre-items">Colección Destiny</div>
                      <div className="genero-items">videojuegos, shooter</div>
                    </td>
                    <td className="text-end precio-items">$90.990 - $380.990</td>
                  </tr>
                  <tr onClick={() => irColeccion(4)} style={{ cursor: 'pointer' }}>
                    <td className="ranking">2</td>
                    <td><img src="/img/kaisen.jpg" className="img-items" alt="kaisen" /></td>
                    <td>
                      <div className="nombre-items">Colección Jujutsu Kaisen</div>
                      <div className="genero-items">Anime, Ciencia ficción</div>
                    </td>
                    <td className="text-end precio-items">$20.990 - $25.990</td>
                  </tr>
                  <tr onClick={() => irColeccion(6)} style={{ cursor: 'pointer' }}>
                    <td className="ranking">3</td>
                    <td><img src="/img/tf2.jpg" className="img-items" alt="tf2" /></td>
                    <td>
                      <div className="nombre-items">Colección Team Fortress 2</div>
                      <div className="genero-items">videojuegos, shooter</div>
                    </td>
                    <td className="text-end precio-items">$28.990 - $30.990</td>
                  </tr>
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