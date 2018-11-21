
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

const cards= document.querySelectorAll('.card');
let count= [];
let tempArray= [];
let matchArray= [];
let moves=0;
let match=0;
let newMatchArray;
const reset= document.querySelector('.restart');
const starOne= document.querySelector('.star1');
const starTwo= document.querySelector('.star2');
const starThree= document.querySelector('.star3');
const time= document.querySelector('.timer');
let elementStarOne;
let elementStarTwo;
let elementStarThree;
let startTimer=0;
let clickCount=0;
let timer;
let move= document.querySelector('.moves');;
let messageBox= document.querySelector('.message_Box');
const yes= document.querySelector('.yes_button');
const no= document.querySelector('.no_button');



// function to start the timer when game begins
function startWatch() {
  startTimer +=1;
  time.innerHTML=startTimer+' s';
  timer=setTimeout(startWatch,1000);
  }

// function to count no. of moves and give star-rating
function steps() {

  moves=moves+ 1;
  move.innerHTML=moves;
  if (moves>=26 && moves<36) {
    elementStarOne= starOne.firstElementChild;
    elementStarOne.classList.remove('fa-star');
  }
  else if (moves>=37) {
    elementStarTwo= starTwo.firstElementChild;
    elementStarTwo.classList.remove('fa-star');
  }
}

//function for initializing stars when game is reset
function initialStars() {
  elementStarThree= starThree.firstElementChild;
  elementStarOne= starOne.firstElementChild;
  elementStarTwo= starTwo.firstElementChild;
  if(elementStarOne.className===elementStarThree.className && elementStarTwo.className===elementStarThree.className) {
      //do nothing
   }
  else if (elementStarOne.className!=elementStarTwo.className) {
    elementStarOne.classList.add('fa-star');
  }
  else if (elementStarOne.className!=elementStarThree.className && elementStarTwo.className!=elementStarThree.className) {
    elementStarOne.classList.add('fa-star');
    elementStarTwo.classList.add('fa-star');
  }
}

function shuffling() {
  let shuffleArray=[];
  let deck= document.querySelector('.deck');
  console.log(deck);
  cards.forEach(function(each) {
    shuffleArray.push(each);

  });
  let shuffledArray=shuffle(shuffleArray);

  shuffledArray.forEach(function(each) {
  deck.appendChild(each);
  });

}

function resetTheGame() {
  cards.forEach(function(initial) {
    initial.classList.remove('match','open','show');
  });
  clearTimeout(timer);
  startTimer=0;
  time.innerHTML= 0+' s';
  count= [];
  initialStars();
  moves=0;
  move.innerHTML=0;
  match=0;
  shuffling();
  matchArray=[];



}

function winingMessage(){

  let editMessage= document.querySelector('.edit');

  messageBox.style.display= "block";

  if(moves<25) {
    editMessage.innerText='Congratulations! You Have won the game in '+startTimer+' secs with star rating of 3/3. Do you want to play again';

  }
  else if (moves>=26 && moves<=36) {
  editMessage.innerText='Congratulations! You Have won the game in '+startTimer+' secs with star rating of 2/3. Do you want to play again';
  }
  else if (moves>=37) {
    editMessage.innerText='Congratulations! You Have won the game in '+startTimer+' secs with star rating of 1/3. Do you want to play again';
  }

  clearTimeout(timer);
}

shuffling();

//this part is to open cards and if a pair of two cards  matches then it will remains open and if not then it will close back
cards.forEach(function(each) {
    each.addEventListener('click',function() {        //event listener is used for each cards
      if(count.length===0) {
        setTimeout(startWatch,1000);                  // the timer will start
      }
      count[0]=1;                                     // placed a random number in 0th index of array, it is placed so that the timer runs effectively
      count.push(each);                               //when a click happens then a card will be pushed to array 'count'
      if (count.length<=3) {                          // now at length 3 there will be three elements one is '1' and other two are cards
        each.classList.add('show','open');            // opens two cards
        if (count[1]===count[2]) {                    // check whether a card is clicked twice
          count.pop(each);                            // if it clicked twice then one card will be pop from array
        }
      }
      if (count.length===3) {
        const firstCard= count[1];                     // assigning the value of 1st index of array to variable 'firstCard'
        const secondCard= count[2];                    // assigning the value of 2nd index of array to variable 'secondCard'
        const firstCardChild= firstCard.firstElementChild;    // storing the first child element of firstCard in firstCardChild variable
        const secondCardChild= secondCard.firstElementChild;  // storing the first child element of secondCard in secondCardChild variable

        //here the in the if statement the cards will be closed if they are not matched
        if (firstCardChild.className!=secondCardChild.className) {
            if(firstCard.className.length===14 && secondCard.className.length===14) {
              setTimeout(function () {
                firstCard.classList.remove('show','open');
                secondCard.classList.remove('show','open');
              },300);
              steps();                                                             //this function is used to count moves
            }
          }

        // here the matched cards will be remain open
        else {
          firstCard.classList.add('match');
          secondCard.classList.add('match');
          tempArray.push(firstCard);        //matched cards are pushed in tempArray
          tempArray.push(secondCard);

          // this will make sure the winning message appears after all matched cards are opened
          if(tempArray.length===2) {
            if(matchArray.length===0) {
              matchArray.push(tempArray[0]);    //the elements of tempArray are pushed in matchArray
              matchArray.push(tempArray[1]);
              steps();
              tempArray.pop();        // elements in tempArray are popped out
              tempArray.pop();
            }
            else if(matchArray.length>0) {
              let checkFirstCard= matchArray.includes(tempArray[0]);          //includes method is used in array
              let checkSecondCard= matchArray.includes(tempArray[1]);
                if(checkFirstCard===true && checkSecondCard===true ) {
                  tempArray.pop();
                  tempArray.pop();
                }
                else if(checkFirstCard===true && checkSecondCard===false) {
                  tempArray.splice(0,1);
                  matchArray.push(tempArray[1]);
                }
                else if(checkSecondCard===false && checkSecondCard===true) {
                  tempArray.pop();
                  matchArray.push(tempArray[0]);
                }
                else if(checkFirstCard===false && checkSecondCard===false) {
                  matchArray.push(tempArray[0]);
                  matchArray.push(tempArray[1]);
                  tempArray.pop();
                  tempArray.pop();
                  if(matchArray.length%2===0) {
                    steps();
                  }
                }
            }
          }
      }
        if(matchArray.length===16) {
          setTimeout(function () {
              winingMessage();                                 //wining message will appear after the game finishes
          },150);
        }
        count.pop(each);
        count.pop(each);
      }
    });
  });

reset.addEventListener('click', resetTheGame);                // event listener (click) is used for reset button


// the below event listener is for YES and NO buttons in wining message
yes.addEventListener('click', function() {
  messageBox.style.display= 'none';
  resetTheGame();
});

no.addEventListener('click',function(){
  messageBox.style.display= 'none';

});
