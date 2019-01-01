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
 let lockBoard = false;
 let [firstClick, secondClick] = [null, null];
 let [fcli, scli] = [null, null];
 let endScore = 0;
 let moves = 0;
 let itMatches = 0;
 const allStars = $('.fa-star');
 let startGame = 0;
 let gameInterval;
  
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
 
 
 function displaySymbol(cardOpen) {
     $(cardOpen).addClass("open show");
 }
 
 
 function closeUnmatchedCards() {
     setTimeout(function () {
         $('.unMatch').removeClass('unMatch show open');
     }, 100);
 }
 
 
 function restartClick() {
     [firstClick, secondClick] = [null, null]
 }
 
 
 function setStarsNum() {
     if (moves === 16) {
         $(allStars[0]).addClass('hide');
         $(allStars[3]).addClass('hide');
     } else if (moves === 20) {
         $(allStars[1]).addClass('hide');
         $(allStars[4]).addClass('hide');
     }
 }
 
 
 function moveCounter() {
     moves++;
     $('.moves').html(moves);
     $('#end-moves').html(moves);
     if (0 < moves <= 20) {
         setStarsNum();
     }
 }
 
 
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
 
 
 function newCard(cardIcon) {
     return '<li class ="card"><i class="fa ' + cardIcon + '"></i></li>'
 };
 
 
 function matchCard() {
     $(fcli).addClass('match true');
     $(scli).addClass('match true');
     endScore += 10;
     itMatches++;
     if (itMatches === 8) {
         clearInterval(gameInterval);
         $('#end-score').text(endScore.toString());
         $('.block-screen').removeClass('hide').addClass('showed');
     }
     lockBoard = false;
 }
 
 
 function unMatchCard() {
     $(fcli).addClass('unMatch');
     $(scli).addClass('unMatch');
     endScore -= 2;
     setTimeout(function () {
         closeUnmatchedCards();
     }, 750);
     lockBoard = false;
 }
 
 
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
 }
 
 
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
 }
 gameStart();
 
 
 $('.restart').on('click', function () {
     gameStart();
 });
 
 
 $('.btn-yes').on('click', function () {
     gameStart();
 });
 
 
 $('.btn-no').on('click', function () {
     $('.block-screen').removeClass('showed').addClass('hide');
 });