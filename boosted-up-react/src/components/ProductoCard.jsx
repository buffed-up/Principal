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

  const irAColeccion = () => {
    navigate(`/productos?coleccion=${encodeURIComponent(producto.titulo.replace('Colección ', ''))}`)
  }

  const irADetalle = () => {
    navigate(`/producto/${producto.id}`)
  }

  // Clic en cualquier parte de la tarjeta
  const handleClick = () => {
    if (producto.es_portada) irAColeccion()
    else irADetalle()
  }

  // Clic en el botón principal (Ver Detalle / Ver Colección)
  const handleBotonPrincipal = (e) => {
    e.stopPropagation()
    if (producto.es_portada) irAColeccion()
    else irADetalle()
  }

  // Clic en el botón de agregar al carrito
  const handleBotonCarrito = (e) => {
    e.stopPropagation()
    agregarAlCarrito(producto.id, producto.titulo, producto.precio, producto.img)
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
          <p className="card-text vapor-price mt-auto">{precioFormateado}</p>

          <button className="btn btn-vapor mt-2" onClick={handleBotonPrincipal}>
            {producto.es_portada ? 'Ver Colección' : 'Ver Detalle'}
          </button>

          {!producto.es_portada && (
            <button
              className="btn btn-success mt-2"
              onClick={handleBotonCarrito}
            >
              Agregar al carrito
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductoCard