/* 2C = Two of Clubs, 2D = Two of Diamonds, 2H = Two of Hearts, 2S = Two of Spades */

const modulo = (() => {
  'use strict';

  let deck = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  let puntosJugadores = [];

  // Referencias del HTML
  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo");

  const  divCartasJugadores = document.querySelectorAll('.divcartas'),
    puntosHTML = document.querySelectorAll("small");


  // Inicializa el Juego
  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();

    puntosJugadores = [];

    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
      //console.log({numJugadores});
    }

    puntosHTML.forEach( elemento => elemento.innerText = 0 );
    divCartasJugadores.forEach (elemento => elemento.innerHTML = '' ); 

    btnPedir.disabled = false;
    btnDetener.disabled = false;

  };


  // Crear una nueva Baraja
  const crearDeck = () => {
    deck = [];

    for (let i = 2; i <= 10; i++) {
      for (let tipo of tipos) {
        deck.push(i + tipo);
      }
    }

    for (let tipo of tipos) {
      for (let esp of especiales) {
        deck.push(esp + tipo);
      }
    }
    return _.shuffle(deck);
  };


  //Tomar una carta
  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    return deck.pop(); //remover carta de la baraja
  };


  // Sirve para obtener el valor de la carta
  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? 
    (valor === "A" ? 11 : 10) 
    : valor * 1;
  };


  // turno: = 0 primer jugador , ultimo computadora
  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };


//rear Carta 
const crearCarta = (carta, turno ) =>{
    const imgCarta = document.createElement("img");
      imgCarta.src = `assets/cartas/${carta}.png`; //3H, JD
      imgCarta.classList.add("carta"); // poner la clase
      divCartasJugadores[turno].append(imgCarta);
      //divCartasComputadora.append(imgCarta);
}


const determinarGanador = () =>{

    const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

    setTimeout(() => {
        if (puntosComputadora === puntosMinimos) {
          swal("Nadie Gana :(", " ", "warning");
        } else if (puntosMinimos > 21) {
          swal("Computadora gana", " ", "info");
        } else if (puntosComputadora > 21) {
          swal("Jugador gana", " ", "success");
        } else {
          swal("Computadora gana", " ", "info");
        }
  
        /*if (puntosJugador === puntosComputadora){
                  alert('Empate!!');
              }
              else if (puntosJugador > puntosComputadora && puntosJugador <= 21  || puntosComputadora > 21){
                  alert('Gana el Jugador !!!');
              }else if (puntosJugador < puntosComputadora && puntosComputadora <= 21 || puntosJugador > 21){
                  alert('Gana la Computadora!!!');
              }*/
      }, 100);
}


  // turno de la computadora
  const turnoComputadora = (puntosMinimos) => {

    let puntosComputadora = 0;

    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta( carta, puntosJugadores.length - 1);
     

      if (puntosMinimos > 21) {
        //detener el ciclo cuando el jugador saque
        break;
      }
    } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();

  };


  // Eventos 
  btnPedir.addEventListener("click", () => {
    //console.log('click');
    const carta = pedirCarta();
    const puntosJugador = acumularPuntos(carta, 0);
    crearCarta( carta, 0);

    if (puntosJugador > 21) {
      swal("Lo siento mucho, perdiste", " ", "error");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {
      swal("21, Usted ha ganado!", " ", "success");
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora(puntosJugador);
    }
  });


  btnDetener.addEventListener("click", () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugadores[0]);
  });


  /*btnNuevo.addEventListener("click", () => {
    //console.clear();
    inicializarJuego();

  });*/


  return {
    nuevoJuego:  inicializarJuego
  };

})();
