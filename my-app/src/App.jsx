import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Page components (to be defined in ./pages folder)
import Home from './pages/Home'
import About from './pages/About'
import Users from './pages/Users'

import Navbar from './components/Navbar'

function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/users/:id" element={<Users />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
