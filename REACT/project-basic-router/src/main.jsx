import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { About, Home, Listado, NotFound } from './pages'



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='/home' element={<Home />}/>
          <Route path='/listado' element={<Listado />}/>
          <Route path='*' element={<NotFound />}/>
          <Route path='/about' element={<About />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
