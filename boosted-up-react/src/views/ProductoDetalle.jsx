import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProducto } from '../services/api'
import { useCarrito } from '../context/CarritoContext'

function ProductoDetalle() {
  const { id } = useParams()
  const { agregarAlCarrito } = useCarrito()
  const [producto, setProducto] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setCargando(true)
    setError(null)
    getProducto(id)
      .then(data => setProducto(data))
      .catch(err => setError(err.message))
      .finally(() => setCargando(false))
  }, [id])

  if (cargando) return <div className="container my-4"><p>Cargando...</p></div>
  if (error) return <div className="container my-4"><p className="text-danger">Error: {error}</p></div>
  if (!producto) return <div className="container my-4"><p>Producto no encontrado.</p></div>

  const precioFormateado = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  }).format(producto.precio)

  const agregar = () => {
    agregarAlCarrito(producto.id, producto.titulo, producto.precio, producto.img)
  }

  return (
    <div className="container my-4">
      <Link to="/productos" className="btn btn-secondary mb-3">← Volver</Link>
      <div className="row">
        <div className="col-md-6">
          <img
            src={`/${producto.img}`}
            alt={producto.titulo}
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h1>{producto.titulo}</h1>
          {producto.descripcion && (
            <p className="text-muted">{producto.descripcion}</p>
          )}
          <p className="fs-4 fw-bold">{precioFormateado}</p>
          {!producto.es_portada && (
            <button className="btn btn-success" onClick={agregar}>
              Agregar al carrito
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductoDetalle