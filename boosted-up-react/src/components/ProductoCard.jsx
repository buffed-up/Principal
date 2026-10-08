import { useNavigate } from 'react-router-dom'
import { useCarrito } from '../context/CarritoContext'

function ProductoCard({ producto }) {
  const navigate = useNavigate()
  const { agregarAlCarrito } = useCarrito()

  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(producto.precio)

  const handleClick = () => {
    navigate(`/producto/${producto.id}`)
  }

  const handleBoton = (e) => {
    e.stopPropagation()
    agregarAlCarrito(producto.id, producto.titulo, producto.precio, producto.img)
    navigate(`/producto/${producto.id}`)
  }

  return (
    <div className="col-6 col-md-4 col-lg-3 mb-4">
      <div
        className="card vapor-card h-100 text-center"
        style={{ cursor: 'pointer' }}
        onClick={handleClick}
      >
        <img
          src={producto.img.startsWith('http') ? producto.img : `/${producto.img}`}
          className="card-img-top vapor-img"
          alt={producto.titulo}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title vapor-title">{producto.titulo}</h5>
          <p className="card-text vapor-price mt-auto">{precioFormateado}</p>
          <button className="btn btn-vapor mt-2" onClick={handleBoton}>
            Ver Detalle
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductoCard