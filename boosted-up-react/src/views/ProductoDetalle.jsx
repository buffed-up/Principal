import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { productos, articulosDeColecciones, limpiarPrecio } from '../data/Productos'
import { useCarrito } from '../context/CarritoContext'

function ProductoDetalle() {
  const { id } = useParams()
  const { agregarAlCarrito } = useCarrito()
  const [producto, setProducto] = useState(null)
  const [cantidad, setCantidad] = useState(1)
  const [clicsTank, setClicsTank] = useState(0)
  const [tankActivo, setTankActivo] = useState(false)

  // Busca el producto por ID (puede estar en productos o en colecciones)
  useEffect(() => {
    const idNum = parseInt(id)
    let encontrado = productos.find(p => p.id === idNum)

    if (!encontrado) {
      for (let key in articulosDeColecciones) {
        encontrado = articulosDeColecciones[key].find(a => a.id === idNum)
        if (encontrado) break
      }
    }

    setProducto(encontrado || null)
    setCantidad(1) // Reinicia la cantidad al cambiar de producto
    setClicsTank(0) // Reinicia el contador del Easter Egg
  }, [id])

  // Activa el Easter Egg del Tank
  const activarEasterEgg = () => {
    setTankActivo(true)

    const audioMusica = document.getElementById('audio-tank')
    const audioGrunidos = document.getElementById('audio-grunidos-tank')

    if (audioMusica) {
      audioMusica.currentTime = 0
      audioMusica.play()
    }
    if (audioGrunidos) {
      audioGrunidos.currentTime = 0
      audioGrunidos.play()
    }

    setTimeout(() => {
      setTankActivo(false)
      if (audioMusica) audioMusica.pause()
      if (audioGrunidos) audioGrunidos.pause()
    }, 3000)
  }

  // Cuenta los clics en el título si es "Cosplay Bill"
  const handleTituloClick = () => {
    if (producto?.titulo === 'Cosplay Bill') {
      const nuevosClics = clicsTank + 1
      if (nuevosClics === 5) {
        activarEasterEgg()
        setClicsTank(0)
      } else {
        setClicsTank(nuevosClics)
      }
    }
  }

  const handleAgregar = () => {
    agregarAlCarrito(producto.id, producto.titulo, limpiarPrecio(producto.precio), producto.img, cantidad)
  }

  if (!producto) {
    return <h2 className="text-center mt-5">Producto no encontrado</h2>
  }

  return (
    <>
      <div className="container mt-4">
        {/* Botón de volver */}
        <div className="mb-4">
          <Link to="/productos" className="btn btn-vapor" style={{ fontSize: '0.8rem' }}>
            ← Volver a Productos
          </Link>
        </div>

        <div className="row mt-4">
          {/* Columna Izquierda: Imagen */}
          <div className="col-md-6">
            <img
              id="imagen-principal"
              src={`/${producto.img}`}
              alt={producto.titulo}
              className="img-fluid w-100 vapor-img"
              style={{ height: '450px', objectFit: 'contain', backgroundColor: '#000' }}
            />
          </div>

          {/* Columna Derecha: Información */}
          <div className="col-md-6">
            <div className="d-flex flex-column">
              <h1
                className="titulo-caja-vapor"
                style={{
                  fontSize: '1.5rem',
                  margin: '0 0 15px 0',
                  cursor: producto.titulo === 'Cosplay Bill' ? 'pointer' : 'default'
                }}
                onClick={handleTituloClick}
              >
                {producto.titulo}
              </h1>

              <h1
                id="precio-producto"
                style={{
                  fontSize: '2rem',
                  color: 'var(--vw-green)',
                  textShadow: '0 0 10px rgba(5, 255, 161, 0.3)',
                  marginBottom: '20px'
                }}
              >
                {producto.precio}
              </h1>
            </div>

            <hr style={{ borderColor: 'var(--vw-purple)' }} />

            <p className="mt-3 vapor-descripcion">
              {producto.descripcion}
            </p>

            <div className="mt-4">
              <label
                htmlFor="cantidad"
                className="form-label"
                style={{ color: 'var(--vw-cyan)', fontFamily: "'Press Start 2P'", fontSize: '0.8rem' }}
              >
                Cantidad
              </label>
              <input
                type="number"
                id="cantidad"
                className="form-control"
                value={cantidad}
                min="1"
                onChange={(e) => setCantidad(parseInt(e.target.value) || 1)}
                style={{
                  width: '100px',
                  background: 'rgba(26,11,46,0.8)',
                  border: '1px solid var(--vw-cyan)',
                  color: 'var(--vw-cyan)'
                }}
              />
            </div>

            <button
              id="boton-anadir"
              className="btn btn-vapor mt-4 w-100"
              style={{ fontSize: '0.8rem', padding: '15px' }}
              onClick={handleAgregar}
            >
              Añadir al carrito
            </button>

            <hr className="mt-5" style={{ borderColor: 'var(--vw-purple)' }} />
            <p style={{ fontSize: '0.8rem', color: 'var(--vw-text)', opacity: 0.7 }}>
              🚚 Envío gratis en compras sobre $50.000
            </p>
          </div>
        </div>
      </div>

      {/* EASTER EGG: TANK DE LEFT 4 DEAD */}
      {tankActivo && (
        <div id="easter-egg-tank" style={{ display: 'block' }}>
          <img
            src="/img/tank lfd animado.gif"
            className="easter-egg-img-tank"
            alt="Tank corriendo"
          />
          <audio id="audio-tank">
            <source src="/audio/cancion tank.mp3" type="audio/mpeg" />
          </audio>
          <audio id="audio-grunidos-tank">
            <source src="/audio/gritos tank.mp3" type="audio/mpeg" />
          </audio>
        </div>
      )}
    </>
  )
}

export default ProductoDetalle