import express from "express";
import {createServer} from "http"
import { Server } from "socket.io";
import cors from "cors"

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors:{
    origin: "http://localhost:5173",
    methods: ['GET', 'POST']
  }
})
app.use(cors)

io.on("connection", socket => {
  console.log("new client connected")
  socket.on("message", message => io.emit("message", message))
})



const PORT = 3000
server.listen(PORT, () => console.log("server is running..."))
