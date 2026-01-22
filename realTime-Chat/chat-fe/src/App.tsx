import React from 'react'
import App1 from "./components/App1"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
const App = () => {
  return (
 
<Router>
  <Routes>
    <Route path="/user/:userId" element={<App1 />} />
  </Routes>
</Router>

  )
}

export default App