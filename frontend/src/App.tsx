
import { useEffect, useState } from 'react'
import './App.css'
const hold={
  name:"sounak",
  surname:"roy"
}

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send("USER 1");
    }
    newSocket.onmessage = (message) => {
      console.log((message.data));
    }
    setSocket(newSocket);
    return () => newSocket.close();
  }, [])

  return (
    <>
      hi there
    </>
  )
}

export default App