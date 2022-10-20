import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Home'
import Success from './Success'
import Cancel from './Cancel'

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
