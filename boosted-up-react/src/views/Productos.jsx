import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { getProductos, getProductosPorColeccion } from '../services/api'
import ProductoCard from '../components/ProductoCard'

function Productos() {
  const [searchParams] = useSearchParams()
  const coleccion = searchParams.get('coleccion')

  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setCargando(true)
    setError(null)
    setProductos([])

    const promesa = coleccion
      ? getProductosPorColeccion(coleccion)
      : getProductos()

    promesa
      .then(data => setProductos(data))
      .catch(err => setError(err.message))
      .finally(() => setCargando(false))
  }, [coleccion])

  if (cargando) return <div className="container my-4"><p>Cargando...</p></div>
  if (error) return <div className="container my-4"><p className="text-danger">Error: {error}</p></div>

  return (
    <div className="container my-4">
      {coleccion && (
        <Link to="/productos" className="btn btn-secondary mb-3">← Ver todos los productos</Link>
      )}

      <h1 className="mb-4">
        {coleccion ? `Colección: ${coleccion}` : 'Productos'}
      </h1>

      {productos.length === 0 ? (
        <p>No hay productos para mostrar.</p>
      ) : (
        <div className="row">
          {productos.map(p => (
            <ProductoCard key={p.id} producto={p} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Productos