import { useState } from 'react'
import './App.css'
import {Home} from './pages/Home'
import {Category} from './pages/Category'
import {Checkout} from './pages/Checkout'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Navigation } from './component/Navigation'
import { Contact } from './pages/Contact'
import { ProductListing } from './pages/productListing'

function App() {

  return (
    <BrowserRouter>
      <div style={main}>
        {/* Background gradient */}
        <div style={main1}>
          <div style={{ 
              position: "absolute", 
              inset: 0 
            }}>
            <div style={um} />
          </div>
        </div>
        <div style={{ 
          position: "relative", 
          zIndex: 50, 
          // paddingTop: "80px" 
        }}>
          <Navigation/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/category/:category' element={<Category />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product" element={<ProductListing />} />

          </Routes>
        </div>
        <Toaster />
      </div>
    </BrowserRouter>
  )
}

const main  = { 
  minHeight: "100vh", 
  backgroundColor: "#111827", 
  color: "white", 
  position: "relative", 
  overflow: "hidden" 
}

const main1 = { 
  position: "absolute", 
  inset: 0, 
  overflow: "hidden" 
}

const um = { 
  position: "absolute", 
  top: 0, 
  left: "50%", 
  transform: "translateX(-50%)", 
  width: "100%", 
  height: "100%", 
  background: "radial-gradient(ellipse at top, rgba(16,185,129,0.3) 0%, rgba(10,80,60,0.2) 45%, rgba(0,0,0,0.1) 100%)" 
}
export default App
