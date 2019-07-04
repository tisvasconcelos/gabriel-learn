const express = require('express');
const router = express.Router();
const five = require("johnny-five");
const board = new five.Board();

const words = [
  'berinjela',
  'grelha',
  'carne',
  'casca',
  'fogo',
  'dinheiro',
  'laranja',
  'chiclete',
  'nariz',
  'boca',
  'chuva',
  'carro',
  'camiseta',
  'perna',
  'teatro',
  'cinema',
  'pele',
  'computador',
  'celular',
  'jogos',
  'familia',
  'domingo',
  'panela',
  'segunda',
  'quarta',
  'quinta',
  'sexta',
  'terminar',
  'churrasco',
  'frutas',
  'banana',
  'sobremesa',
  'costela',
  'sal',
  'alto',
  'tempo',
  'calor',
  'frio',
  'fria',
  'amexa',
  'queimado',
  'sabor',
  'defumado',
  'pessoal',
  'derretendo',
  'pegar',
  'picar',
  'cortar',
  'hora',
  'copo',
  'prato',
  'caneca',
  'caramelo',
  'chocolate',
  'bolacha',
  'crocante',
  'brincadeira',
  'futebol',
  'bola',
  'escrito',
  'chuteira',
  'caneleira',
  'Gabriel',
  'Tiago',
  'Natach',
  'Cica',
  'Adilson',
  'Fatima',
  'Jose',
  'bom',
  'mal',
  'carteira',
  'garrafa',
  'caixa',
  'lata',
  'fogo',
  'mais',
  'menos',
  'galinha',
  'porco',
  'vaca',
  'peru',
  'cavalo',
  'Brasil',
  'Portugal',
  'montanha',
  'Argentina',
  'Uruguai',
  'Chile',
  'final',
  'porta',
  'parede',
  'quadro',
  'fone',
  'controle',
  'carinho',
  'hotel',
  'foto',
  'varanda',
  'pia',
  'geladeira',
  'pedra',
  'ar',
  'vento',
  'biscoito',
  'caneta',
  'canetinha',
  'foto',
  'giz',
  'lixeira',
  'rua',
  'olho',
  'aparelho',
  'trabalho',
  'escola',
  'escolaridade',
  'amigos',
  'amigas',
  'professora',
  'professor',
  'pijama',
  'cama',
  'travesseiro',
  'bolso',
  'bermuda',
  'chinelo',
  'toalha',
  'banho',
  'banheiro',
  'alarme',
  'acordar',
  'cedo',
  'tarde',
  'noite',
  'gripe',
  'resfriado',
  'feira',
  'pastel',
  'batata',
  'lento',
  'sapato',
  'mochila',
  'jantar',
  'maquiagem',
  'redondo',
  'quadrado',
  'programa',
  'tigre',
  'brasileiro',
  'caderno',
  'internet',
  'abacate',
  'faca',
  'colher',
  'garfo',
  'orelha',
];

let yellow = new five.Led(10);

let digits = {
  topRight: new five.Led(8).on(), // top right
  bottomLeft: new five.Led(7).on(), // bottom left
  bottom: new five.Led(6).on(), // bottom
  bottomRight: new five.Led(5).on(), // bottom right
  middle: new five.Led(4).on(), // middle
  topLeft: new five.Led(3).on(), // top left
  top: new five.Led(2).on(), // top
};

let display = (number) => {
  switch (number) {
    case 0:
      digits.top.on();
      digits.topLeft.on();
      digits.topRight.on();
      digits.middle.off();
      digits.bottom.on();
      digits.bottomLeft.on();
      digits.bottomRight.on();
      break;
    case 9:
        digits.top.on();
        digits.topLeft.on();
        digits.topRight.on();
        digits.middle.on();
        digits.bottom.on();
        digits.bottomLeft.off();
        digits.bottomRight.on();
      break;
    case 8:
        digits.top.on();
        digits.topLeft.on();
        digits.topRight.on();
        digits.middle.on();
        digits.bottom.on();
        digits.bottomLeft.on();
        digits.bottomRight.on();
      break;
    case 7:
        digits.top.on();
        digits.topLeft.off();
        digits.topRight.on();
        digits.middle.off();
        digits.bottom.off();
        digits.bottomLeft.off();
        digits.bottomRight.on();
      break;
    case 6:
        digits.top.on();
        digits.topLeft.on();
        digits.topRight.off();
        digits.middle.on();
        digits.bottom.on();
        digits.bottomLeft.on();
        digits.bottomRight.on();
      break;
    case 5:
        digits.top.on();
        digits.topLeft.on();
        digits.topRight.off();
        digits.middle.on();
        digits.bottom.on();
        digits.bottomLeft.off();
        digits.bottomRight.on();
      break;
    case 4:
        digits.top.off();
        digits.topLeft.on();
        digits.topRight.on();
        digits.middle.on();
        digits.bottom.off();
        digits.bottomLeft.off();
        digits.bottomRight.on();
      break;
    case 3:
        digits.top.on();
        digits.topLeft.off();
        digits.topRight.on();
        digits.middle.on();
        digits.bottom.on();
        digits.bottomLeft.off();
        digits.bottomRight.on();
      break;
    case 2:
        digits.top.on();
        digits.topLeft.off();
        digits.topRight.on();
        digits.middle.on();
        digits.bottom.on();
        digits.bottomLeft.on();
        digits.bottomRight.off();
      break;
    case 1:
        digits.top.off();
        digits.topLeft.off();
        digits.topRight.on();
        digits.middle.off();
        digits.bottom.off();
        digits.bottomLeft.off();
        digits.bottomRight.on();
      break;
    default:
        digits.top.off();
        digits.topLeft.off();
        digits.topRight.off();
        digits.middle.off();
        digits.bottom.off();
        digits.bottomLeft.off();
        digits.bottomRight.off();
  }
};

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

let time, interval;

/* GET home page. */
router.get('/', function(req, res, next) {
  time = 10;
  let data = {
    name: 'Gabriel',
    words: shuffleArray(words).slice(0, 10),
  };
  res.render('portuguese', data);

  initInterval();
});

let yellowBlink = (blink) => {
  if(blink) {
    yellow.blink();
  } else {
    yellow.stop();
    yellow.off();
  }
};

let initInterval = () => {
  display(0);
  yellowBlink(false);
  if(interval) {
    clearInterval(interval);
  }
  interval = setInterval(() => {
    time = time - 1;
    display(time);
    if(time > 0 && time < 4) {
      yellowBlink(true);
    }
    if(time <= 0) {
      clearInterval(interval);
    }
  }, 10000);
};

router.get('/time/reset', function(req, res, next) {
  time = 11;
  initInterval();
  res.status(200);
  res.send('reseted!');
});

router.get('/time', function(req, res, next) {
  if(time <= 0) {
    yellowBlink(false);
  }
  res.send(time.toString());
});

router.get('/success', function(req, res, next) {
  board.on("ready", function() {
    let green = new five.Led(12);
  
    green.on();
  });
  res.status(200);
  res.send('ok!');
});

module.exports = router;
