import { WebSocketServer } from "ws";
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
dotenv.config({ path: "../../.env" }) 

interface JwtPayload{
  id:string
}

const wss = new WebSocketServer({port:8080})

function checkUser(token:string):string | null {
  const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload

  if (!decoded || !decoded.id) {
    return null
  }

  return decoded.id
}

wss.on('connection',(socket,request)=>{
  const url = request.url
  if (!url) {
    return
  }
  //Get the url and form array
  const urlParams = new URLSearchParams(url.split('?')[1])
  const tokenvalue = urlParams.get('token') || ""  as string
  const UserValidation = checkUser(tokenvalue)
  if (!UserValidation) {
    wss.close()
  }

  socket.on('message',(e)=>{
    if (e.toString()==='Hey') {
      socket.send("Hello There")
    }
  })
})