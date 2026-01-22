import {WebSocketServer} from 'ws'
import express from "express"
const app =express();
const httpServer=app.listen(8081);
const wss= new WebSocketServer({server:httpServer});
const client=new Map();

wss.on("connection",(ws,request)=>{
    ws.on('error',console.error);
    const userId= request.url?.split("=")[1]
    console.log(userId)

    client.set(userId,ws);
    ws.on("message",(message,isBinary)=>{
        
        const data = JSON.parse(String(message))
        console.log(data.receiverId)
        const receiverSocket= client.get(data.receiverId);
        // console.log(receiverSocket)
        if(receiverSocket){
            if(receiverSocket.readyState===WebSocket.OPEN){
              receiverSocket.send(data.message,{isBinary:true})
            }
            else{
                const senderSocket= client.get(userId)
                if(senderSocket){
                  
                    senderSocket.send("Receiver not initialised",{isBinary:false})
                }
            }
        }
        else{
            const senderSocket= client.get(userId)
                if(senderSocket){
                    
                    senderSocket.send("Receiver not found",{isBinary:false})
                }
        }

    })
})