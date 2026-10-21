
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMAÑO_CELDA = 25;
    const HANCHO_CANVAS = canvas.width;
    const ALTO_CANVAS = canvas.height


    

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
    }

    function dibujarTablero(){
      ctx.strokeStyle= "#4b284c"
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


