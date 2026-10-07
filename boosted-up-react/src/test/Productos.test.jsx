import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { CarritoProvider } from '../context/CarritoContext'
import Productos from '../views/Productos'

const renderConProviders = (componente) => {
  return render(
    <BrowserRouter>
      <CarritoProvider>{componente}</CarritoProvider>
    </BrowserRouter>
  )
}

describe('Vista Productos', () => {
  it('debería renderizar el título "PRODUCTOS"', () => {
    renderConProviders(<Productos />)
    const titulo = screen.getByText('PRODUCTOS')
    expect(titulo).toBeInTheDocument()
  })

  it('debería mostrar las pestañas de filtro', () => {
    renderConProviders(<Productos />)
    expect(screen.getByText('Todos')).toBeInTheDocument()
    expect(screen.getByText('Cosplay')).toBeInTheDocument()
    expect(screen.getByText('Coleccionables')).toBeInTheDocument()
  })

  it('debería mostrar los productos principales', () => {
    renderConProviders(<Productos />)
    expect(screen.getByText('Cosplay Dio')).toBeInTheDocument()
    expect(screen.getByText('Figura Yujiro Hanma')).toBeInTheDocument()
    expect(screen.getByText('Cosplay Bill')).toBeInTheDocument()
  })

  it('debería mostrar las colecciones', () => {
    renderConProviders(<Productos />)
    expect(screen.getByText('Colección Jujutsu Kaisen')).toBeInTheDocument()
    expect(screen.getByText('Colección Destiny')).toBeInTheDocument()
    expect(screen.getByText('Colección Warhammer 40k')).toBeInTheDocument()
  })
})