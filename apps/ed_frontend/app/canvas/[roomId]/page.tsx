'use client'
import { drawInit } from "@/app/draw"
import { useEffect, useRef } from "react"
import './page'
export default function Canvas() {

  const canvasRef = useRef<HTMLCanvasElement>(null)

  

  useEffect(()=>{

    if (!canvasRef.current) {
      return 
    }

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = ()=>{
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth *dpr
      canvas.height = window.innerHeight *dpr
      
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`

      if (ctx) {
        ctx.setTransform(1,0,0,1,0,0)
        ctx.scale(dpr,dpr)
        ctx.fillStyle = "black"
        ctx.fillRect(0,0,canvas.width,canvas.height)
      }
    }

    resize()

    window.addEventListener("resize",resize)


    if (canvasRef.current) {
      drawInit(canvasRef.current)
    }



  },[canvasRef])

  useEffect(() => {
  document.body.style.overflow = "hidden";
  return () => {
    document.body.style.overflow = "auto"; 
  };
}, []);
  return <canvas ref={canvasRef} ></canvas>
}