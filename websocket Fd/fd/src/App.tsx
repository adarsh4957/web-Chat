import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const [messages,setmessages]=useState(["hemlooo","hii there"]);
  const wsref=useRef();
  useEffect(()=>{
    const ws =new WebSocket("http://localhost:8080/")
    ws.onmessage=(event)=>{
      setmessages(m=>[...m,event.data])
    }
    wsref.current=ws;
    }
  ,[])

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col w-full max-w-md h-[600px] bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 text-lg font-semibold">
          Chat App
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {/* Received message */}
          <div className="flex justify-start">
            <div >
              <div >
              {messages.map(messages=> <div className='m-5'><span className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-800 rounded-bl-none max-w-xs">{messages}</span>
              </div>)}
              </div>
            </div>
          </div>

          {/* Sent message */}
          <div className="flex justify-end">
            <div className="px-4 py-2 rounded-2xl bg-blue-500 text-white rounded-br-none max-w-xs">
              Hello! How are you?
            </div>
          </div>
        </div>

        {/* Input */}
        <div className="p-3 border-t flex items-center space-x-2">
          <div >
          <input
            id='message'
            type="text"
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            id='roomId'
            type="text"
            placeholder="Give the room Id"
            className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          </div>
          <button onClick={()=>{
            const message=document.getElementById("message")?.value;
            wsref.current.send(JSON.stringify({
              type:"chat",
              payload:{
                message:message
              }
            }))
          }}
           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
            Send Message
          </button>
          <button onClick={()=>{
            const roomId=document.getElementById("roomId")?.value;
            wsref.onopen(
            wsref.current.send(JSON.stringify({
              type:"join",
              payload:{
                roomId:roomId
              }
            })))
          }}
           className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full">
            Send Room Id
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
