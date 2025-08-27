type Shape = {
  type:"rect",
  x:number
  y:number
  width:number
  height:number
} | {
  type:"circ",
  centerX:number
  centerY:number
  radius:number
}
export function drawInit(canvas:HTMLCanvasElement){
  
  const existingShape:Shape[] = []
  

  const ctx = canvas.getContext("2d")

      if (!ctx) {
        return 
      }

  ctx?.strokeRect(25,25,100,100) //x:25 y:25 is postion and width:100 height:100
      let clicked = false
      let startX = 0;
      let startY = 0;
      canvas.addEventListener('mousedown',(e)=>{
        clicked = true
        startX = e.clientX
        startY = e.clientY
      })

      canvas.addEventListener('mouseup',(e)=>{
        clicked = false
        //Calculate Height and Width
        const height = e.clientY-startY
        const width = e.clientX-startX

        existingShape.push({
          type:"rect",
          x:startX,
          y:startY,
          width:width,
          height:height
        })
      })

      canvas.addEventListener('mousemove',(e)=>{
        if (clicked) {
          //Physics Basic Logic
          const width = e.clientX-startX
          const height = e.clientY-startY
          clearCanvas(ctx,canvas,existingShape)
          //Create  a stroke of White color
          ctx.strokeStyle = `rgba(255,255,255)`
          ctx.strokeRect(startX,startY,width,height)
        }
    })
}

function clearCanvas(ctx:CanvasRenderingContext2D,canvas:HTMLCanvasElement,existingShape:Shape[]){
  // Clear Canva Logic 
  ctx.clearRect(0,0,canvas.width,canvas.height)
  //Fill the Canva with black color
  ctx.fillStyle = `rgba(0,0,0.1)`
  ctx.fillRect(0,0,canvas.width,canvas.height)
  // render all the shapes
  existingShape.map((shape)=>{
    if (shape.type === 'rect') {
      ctx.strokeRect(shape.x,shape.y,shape.width,shape.height)
      ctx.strokeStyle = `rgba(255,255,255)`
    }
  })
}
