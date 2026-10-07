import { Routes, Route } from 'react-router-dom'
import { CarritoProvider } from './context/CarritoContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Index from './views/Index'
import Productos from './views/Productos'
import ProductoDetalle from './views/ProductoDetalle'
import Carrito from './views/Carrito'

function App() {
  return (
    <CarritoProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/producto/:id" element={<ProductoDetalle />} />
        <Route path="/carrito" element={<Carrito />} />
      </Routes>
      <Footer />
    </CarritoProvider>
  )
}

export default App