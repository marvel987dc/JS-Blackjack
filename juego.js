let deck = [];
const tipos = ['C', 'D', 'H', 'S']
const especiales = ['A', 'J', 'Q', 'K']

//variables para inicializar los puntos del jugador y la maquian en 0
let puntosJugador = 0;
let puntosComputadora = 0;

//Referencias de HTML:

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');

const puntosHTML = document.querySelectorAll('small');



//esta funcion crea un nuevo deck
const createDeck = () => {

    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push(i + tipo);
        }
    }

    for(let tipo of tipos){
        for(let esp of especiales){
            deck.push(esp + tipo);
        }
    }

    deck = _.shuffle(deck);
    console.log(deck);
    return deck;

}

createDeck();

//esta funcion me permite tomar una carta
const pedirCarta = () => {

    if(deck.length === 0){
        throw 'There is no cards in the deck';
    }
    const carta = deck.pop();

    // console.log(deck);
    // console.log(carta); //carta debe ser de la baraja
    return carta;
}

// pedirCarta();
const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? 
        (valor === 'A') ? 11 : 10
        : valor * 1;
}
        //turno de la computadora
    const turnoComputadora = (puntosMinimos) => {
        
        do {
            const carta = pedirCarta();

            puntosComputadora = puntosComputadora + valorCarta(carta);
            puntosHTML[1].innerText = puntosComputadora;
        
            // <!-- <img class="cards" src="assets/cartas/10C.png" > -->
            const imgCarta = document.createElement('img');
            imgCarta.src = `assets/cartas/${carta}.png`;
        
            imgCarta.classList.add('cards');
            divCartasComputadora.append(imgCarta);

            if (puntosMinimos > 21){
                break;
            }
         }while( (puntosComputadora > puntosMinimos) && (puntosComputadora <= 21));

    setTimeout(() => {

            if(puntosComputadora === puntosMinimos){
                alert('There is a draw :c');
            }else if(puntosMinimos < 21){
                alert('You Win Bitch!!!');
            } else if (puntosJugador < 21){
                alert('You Win Bitch!!! :)');
            } else{
                alert('Computer Win >:C');
            }
            
        },10);
    } 

    btnNuevo.addEventListener('click', () => {

        console.clear();
        deck = [];

        deck = createDeck();

        puntosJugador = 0;
        puntosComputadora = 0;

        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled =  false;
    });

        // let puntos = 0;
    // console.log({valor});
    // if(isNaN(valor)){
    //       //isNaN is is not a number or not dime si es un numero o no
    //       puntos = (valor === 'A') ? 11 : 10;
    // }
    // else{
    //     puntos = valor * 1;
    // }
    // console.log(puntos);

// const valor = valorCarta(pedirCarta());
// console.log(valor);

//Eventos

btnPedir.addEventListener('click', () => {

    //constante para pedir una carta, creo la contante y llamo la funcion para generarla,
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    // <!-- <img class="cards" src="assets/cartas/10C.png" > -->
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;

    imgCarta.classList.add('cards');
    divCartasJugador.append(imgCarta);
    
    // divCartasJUgador.append
        
    setTimeout(() => {
     if(puntosJugador > 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);
    }
    else if(puntosJugador === 21){
        alert("21 FAM!! On your Headtop!!!")
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        puntosComputadora(puntosJugador);
    }
},10);



    btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
    }
);
});




