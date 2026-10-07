import React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Index from '../views/Index'

const renderConRouter = (componente) => {
  return render(<BrowserRouter>{componente}</BrowserRouter>)
}

describe('Vista Index (Menú Principal)', () => {
  it('debería renderizar el carrusel', () => {
    renderConRouter(<Index />)
    const carrusel = document.querySelector('.carousel')
    expect(carrusel).toBeInTheDocument()
  })

  it('debería mostrar el título "NUEVOS LANZAMIENTOS"', () => {
    renderConRouter(<Index />)
    const titulo = screen.getByText('NUEVOS LANZAMIENTOS')
    expect(titulo).toBeInTheDocument()
  })

  it('debería mostrar la Colección Destiny en la tabla', () => {
    renderConRouter(<Index />)
    const destiny = screen.getAllByText('Colección Destiny')
    expect(destiny.length).toBeGreaterThan(0)
  })

  it('debería mostrar la Colección Jujutsu Kaisen en la tabla', () => {
    renderConRouter(<Index />)
    const kaisen = screen.getAllByText('Colección Jujutsu Kaisen')
    expect(kaisen.length).toBeGreaterThan(0)
  })

  it('debería mostrar la Colección Team Fortress 2 en la tabla', () => {
    renderConRouter(<Index />)
    const tf2 = screen.getAllByText('Colección Team Fortress 2')
    expect(tf2.length).toBeGreaterThan(0)
  })
})