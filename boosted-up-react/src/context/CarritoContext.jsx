import { createContext, useContext, useState, useEffect } from 'react'
import React from 'react'
const CarritoContext = createContext()

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('carrito')
    return guardado ? JSON.parse(guardado) : []
  })

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito))
  }, [carrito])

  const agregarAlCarrito = (id, titulo, precio, img, cantidad = 1) => {
    setCarrito(prev => {
      const existente = prev.find(item => item.id === id)
      if (existente) {
        return prev.map(item =>
          item.id === id ? { ...item, cantidad: item.cantidad + cantidad } : item
        )
      } else {
        return [...prev, { id, titulo, precio, img, cantidad }]
      }
    })
    alert('Producto añadido al carrito!')
  }

  const cambiarCantidad = (id, delta) => {
    setCarrito(prev =>
      prev.map(item => item.id === id ? { ...item, cantidad: item.cantidad + delta } : item)
          .filter(item => item.cantidad > 0)
    )
  }

  const quitarDelCarrito = (id) => setCarrito(prev => prev.filter(item => item.id !== id))
  const vaciarCarrito = () => setCarrito([])

  const totalProductos = carrito.reduce((sum, item) => sum + item.cantidad, 0)
  const totalPrecio = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0)

  return (
    <CarritoContext.Provider value={{
      carrito,
      agregarAlCarrito,
      cambiarCantidad,
      quitarDelCarrito,
      vaciarCarrito,
      totalProductos,
      totalPrecio
    }}>
      {children}
    </CarritoContext.Provider>
  )
}

export function useCarrito() {
  return useContext(CarritoContext)
}