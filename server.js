import express from "express"
import http from "node:http"
import { Server } from "socket.io"
import { Socket } from "socket.io-client"

const app = express()

const server = http.createServer(app)

const io = new Server(server)

const port = 5000

io.on('connection',(Socket)=>{
    console.log('socket connected', Socket.id)
})

server.listen(port, ()=>{
    console.log(`server is listening on ${port}`)
})



