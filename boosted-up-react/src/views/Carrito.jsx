import { useState } from 'react'
import { useCarrito } from '../context/CarritoContext'
import React from 'react'
function Carrito() {
  const {
    carrito,
    cambiarCantidad,
    quitarDelCarrito,
    vaciarCarrito,
    totalPrecio
  } = useCarrito()

  const [cupon, setCupon] = useState('')
  const [descuentoAplicado, setDescuentoAplicado] = useState(false)


  const aplicarCupon = () => {
    if (cupon.trim().toUpperCase() === 'VAPOR10') {
      setDescuentoAplicado(true)
      alert('¡Cupón aplicado! 10% de descuento.')
    } else {
      alert('Cupón inválido.')
    }
  }

  // Calcula el total final
  const totalFinal = descuentoAplicado ? Math.round(totalPrecio * 0.9) : totalPrecio

  // Simula el pago
  const pagar = () => {
    if (carrito.length === 0) {
      alert('Tu carrito está vacío.')
      return
    }
    alert('¡Pago realizado con éxito! Gracias por tu compra.')
    vaciarCarrito()
    setDescuentoAplicado(false)
    setCupon('')
  }

  return (
    <div className="container mt-5">
      <h2 className="titulo-caja-vapor text-center mb-5">Mi carrito de compras</h2>

      <div className="row">
        <div className="col-md-8">
          {carrito.length === 0 ? (
            <p className="text-center">Tu carrito está vacío.</p>
          ) : (
            carrito.map(item => (
              <div key={item.id} className="row align-items-center mb-4 vapor-card p-3">
                <div className="col-3">
                  <img
                    src={`/${item.img}`}
                    alt={item.titulo}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'contain',
                      backgroundColor: '#000'
                    }}
                  />
                </div>
                <div className="col-5">
                  <h5 className="vapor-title">{item.titulo}</h5>
                  <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>
                    Precio unitario: ${item.precio}
                  </p>
                </div>
                <div className="col-4 text-end">
                  <div className="d-flex justify-content-end align-items-center gap-2">
                    <button
                      className="btn btn-sm btn-vapor"
                      onClick={() => cambiarCantidad(item.id, -1)}
                    >
                      -
                    </button>
                    <span className="vapor-price">{item.cantidad}</span>
                    <button
                      className="btn btn-sm btn-vapor"
                      onClick={() => cambiarCantidad(item.id, 1)}
                    >
                      +
                    </button>
                  </div>
                  <p className="vapor-price mt-2" style={{ fontSize: '1.2rem' }}>
                    ${item.precio * item.cantidad}
                  </p>
                  <button
                    className="btn btn-sm btn-outline-danger mt-1"
                    onClick={() => quitarDelCarrito(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Columna Derecha: Resumen y Total */}
        <div className="col-md-4">
          <div className="card vapor-card p-4">
            <h4 className="vapor-title mb-3">TOTAL:</h4>
            <h2 id="total-carrito" className="vapor-price text-end" style={{ fontSize: '2.5rem' }}>
              ${totalFinal}
            </h2>

            <hr style={{ borderColor: 'var(--vw-purple)' }} />

            <label
              htmlFor="cupon"
              className="form-label"
              style={{ color: 'var(--vw-cyan)', fontFamily: "'Press Start 2P'", fontSize: '0.7rem' }}
            >
              Ingrese su cupón de descuento
            </label>
            <div className="d-flex gap-2 mt-2">
              <input
                type="text"
                id="cupon"
                className="form-control"
                placeholder="CUPON"
                value={cupon}
                onChange={(e) => setCupon(e.target.value)}
                style={{
                  background: 'rgba(26,11,46,0.8)',
                  border: '1px solid var(--vw-purple)',
                  color: 'var(--vw-text)'
                }}
              />
              <button
                className="btn btn-sm"
                style={{ background: 'var(--vw-purple)', color: '#fff' }}
                onClick={aplicarCupon}
              >
                APLICAR
              </button>
            </div>

            <hr style={{ borderColor: 'var(--vw-purple)' }} />

            <button
              className="btn btn-vapor w-100 mt-3"
              style={{
                backgroundColor: 'var(--vw-green)',
                color: '#000',
                border: '2px solid var(--vw-green)',
                fontSize: '1rem',
                padding: '15px'
              }}
              onClick={pagar}
            >
              PAGAR
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Carrito