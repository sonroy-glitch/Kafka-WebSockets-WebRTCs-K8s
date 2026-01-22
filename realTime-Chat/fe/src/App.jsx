import React from 'react'
import App1 from "./components/App1"
import Home from "./components/Home"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App = () => {
  return (
 

  <Routes>
    <Route path="/user/:userId" element={<App1 />} />
    <Route path="/" element={<Home />} />

  </Routes>


  )
}

export default App