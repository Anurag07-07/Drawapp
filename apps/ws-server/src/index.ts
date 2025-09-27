import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });
import {prisma} from '@repo/database/db'
interface JwtPayload {
  id: string;
}
interface User {
  socket: WebSocket;
  room: string[];
  userId: string;
}

const wss = new WebSocketServer({ port: 8080 });

//Array for state Management
const users: User[] = [];

wss.on("connection", (socket, request) => {
  const url = request.url;
  if (!url) {
    socket.close(1008, "Missing URL");
    return;
  }
  
  try {
    //Get the url and form array
    const urlParams = new URLSearchParams(url.split("?")[1]);
    const tokenvalue = urlParams.get("token") || "";
    console.log(tokenvalue);

    const decoded = jwt.verify(
      tokenvalue,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    if (!decoded || !decoded.id) {
      socket.close(1008, "Invalid token");
      return;
    }


    // Store user
    users.push({
      userId: decoded.id,
      socket: socket,
      room: [],
    });

    socket.on("message", async(data) => {
      try {
        const parsedData = JSON.parse(data.toString() as unknown as string);
        //If the User Send type === 'join_room' we have to add the user in the room
        if (parsedData.type === 'join_room') {
          //Find the user with the socket Id 
          const user = users.find((u)=>u.socket === socket)
          //Now as the user is found we add that user in the room
          console.log(parsedData.room);
          user?.room.push(parsedData.room) 
          socket.send("You joined the Room")
        }

        //If the user come out from the we have to remove that user from the room
        if (parsedData.type === 'exit_room') {
          //Find the user 
          const user = users.find((u)=>u.socket === socket)

          //Now we have to filter the room array and remove that particular room
          if (user) {
            user.room = user.room.filter((r)=>r!== parsedData.room)
            socket.send('Exit from the room')
          }
        }

        //If user wants to send the message
        if (parsedData.type === 'chat') {
          //First i have to find the user and i have to find the room where user exist
          const room = parsedData.room
          //Find the user
          const CurrentUser = users.find((x)=>x.socket === socket)
          
          users.forEach((u)=>{
            if (u.room.includes(room)) {
              u.socket.send(JSON.stringify(parsedData.message))
            }
          })
        
          await prisma.chat.create({
            data:{
              roomId:Number(room),
              message:parsedData.message as unknown as string,
              userId:CurrentUser?.userId as unknown as string,
            }
          })
        }
      } catch (err) {
        console.error("Invalid JSON message:", err);
        socket.send("Invalid message format",err as never);
      }
    });
  } catch (err) {
    console.error("JWT Error:", err);
    socket.close(1008, "Unauthorized");
  }
});