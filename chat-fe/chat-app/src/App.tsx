import {useState,useEffect} from "react"

import Render from "./screens/Render"


import React from 'react'

const App = () => {
  const [userId,setUserId]=useState('')
  const [message,setMessage]=useState('')
  let timeout;
  const debounce=(setter)=>(value)=>{
    clearTimeout(timeout)
    timeout= setTimeout(() => {
      setter(value)
    }, 1000);
  }
  useEffect(() => {
   
  }, [])
  async function run(){
    
  }
  return (
    <div>
     <input type="text" placeholder="User-Id" onChange={(e)=>debounce(setUserId)(e.target.value)}/>
      <input type="text" placeholder="message" onChange={(e)=>debounce(setMessage)(e.target.value)}/>
      <button onClick={run}>Send Message</button>
    </div>
  )
}

export default App