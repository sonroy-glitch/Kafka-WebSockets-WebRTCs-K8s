import React,{useState,useEffect} from 'react'
import {useParams} from "react-router-dom"
const App1 = () => {
  // const [userId,setUserId]=useState("")
  const {userId}=useParams()
  const [socket,setSocket]=useState(null);
  // const [receiverId,setReceiverId]=useState('')
  const [chat,setChat]=useState([])
  const [message,setMessage]=useState("")
  let timeout;
  useEffect(() => {
    console.log(userId)
    const ws = new WebSocket(`ws://localhost:8081/?userId=${userId}`);
    setSocket(ws);
    ws.onopen;
    ws.onmessage = (e) => {
      setChat(prevChat => [
        ...prevChat,
        {
          type: "incoming",
          message: e.data
        }
      ]);
    };
    
  }, [])
  
  function run(){
    var receiverId;
    if(userId=="sounak"){
      receiverId="sr1435"
    }
    else if(userId=="sr1435"){
      receiverId="sounak"

    }
    socket.send(JSON.stringify({
      receiverId,
      message,
    }))
    document.getElementById("text").value=""

    setChat(prevChat=>[...prevChat,{
      type:"outgoing",
      message,
    }])

  }
  
 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="p-4 space-y-3">
          {chat.map((item, index) => (
            item.type === "incoming" ? (
              <div
                key={index}
                className="flex justify-start items-center space-x-2"
              >
                <div className="bg-gray-700 text-white p-3 rounded-lg shadow-sm max-w-xs">
                  {item.message}
                </div>
              </div>
            ) : (
              <div
                key={index}
                className="flex justify-end items-center space-x-2"
              >
                <div className="bg-blue-500 text-white p-3 rounded-lg shadow-sm max-w-xs">
                  {item.message}
                </div>
              </div>
            )
          ))}
        </div>
        <div className="p-4 border-t border-gray-700 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            id="text"
            onChange={(e) => {setMessage(e.target.value)}}
            onKeyDown={(e)=>{
              if(e.key==="Enter"){
                run();
              }
            }}
            className="flex-grow p-2 bg-gray-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={run}
            
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
    
  
}

export default App1