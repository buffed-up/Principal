import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { productos, articulosDeColecciones } from '../data/Productos'
import ProductoCard from '../components/ProductoCard'

function Productos() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const [categoria, setCategoria] = useState('todos')
  const [coleccionAbierta, setColeccionAbierta] = useState(null)

  useEffect(() => {
    const idCol = parseInt(searchParams.get('coleccion'))
    if (idCol) {
      setColeccionAbierta(idCol)
    } else {
      setColeccionAbierta(null)
    }
  }, [searchParams])


  const productosFiltrados = categoria === 'todos'
    ? productos
    : productos.filter(p => p.categoria === categoria)

  const nombreColeccion = coleccionAbierta
    ? productos.find(p => p.id === coleccionAbierta)?.titulo
    : 'PRODUCTOS'

  if (coleccionAbierta) {
    const articulos = articulosDeColecciones[coleccionAbierta] || []

    return (
      <div className="container mt-5">
        <div className="text-center mb-5">
          <button
            className="btn btn-vapor mb-3"
            onClick={() => {
              setColeccionAbierta(null)
              navigate('/productos')
            }}
          >
            ← Volver
          </button>
          <h2 className="titulo-caja-vapor">{nombreColeccion}</h2>
        </div>

        <div className="row justify-content-center g-4">
          {articulos.map(art => (
            <div key={art.id} className="col-6 col-md-4 col-lg-3 mb-4">
              <div
                className="card vapor-card h-100 text-center"
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/producto/${art.id}`)}
              >
                <img src={`/${art.img}`} className="card-img-top vapor-img" alt={art.titulo} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title vapor-title">{art.titulo}</h5>
                  <p className="card-text vapor-price mt-auto">{art.precio}</p>
                  <button className="btn btn-vapor mt-2">Ver Detalle</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }


  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h2 className="titulo-caja-vapor">PRODUCTOS</h2>
      </div>

      {/* Pestañas de filtro */}
      <div className="d-flex justify-content-center mb-5">
        <button
          className={`btn btn-vapor-tab ${categoria === 'todos' ? 'active' : ''}`}
          onClick={() => setCategoria('todos')}
        >
          Todos
        </button>
        <button
          className={`btn btn-vapor-tab ${categoria === 'cosplay' ? 'active' : ''}`}
          onClick={() => setCategoria('cosplay')}
        >
          Cosplay
        </button>
        <button
          className={`btn btn-vapor-tab ${categoria === 'coleccionables' ? 'active' : ''}`}
          onClick={() => setCategoria('coleccionables')}
        >
          Coleccionables
        </button>
      </div>

      {/* Cuadrícula de productos */}
      <div className="row justify-content-center g-4">
        {productosFiltrados.map(prod => (
          <ProductoCard key={prod.id} producto={prod} />
        ))}
      </div>
    </div>
  )
}

export default Productos