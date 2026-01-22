import express from 'express'
import {WebSocketServer} from 'ws'
//implementing the concept of rooms in general ws   
//you send a roomid along with your request
//onmessage and onclose implementation
const rooms = new Map();
const app= express();
const httpServer= app.listen(8080);
const wss= new WebSocketServer({server:httpServer})

