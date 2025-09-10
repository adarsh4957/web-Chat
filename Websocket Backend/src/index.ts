import {WebSocketServer,WebSocket} from "ws";


const wss=new WebSocketServer({port:8080});
interface User{
    socket:WebSocket;
    room:string;
}
let allSockets:User[]=[];


//event handler
wss.on("connection",function(socket){    
    
    socket.on("message",(e)=>{
        //@ts-ignore
        const parsedmessage=JSON.parse(e)
        if(parsedmessage.type === "join"){            
            allSockets.push({
                socket:socket,
                room:parsedmessage.payload.roomId,
            })
        }        
        if(parsedmessage.type === "chat") {
            console.log("User wants to chat");
            
            let currentuserroom=null;
            for (let i=0;i<allSockets.length;i++){
                if(allSockets[i]?.socket==socket){
                    currentuserroom=allSockets[i]?.room
                }
            }
            for(let i=0;i<allSockets.length;i++){
                if(allSockets[i]?.room==currentuserroom){
                    allSockets[i]?.socket.send(parsedmessage.payload.message)
                }
            }
            
        }

    })
    
})