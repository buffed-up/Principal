import { useEffect, useState } from 'react'
import { getProductos } from '../services/api'
import ProductoCard from '../components/ProductoCard'

function Productos() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    console.log('[Productos] llamando a getProductos')
    getProductos()
      .then(data => {
        console.log('[Productos] recibidos:', data)
        setProductos(data)
      })
      .catch(err => {
        console.error('[Productos] error:', err)
        setError(err.message)
      })
      .finally(() => setCargando(false))
  }, [])

  if (cargando) return <div className="container my-4"><p>Cargando productos...</p></div>
  if (error) return <div className="container my-4"><p className="text-danger">Error: {error}</p></div>
  if (productos.length === 0) return <div className="container my-4"><p>No hay productos.</p></div>

  return (
    <div className="container my-4">
      <h1 className="mb-4">Productos</h1>
      <div className="row">
        {productos.map(p => (
          <ProductoCard key={p.id} producto={p} />
        ))}
      </div>
    </div>
  )
}

export default Productos