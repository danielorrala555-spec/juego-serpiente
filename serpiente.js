
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMAÑO_CELDA = 25;
    const HANCHO_CANVAS = canvas.width;
    const ALTO_CANVAS = canvas.height

    let lineaX = 0;
    let lineaY = 0;
    let color = "#5143b9";
    let borde = "#e45656";


    

    // Primera pintura del juego al cargar la página
    dibujarTodo();

    // =========================
    // FUNCIONES DE DIBUJO
    // =========================

    function limpiarCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function dibujarTodo() {
      limpiarCanvas();
      dibujarTablero();
      pintarParte();
    }

    function dibujarTablero(){
      ctx.strokeStyle= "#28374c"
      ctx.beginPath()
      for(let i= 0; i< HANCHO_CANVAS; i+=TAMAÑO_CELDA){
      ctx.moveTo(i, 0)
      ctx.lineTo(i, ALTO_CANVAS)
      }
      //LINEA ORIZONTAL//
      for(let i=0; i<HANCHO_CANVAS; i+=TAMAÑO_CELDA){
      ctx.moveTo(0,i)
      ctx.lineTo(ALTO_CANVAS,i)
      ctx.stroke()//dibuja todo
    }
  }  

  function dibujarPixel(x, y, color, borde){
    ctx.fillStyle = color;
    ctx.strokeStyle = borde;
    ctx.strokeRect(x * TAMAÑO_CELDA, y * TAMAÑO_CELDA, TAMAÑO_CELDA, TAMAÑO_CELDA)
    ctx.fillRect(x * TAMAÑO_CELDA, y * TAMAÑO_CELDA, TAMAÑO_CELDA, TAMAÑO_CELDA);

  }

  function pintarParte(){
    dibujarPixel(5, 5, color, borde);
    dibujarPixel(10, 2, color, borde);
    dibujarPixel(10, ALTO_CANVAS /TAMAÑO_CELDA - 1, color, borde);
    dibujarPixel(HANCHO_CANVAS /TAMAÑO_CELDA - 1, 10, color, borde);
    dibujarPixel(0, 10, color, borde);
    dibujarPixel( HANCHO_CANVAS /TAMAÑO_CELDA - 1, ALTO_CANVAS /TAMAÑO_CELDA - 1, color, borde);
    
  }


