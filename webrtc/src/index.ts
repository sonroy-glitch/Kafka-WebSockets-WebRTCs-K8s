import {WebSocket,WebSocketServer} from "ws"
import express from "express"
import { v4 as uuidv4 } from 'uuid';
const app = express();
const httpServer= app.listen(8080);
const wss = new WebSocketServer({server:httpServer});
const room = new Map();//room logic implementation
wss.on("connection",(ws,request)=>{
    const roomId=request.url?.split("=")[1];
    if(!room.has(roomId)){
        room.set(roomId,new Map());
    }
    var userId=uuidv4();

    ws.send(JSON.stringify({type:"userId",id:userId}))//set this in the frontend
    var rooms = room.get(roomId);
    rooms.set(userId,ws);
    ws.on("error",console.error);
    ws.on("message",(data:any)=>{
        const message= JSON.parse(String(data));
                 
         if(message.type=="createOffer"){
            console.log('1 '+ message.sdp)
            
                room.get(roomId).forEach((item:any)=>{
                    if(item!=ws){
                    item?.send(JSON.stringify({type:"createOffer",sdp:message.sdp}))
                    }
                })
                    
            
        }
        else if (message.type=="createAnswer"){
            console.log("2 "+message.sdp)

            room.get(roomId).forEach((item:any)=>{
                if(item!=ws){
                item?.send(JSON.stringify({type:"createAnswer",sdp:message.sdp}))
                }
            })
        }
        else if(message.type=="iceCandidate"){
            console.log("3 "+message.candidate)
            room.get(roomId).forEach((item:any)=>{
                if(item!=ws){
                item?.send(JSON.stringify({type:"iceCandidate",iceCandidate:message.candidate}))
                }
            })
        }

    })
})