import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { CarritoProvider } from '../context/CarritoContext'
import ProductoDetalle from '../views/ProductoDetalle'

describe('Vista ProductoDetalle', () => {
  it('debería mostrar un mensaje si el producto no existe', () => {
    render(
      <MemoryRouter initialEntries={['/producto/9999']}>
        <CarritoProvider>
          <Routes>
            <Route path="/producto/:id" element={<ProductoDetalle />} />
          </Routes>
        </CarritoProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('Producto no encontrado')).toBeInTheDocument()
  })

  it('debería mostrar el botón "Volver a Productos"', () => {
    render(
      <MemoryRouter initialEntries={['/producto/1']}>
        <CarritoProvider>
          <Routes>
            <Route path="/producto/:id" element={<ProductoDetalle />} />
          </Routes>
        </CarritoProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('← Volver a Productos')).toBeInTheDocument()
  })

  it('debería mostrar el botón "Añadir al carrito"', () => {
    render(
      <MemoryRouter initialEntries={['/producto/1']}>
        <CarritoProvider>
          <Routes>
            <Route path="/producto/:id" element={<ProductoDetalle />} />
          </Routes>
        </CarritoProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('Añadir al carrito')).toBeInTheDocument()
  })

  it('debería mostrar la etiqueta "Cantidad"', () => {
    render(
      <MemoryRouter initialEntries={['/producto/1']}>
        <CarritoProvider>
          <Routes>
            <Route path="/producto/:id" element={<ProductoDetalle />} />
          </Routes>
        </CarritoProvider>
      </MemoryRouter>
    )
    expect(screen.getByText('Cantidad')).toBeInTheDocument()
  })
})