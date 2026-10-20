
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
      ctx.moveTo(TAMAÑO_CELDA, 0)
      ctx.lineTo(TAMAÑO_CELDA, ALTO_CANVAS)
      ctx.moveTo(TAMAÑO_CELDA*2, 0)
      ctx.lineTo(TAMAÑO_CELDA*2, ALTO_CANVAS)
      ctx.moveTo(TAMAÑO_CELDA*3, 0)
      ctx.lineTo(TAMAÑO_CELDA*3, ALTO_CANVAS)
      //LINEA ORIZONTAL//
      ctx.moveTo(0,TAMAÑO_CELDA, )
      ctx.lineTo(HANCHO_CANVAS, TAMAÑO_CELDA, )
      ctx.moveTo(0, TAMAÑO_CELDA*2, )
      ctx.lineTo(HANCHO_CANVAS*2, TAMAÑO_CELDA*2, )
      ctx.moveTo(0, TAMAÑO_CELDA*3, )
      ctx.lineTo(HANCHO_CANVAS*3, TAMAÑO_CELDA*3, )
      ctx.stroke()
    }
  


