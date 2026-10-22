
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMAÑO_CELDA = 25;
    const HANCHO_CANVAS = canvas.width;
    const ALTO_CANVAS = canvas.height
    const SERPIENTE = [

      {X:5, Y:8},
      {X:5, Y:9},
      {X:5, Y:10},
      {X:5, Y:11},
      {X:5, Y:12},
      {X:6, Y:12},
      {X:7, Y:12},
      {X:7, Y:13},
      {X:7, Y:14}
      
    ];
    let direccionActual = "derecha";
    let intervaloSerpiente;
    let lineaX = 0;
    let lineaY = 0;
    let color = "#5143b9";
    let colorCabeza = "#ec6a45";
    let borde = "#e45656";
    let comidaX;
    let comidaY;
    let colorComida = "#4558ec";


    

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
      pintarSerpiente();
      pintaComida();
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

function pintarSerpiente(){
    let cabeza = SERPIENTE[0];
      // color distintivo para ubicar la cabeza

    for(let i=0; i<SERPIENTE.length; i ++){
      dibujarPixel(SERPIENTE[i].X, SERPIENTE[i].Y, color, borde);
      dibujarPixel(cabeza.X,cabeza.Y,colorCabeza,borde)
    }
  }
  function moverDerecha(){
    let nvCabeza = { 
        X: SERPIENTE[0].X +1 ,
        Y: SERPIENTE[0].Y 
        };
        SERPIENTE.unshift(nvCabeza);
        SERPIENTE.pop(); 
           
  }

  function moverIzquierda(){
    let nvCabeza = { 
        X: SERPIENTE[0].X -1 ,
        Y: SERPIENTE[0].Y 
        };
        SERPIENTE.unshift(nvCabeza);
        SERPIENTE.pop(); 
           
  }

  function moverArriba(){
    let nvCabeza = { 
        X: SERPIENTE[0].X ,
        Y: SERPIENTE[0].Y -1
        };
        SERPIENTE.unshift(nvCabeza);
        SERPIENTE.pop(); 
           
  }

  function moverAbajo(){
    let nvCabeza = { 
        X: SERPIENTE[0].X ,
        Y: SERPIENTE[0].Y+1  
        };
        SERPIENTE.unshift(nvCabeza);
        SERPIENTE.pop(); 
           
  }

  function cambiarDireccion(direccion){
    if (direccion === "derecha") {
    direccionActual = "derecha" ;
  }
  if (direccion === "izquierda") {
    direccionActual = "izquierda" ;
  }
  if (direccion === "arriba") {
    direccionActual = "arriba" ;
  }
  if (direccion === "abajo") {
    direccionActual = "abajo" ;
  }
  dibujarTodo();
    
  }

  function iniciarJuego(){
    intervaloSerpiente = setInterval(moverSerpiente, 1000);
    aparecerComida();
    

  }

  function pausarJuego(){
    clearInterval(intervaloSerpiente);

  }

  function moverSerpiente(){
    if(direccionActual === "derecha"){
      moverDerecha();
    }
    if(direccionActual === "izquierda"){
      moverIzquierda();
    }
    if(direccionActual === "arriba"){
      moverArriba();
    }
    if(direccionActual === "abajo"){
      moverAbajo();
    }
    dibujarTodo();
  }

  function aparecerComida(){
    generaraComida();
    pintaComida();
  }

  function pintaComida(){
    dibujarPixel(comidaX, comidaY, colorComida);
  }

  function generaraComida(){
    comidaX = Math.floor(Math.random() * (canvas.width / TAMAÑO_CELDA));
    comidaY = Math.floor(Math.random() * (canvas.height / TAMAÑO_CELDA));
  }