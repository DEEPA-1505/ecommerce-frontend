import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
    <div className='App'>

      <Router>

        <div>
          <Header cartItems={cartItems} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail cartItems={cartItems} setCartItems={setCartItems} />} />
             <Route path="/cart" element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
          </Routes>
        </div>



      </Router>


      <Footer />

    </div>
  )
}

export default App
