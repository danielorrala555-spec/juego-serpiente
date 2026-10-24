
    // 1. Capturamos el canvas y su contexto de dibujo
    const canvas = document.getElementById("canvasJuego");
    const ctx = canvas.getContext("2d");
    const TAMAÑO_CELDA = 25;
    const HANCHO_CANVAS = canvas.width;
    const ALTO_CANVAS = canvas.height
    const sonidoJuego = new Audio("破旧世界 (Broken World)(M4A_128K)-mc.m4a");
    const sonidoComer = new Audio("Audio_3_m4a_20260730_000703.m4a");
    const sonidoGameOver = new Audio("Audio_2_m4a_20260730_000617.m4a");
    sonidoComer.volume = 0.7;
    sonidoGameOver.volume = 0.8;
    sonidoJuego.volume = 0.4;

    sonidoJuego.loop = true;

    let SERPIENTE = [

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
    let colision = false;
    let puntaje =0;
    let estadoJuego = document.getElementById("estado")
    let velocidad = 1000;
    let tiempo = 60;
    let intervaloTiempo;
    

    

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
       
    for(let i=0; i<=SERPIENTE.length; i ++){
      dibujarPixel(SERPIENTE[i].X, SERPIENTE[i].Y, color, borde);
      dibujarPixel(cabeza.X,cabeza.Y,colorCabeza,borde)
    }
  }

function pintarSerpiente(){
    let cabeza = SERPIENTE[0];
      // color distintivo para ubicar la cabeza

    for(let i=0; i<SERPIENTE.length; i ++){
      dibujarPixel(SERPIENTE[i].X, SERPIENTE[i].Y, color, borde);
    }
    dibujarPixel(cabeza.X,cabeza.Y,colorCabeza,borde)
  }
  function moverDerecha(){
    let nvCabeza = { 
        X: SERPIENTE[0].X +1 ,
        Y: SERPIENTE[0].Y 
        };
        SERPIENTE.unshift(nvCabeza);
        if(colision === false){
          SERPIENTE.pop();
        } 
           
  }

  function moverIzquierda(){
    let nvCabeza = { 
        X: SERPIENTE[0].X -1 ,
        Y: SERPIENTE[0].Y 
        };
        SERPIENTE.unshift(nvCabeza);
        if(colision === false){
          SERPIENTE.pop();
        } 
           
  }

  function moverArriba(){
    let nvCabeza = { 
        X: SERPIENTE[0].X ,
        Y: SERPIENTE[0].Y -1
        };
        SERPIENTE.unshift(nvCabeza);
        if(colision === false){
          SERPIENTE.pop();
        }
         
           
  }

  function moverAbajo(){
    let nvCabeza = { 
        X: SERPIENTE[0].X ,
        Y: SERPIENTE[0].Y+1  
        };
        SERPIENTE.unshift(nvCabeza);
        if(colision === false){
          SERPIENTE.pop();
        } 
           
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
    sonidoJuego.play();
    clearInterval(intervaloTiempo);
    intervaloTiempo = setInterval(restarTiempo, 1000);
    intervaloSerpiente = setInterval(moverSerpiente, velocidad);
    if (comidaX === undefined || comidaY === undefined) {
    aparecerComida();
    }
  }

  function pausarJuego(){
    sonidoJuego.pause();
    clearInterval(intervaloSerpiente);
    clearInterval(intervaloTiempo);
  }

  function moverSerpiente(){
    if(gameOver()){

    return;

  }
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
    if(colision === true){
      puntaje ++;
      document.getElementById("puntaje").innerText = puntaje; 

    }
    colision=false
    aptrapaComida();
    dibujarTodo();
    nivel(puntaje)
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

  function aptrapaComida(){
    if(SERPIENTE[0].X === comidaX && SERPIENTE[0].Y === comidaY){
      colision = true;
      cambiarVelocidad();
      generaraComida();
      sonidoComer.play();
      sonidoComer.currentTime =0;
    }
  }

  function gameOver(){
    let mensaje = "game over, anciano!";
    let nuevaX = SERPIENTE[0].X;
  let nuevaY = SERPIENTE[0].Y;
  if (direccionActual === "derecha") {
    nuevaX++;
  } else if (direccionActual === "izquierda") {
    nuevaX--;
  } else if (direccionActual === "arriba") {
    nuevaY--;
  } else if (direccionActual === "abajo") {
    nuevaY++;
  }
  // Validar bordes
  if (
    nuevaX < 0 ||
    nuevaX >= ALTO_CANVAS / TAMAÑO_CELDA ||
    nuevaY < 0 ||
    nuevaY >= HANCHO_CANVAS / TAMAÑO_CELDA || tiempo <= 0
  ) {
    clearInterval(intervaloSerpiente);
    clearInterval(intervaloTiempo);
    sonidoJuego.pause();
    sonidoJuego.currentTime = 0;
    sonidoGameOver.currentTime = 0;
    sonidoGameOver.play();
    estadoJuego.textContent = mensaje;
    return true;
  }

  return false;

  
}
//------------------------------------[controsl del tiempo]----------------------------------//
function reiniciarJuego(){
  clearInterval(intervaloSerpiente);
  clearInterval(intervaloTiempo);
  sonidoJuego.pause();
  sonidoJuego.currentTime = 0;
  let mensaje= "Listo"
  direccionActual = "derecha";
  puntaje = 0;
  tiempo = 60;
  SERPIENTE = [

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
    document.getElementById("tiempoRest").innerText = tiempo;
    estadoJuego.textContent = mensaje;
  dibujarTodo();
}
//------------------------------------[controsl de velocidad serpiente]----------------------------------//
function cambiarVelocidad(){
  clearInterval(intervaloSerpiente);
  velocidad -= 100;
  intervaloSerpiente = setInterval(moverSerpiente, velocidad);
}
//------------------------------------[cambio de nivel]----------------------------------//
function nivel(puntaje){
  if(puntaje== 3){
    document.getElementById("mensajeLevel").innerText = "NIVEL 2, APRENDIS";
  }
  if(puntaje== 5){
    document.getElementById("mensajeLevel").innerText = "NIVEL 3, MAESTRO";
  }
  if(puntaje== 7){
    document.getElementById("mensajeLevel").innerText = "NIVEL 4, LEYENDA";
  }
  if(puntaje== 9){
    document.getElementById("mensajeLevel").innerText = 'NIVEL 5, "NIVEL DIOS"';
  }
}
//------------------------------------[controsl del tiempo]----------------------------------//
function restarTiempo(){
    tiempo--;
        document.getElementById("tiempoRest").innerText = tiempo;
        if (tiempo == 0) {
          clearInterval(intervaloSerpiente);
         clearInterval(intervaloTiempo); 
    }
    gameOver();
        
}

