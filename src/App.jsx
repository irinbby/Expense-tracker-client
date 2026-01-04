import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
//import './App.css'
import View from './pages/View'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Error from './pages/Error'
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <>
    <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<View />} />
          <Route path="/Add" element={<Add />} />
          <Route path="/edit/:id" element={<Edit />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
