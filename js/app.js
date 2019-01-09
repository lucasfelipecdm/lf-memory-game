/*[en] - Init variables declaration
 Create an array with all icons (card symbols)
 [pt-br] - Início da declaração de variáveis
 Criando uma lista com todos os icones (símbolos das cartas)*/
 const cardsArray = [
    'fa-money',
    'fa-money',
    'fa-laptop',
    'fa-laptop',
    'fa-heart',
    'fa-heart',
    'fa-bug',
    'fa-bug',
    'fa-coffee',
    'fa-coffee',
    'fa-code',
    'fa-code',
    'fa-keyboard-o',
    'fa-keyboard-o',
    'fa-headphones',
    'fa-headphones'
];
 /* [en] You can change the symbol of cards just changing the "fa icon" name in cardsArray
  EXAMPLE: 'fa-fire'
  But remember, you need a even number of cards.
  [pt-br] Você pode mudar o símbolo da carta apenas mudando o nome do "fa icon" na cardsArray
  EXEMPLO: 'fa-fire'
  Mas lembre-se, você precisa de um numero par de cartas.*/
 let lockBoard = false;
 let [firstClick, secondClick] = [null, null];
 let [fcli, scli] = [null, null];
 let endScore = 0;
 let tabIndex = 0;
 //move(s) variables
 let moves = 0;
 let itMatches = 0;
 // star icon variable
 const allStars = $('.fa-star');
 // Time variables
 let startGame = 0;
 let gameInterval;
 /*[en] - End variables declaration
  [ptbr] - Fim da declaração de variáveis*/
 
 /*[en] - Init function declaration
  [ptbr] - Inicio da declaração de funções*/
 
 /*[en] - Shuffle function from http://stackoverflow.com/a/2450976
  [ptbr] - Função de embaralhar adaptado de http://stackoverflow.com/a/2450976*/
 function shuffle(array) {
     let currentIndex = array.length,
         temporaryValue, randomIndex;
 
     while (currentIndex !== 0) {
         randomIndex = Math.floor(Math.random() * currentIndex);
         currentIndex -= 1;
         temporaryValue = array[currentIndex];
         array[currentIndex] = array[randomIndex];
         array[randomIndex] = temporaryValue;
     }
 
     return array;
 }
 
 /*[en] - Timer inspired by https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer
  [ptbr] - Temporizador adaptado de https://stackoverflow.com/questions/20618355/the-simplest-possible-javascript-countdown-timer*/
 function timer() {
     let minutes = 0;
     let seconds = 0;
     gameInterval = setInterval(function () {
         seconds = parseInt(seconds, 10) + 1;
         minutes = parseInt(minutes, 10);
         if (seconds >= 60) {
             minutes += 1;
             seconds = 0;
         }
         seconds = seconds < 10 ? "0" + seconds : seconds;
         minutes = minutes < 10 ? "0" + minutes : minutes;
         $('.displayTime').html(minutes + ":" + seconds);
         $('#end-time').text($('.displayTime').text());
     }, 1000);
 }
 
 /*[en] - Flip card and show their symbol
  [ptbr] - Gira a carta e mostra seu simbolo*/
 function displaySymbol(cardOpen) {
     $(cardOpen).addClass("open show");
 }
 
 /*[en] - Back card to default position when doesn't match
  [ptbr] - Volta a carta para a posição padrão quando não são iguais*/
 function closeUnmatchedCards() {
     setTimeout(function () {
         $('.unMatch').removeClass('unMatch show open');
     }, 100);
 }
 
 /*[en] - Set the firstClick and secondClick value to null !IMPORTANT! the game will crash if you don't set this values
  [ptbr] - Adiciona o valor null em firstClick e secondClick !IMPORTANTE! o jogo travará caso você não adicionar esses valores*/
 function restartClick() {
     [firstClick, secondClick] = [null, null]
 }
 
 /*[en] - Set the number of stars show
  [ptbr] - Posiciona o numero de estrelas*/
 function setStarsNum() {
     if (moves === 16) {
         $(allStars[0]).addClass('hide');
         $(allStars[3]).addClass('hide');
     } else if (moves === 20) {
         $(allStars[1]).addClass('hide');
         $(allStars[4]).addClass('hide');
     }
 }
 
 /*[en] - Increments the move counter and call the setStarsNum function
  [ptbr] - Incrementa o contador de movimentos e chama a função setStarsNum*/
 function moveCounter() {
     moves++;
     $('.moves').html(moves);
     $('#end-moves').html(moves);
     if (0 < moves <= 20) {
         setStarsNum();
     }
 }
 
 /*[en] - Show all stars, clean the variable itMatches, set startGame and moves to 0, set values of fcli and scli to null and hide the modal
  [ptbr] - Mostra todas as estrelas, limpa a variavel itMatches, adiciona o valor 0 ao startGame e moves, adiciona valor null a fcli e scli e esconde o modal */
 function cleanStatus() {
     for (let i = 0; i < allStars.length; i++) {
         $(allStars[i]).removeClass('hide');
     }
     endScore = 0;
     itMatches = 0;
     startGame = 0;
     moves = 0;
     $('.moves').text(0);
     [fcli, scli] = [null, null];
     $('.block-screen').removeClass('showed').addClass('hide');
 }
 
 /*[en] - Creates the element "li",  add class "card", creates the element "i" within "li", add class "fa" + "cardIcon" and return it
  [ptbr] - Cria o elemento "li" adiciona a class "card", cria o elemento dentro de li e adiciona a class "fa" + "cardIcon" e o retorna*/
 function newCard(cardIcon) {
     tabIndex += 1;
     return '<li class ="card" tabindex="'+tabIndex+'"><i class="fa ' + cardIcon + '"></i></li>'
 };
 
 /*[en] - Adds "match" and "true" class to corresponding cards, increments endScore and checks that all cards have been combined
  [ptbr] - Adiciona as classes "match" e "true" as cartas combinadas, incrementa o endScore e verifica se todas as cartas foram combinadas*/
 function matchCard() {
     $(fcli).addClass('match true');
     $(scli).addClass('match true');
     endScore += 10;
     itMatches++;
     if (itMatches === 8) {
         clearInterval(gameInterval);
         $('#end-score').text(endScore.toString());
         $('.block-screen').removeClass('hide').addClass('showed');
         $('.btn-yes').focus();
     }
     lockBoard = false;
 }
 
 /*[en] - Adds class "unMatch" to fcli and scli, decrement endScore and call closeUnmatchedCards in setTimeout of 750ms
  [ptbr] - Adiciona a classe "unMatch" em fcli e scli, decrementa o endScore and chama a função closeUnmatchedCards em setTimeout com um tempo de 750ms */
 function unMatchCard() {
     $(fcli).addClass('unMatch');
     $(scli).addClass('unMatch');
     endScore -= 2;
     setTimeout(function () {
         closeUnmatchedCards();
     }, 750);
     lockBoard = false;
 }
 
 /*[en] - Creates an event listener to card, verify startGame to call the timer, verify lockBoard and if the card is already open, then verify if its the first card or the second card and call the other functions
  [ptbr] - Cria um observador de evento para a carta, verifica o startGame para chamar a função de temporizador, verifica o lockBoard e se a carta já esta aberta, depois verifica se é o primeiro card ou o segundo e chama suas funções*/
 function cardClick(card) {
     $(card).on('click', function () {
         if (startGame === 0) {
             timer();
             startGame++;
         }
 
         if (lockBoard || $(this).hasClass('open show')) {
             return true;
         }
 
         if (firstClick === null && secondClick === null) {
             firstClick = $(this)[0].children[0].className;
             fcli = $(this);
         } else if (firstClick !== null && secondClick === null) {
             lockBoard = true;
             secondClick = $(this)[0].children[0].className;
             scli = $(this);
             if (firstClick === secondClick) {
                 matchCard();
             } else {
                 unMatchCard();
             }
             moveCounter();
             restartClick();
         }
         displaySymbol(this);
     })
/*[en] - Creates a keyboard event listener, the card focus can be controled by keyboard arrows and clicked by the enter.
[ptbr] - Cria um observador de evento para o teclado, o foco da carta pode ser controlado pelas setas do teclado e ela pode ser clicada através da tecla enter */
     $(card).keydown( function(evt){
         evt.preventDefault();
         if (evt.keyCode == 13) {            
            $(card).click();
         } else if (evt.keyCode == 37) {
            $('.card:focus').prev().focus();
         } else if (evt.keyCode == 39) {
            $('.card:focus').next().focus();
         } else if (evt.keyCode == 38) {             
            $('.card:focus').prev().prev().prev().prev().focus();
         } else if (evt.keyCode == 40) {             
            $('.card:focus').next().next().next().next().focus();
         }
    })
 }
 
 /*[en] - Init the game, clean all status and set all variable values to default, create the "li" element with the function newCard and append it to HTML document then call the cardClick to create the event listeners on cards
  [ptbr] - Inicia o jogo, limpa todos os status e adiciona os valores padrões a todas as variaveis, cria o elemento "li" usando a função newCard e adiciona ao documento HTML, depois chama a função cardClick para criar os observadores de eventos*/
 function gameStart() {
     cleanStatus();
     restartClick();
     clearInterval(gameInterval);
     $('.displayTime').html('00:00');
     $('.deck').html('');
     $(shuffle(cardsArray)).each(function () {
         $('.deck').append(newCard(this));
     })
     $('.card').each(function () {
         cardClick(this);
     })
     $('.card:first').focus();
 }
 gameStart();
 
 /*[en] - Creates an event listeners to call gameStart when the element is clicked or enter be pressed
  [ptbr] - Cria um observador de eventos para chamar a função gameStart quando o elemento é clicado ou é pressionada a tecla enter*/
 $('.restart').on('click', function () {
     gameStart();
 });
 
 $(document).keydown(function (evt){
    if (evt.keyCode == 113) {
        $('.restart').click();
    }
 })
 
 /*[en] - Creates an event listeners to call gameStart when the element is clicked or enter be pressed
  [ptbr] - Cria um observador de eventos para chamar a função gameStart quando o elemento é clicado ou é pressionada a tecla enter*/
 $('.btn-yes').on('click', function () {
     gameStart();
 });

 $('.btn-yes').keydown(function (evt){
     if (evt.keyCode == 13){
        $('.btn-yes').click();
    } else if (evt.keyCode == 39) {
        $('.btn-no').focus();
    }
})
 
 /*[en] - Creates an event listeners to hidden the modal when clicked or enter be pressed
  [ptbr] - Cria um observador de eventos para esconder o modal quando o elemento é clicado ou é pressionada a tecla enter*/
 $('.btn-no').on('click', function () {
     $('.block-screen').removeClass('showed').addClass('hide');
 });

 $('.btn-no').keydown(function (evt){
    if (evt.keyCode == 13){
        $('.btn-no').click();
    } else if (evt.keyCode == 37) {
        $('.btn-yes').focus();
    } 
})


