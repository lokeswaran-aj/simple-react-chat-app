import React from 'react'
import { useState, useEffect } from 'react'
import io from 'socket.io-client'

const socket = io("http://localhost:3000")

export default function App() {
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState("")
 
  useEffect(() => {
  socket.on("message", (message) => {
      setMessages([...messages, message])
    })
     return () => {
      socket.off("message")
    }
  }, [messages])

  const sendMessage = () => {
    if(messageInput.trim() !== ""){
      socket.emit("message", messageInput)
      setMessageInput("")
    }
  }

  return (
    <div>
      <h1>Simple Chat App</h1>
      <input type="text" name="message" value={messageInput} placeholder='Enter your message...' onChange={(e)=>setMessageInput(e.target.value)} />
      <button type="submit" onClick={sendMessage}>Send</button>
      <section>
        {messages.map((message, index)=> (
        <div key={index}>
          {message}
        </div>
        ))}
      </section>
    </div>
  )
}
