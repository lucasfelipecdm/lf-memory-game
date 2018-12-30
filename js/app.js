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

let firstCard = null, secondCard = null, fcli = null, scli = null;

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

function createGrid(){
    shuffleArray = shuffle(cardsArray)
    $(shuffleArray).each(function (){
        $('.deck').append('<li class ="card"><i class="fa ' + this + '"></i></li>')
    })
}

createGrid();

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
            showSymbol(this);
            /*if ($(this).hasClass('open show')){
                return true;
            }*/
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
            }
        });
    });
}

cardClick();
/*
 * set up the event listener for a card. If a card is clicked:
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
