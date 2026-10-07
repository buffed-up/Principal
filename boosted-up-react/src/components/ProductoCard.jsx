import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'
import { limpiarPrecio } from '../data/Productos'
import React from 'react'

function ProductoCard({ producto }) {
  const navigate = useNavigate()
  const { agregarAlCarrito } = useCarrito()

  // Se ejecuta al hacer clic en cualquier parte de la tarjeta
  const handleClick = () => {
    if (producto.esColeccion) {
      navigate(`/productos?coleccion=${producto.id}`)
    } else {
      navigate(`/producto/${producto.id}`)
    }
  }

  // Se ejecuta al hacer clic en el botón (evita que se ejecute el clic de la tarjeta)
  const handleBoton = (e) => {
    e.stopPropagation()

    if (producto.esColeccion) {
      navigate(`/productos?coleccion=${producto.id}`)
    } else {
      agregarAlCarrito(producto.id, producto.titulo, limpiarPrecio(producto.precio), producto.img)
      navigate(`/producto/${producto.id}`)
    }
  }

  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div
        className="card vapor-card h-100 text-center"
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      >
        <img
          src={`/${producto.img}`}
          className="card-img-top vapor-img"
          alt={producto.titulo}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title vapor-title">{producto.titulo}</h5>
          <p className="card-text vapor-price mt-auto">{producto.precio}</p>
          <button className="btn btn-vapor mt-2" onClick={handleBoton}>
            {producto.esColeccion ? 'Ver Colección' : 'Ver Detalle'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductoCard