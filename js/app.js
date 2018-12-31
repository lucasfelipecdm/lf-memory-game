const cardsArray = [
    'fa-diamond',
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-anchor',
    'fa-bolt',
    'fa-bolt',
    'fa-cube',
    'fa-cube',
    'fa-leaf',
    'fa-leaf',
    'fa-bicycle',
    'fa-bicycle',
    'fa-bomb',
    'fa-bomb'
];
const allStars = $('.fa-star')
let moves = 0;
let matchedCards = 0;
let timeStarted = false;
let firstCard = null, secondCard = null, fcli = null, scli = null;
let gameInterval;

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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
        $('.time').text(minutes + ":" + seconds);
        $('.endTime').text($('.time').text());
    }, 1000);
}

function starRate() {
    if (moves === 16){
        $(allStars[0]).addClass('hide');
        $(allStars[3]).addClass('hide');
    } else if (moves === 20){        
        $(allStars[1]).addClass('hide');
        $(allStars[4]).addClass('hide');
    }
}

function restartStarRate() {
    $('.fa-star').removeClass().addClass('fa fa-star');
}

function incrementMoves() {
    moves += 1;
    $('.moves').text(moves);
    $('.endMoves').text(moves);
    if (0 < moves <= 20){
        starRate();
    }
}

function createGrid(){
    $('.deck').html('');
    shuffleArray = shuffle(cardsArray)
    $(shuffleArray).each(function (){
        $('.deck').append('<li class ="card"><i class="fa ' + this + '"></i></li>')
    })
}

function showSymbol(card){
    $(card).addClass('open');
    $(card).addClass('show');
}

function backUnMatchedCards(){  
    $('.unMatch').removeClass('open show unMatch');
}

function cardClick(){
    $('.card').each(function (){
        $(this).on('click', function (){
            if (!timeStarted){
                timer();
                timeStarted = true;
            }
            if ($(this).hasClass('open show')){
                console.log('this was clicked man!!');
            } else {
                showSymbol(this);
                if (fcli === null){
                    firstCard = $(this)[0].children[0].className;
                    fcli = $(this);
                } else if (fcli !== null && scli === null){
                    secondCard = $(this)[0].children[0].className;
                    scli = $(this);
                    if (firstCard === secondCard){
                        $(fcli).addClass('match');
                        $(scli).addClass('match');
                        console.log('Its match!');
                        matchedCards += 1;
                        if (matchedCards === 8){
                            clearInterval(gameInterval);                           
                            $('.modal').addClass('showed');
                        }
                    } else {                    
                        $(fcli).addClass('unMatch');
                        $(scli).addClass('unMatch');
                        console.log('Its dont match');                    
                        setTimeout( function() {
                            backUnMatchedCards();
                        }, 1000);                    
                    }
                    console.log(firstCard, secondCard);
                    fcli = null, scli = null;
                    incrementMoves();
                }
            }
        });
    });
}



function initGame(){    
    createGrid();
    cardClick();
    moves = 0;
    $('.time').text('00:00');
    $('.moves').text('0');    
    clearInterval(gameInterval);  
    matchedCards = 0;
    timeStarted = false;
    firstCard = null, secondCard = null, fcli = null, scli = null;
    $('.modal').removeClass('showed');
    restartStarRate();
}

initGame();

$('.restart').on('click', function(){
        initGame();
})
