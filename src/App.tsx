import { Routes, Route } from 'react-router'

import ProductListing from './pages/ProductListing'

import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<ProductListing />} />
    </Routes>
  )
}

export default App
