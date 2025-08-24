import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'

function App() {
  const [cartItems, setCartItems] = useState([]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Router>
        <Header cartItems={cartItems} />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          </Routes>
        </main>
        <Footer />
      </Router>
    </div>
  )
}

export default App
