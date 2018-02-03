/*
 * Create a list that holds all of your cards
 */
var initcards=[
    '<li class="card"><i class="fa fa-diamond"></i></li>',
    '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
    '<li class="card"><i class="fa fa-anchor"></i></li>',
    '<li class="card"><i class="fa fa-bolt"></i></li>',
    '<li class="card"><i class="fa fa-cube"></i></li>',
    '<li class="card"><i class="fa fa-leaf"></i></li>',
    '<li class="card"><i class="fa fa-bicycle"></i></li>',
    '<li class="card"><i class="fa fa-bomb"></i></li>',
    '<li class="card"><i class="fa fa-diamond"></i></li>',
    '<li class="card"><i class="fa fa-paper-plane-o"></i></li>',
    '<li class="card"><i class="fa fa-anchor"></i></li>',
    '<li class="card"><i class="fa fa-bolt"></i></li>',
    '<li class="card"><i class="fa fa-cube"></i></li>',
    '<li class="card"><i class="fa fa-leaf"></i></li>',
    '<li class="card"><i class="fa fa-bicycle"></i></li>',
    '<li class="card"><i class="fa fa-bomb"></i></li>'
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

drawCards();

function drawCards(){
    var randomarray = shuffle(initcards);
    if(document.getElementById("deck").childNodes.length > 0){
        document.getElementById("deck").innerHTML="";
    }
    randomarray.forEach(function(element) {
        document.getElementById("deck").innerHTML+=element;
    });
    moveSteps=0;
    document.getElementById("starRating").innerHTML=moveSteps;
    timeinseconds=0;
     document.getElementById("stars").innerHTML="";
     document.querySelectorAll(".winningGame")[0].style.display="none";
      for(var i=0;i<3;i++){
         
            document.getElementById("stars").innerHTML+='<li><i class="fa fa-star"></i></li> ';
        }
    setupEventListener();
}



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

var cardList=[];
function setupEventListener(){
    var el=document.getElementById("deck").childNodes;
        //console.log(el)
        //console.log(el[1])

        el.forEach(function(element) {
        element.addEventListener('click', function () {
            //console.log(this);
            if(! this.classList.contains("match")&&! this.classList.contains("open")){
                this.classList.add("show");
                this.classList.add("open");
                starRating();
                //add card to list
                //check if it has another one
               // console.log(cardList.length);
                if(cardList.length==0){
                cardList.push(this);
                }else if(cardList.length==1){
                    //if the list contain one element
                    //console.log(this);
                    cardList.push(this);
                    if(checkSimilarity(cardList)){
                        //console.log("Yes, similar");
                        lockCard(cardList);
                        cardList=[];
                    }else{
                        //console.log("No, not similar");
                        errorCard()
                        setTimeout(function(){ 
                            unlockCard();
                            cardList=[];
                        }, 500);
                    }
                }
            }
        });
    });

}

function checkSimilarity(array){
    //beacuse they will always be 2
    return (array[0].firstChild.classList.value==array[1].firstChild.classList.value);
}

function lockCard(){
        var el=document.getElementById("deck").childNodes;
        

        el.forEach(function(element) {
            if(element.classList.contains("show")){
                element.classList.remove("show");
                element.classList.add("match");
            }
        });
        if(document.querySelectorAll('.match').length==16){
          document.querySelectorAll(".winningGame")[0].style.display="block";
          document.getElementById("starRatingReport").innerHTML=0;
          document.getElementById("starsReport").innerHTML=moveSteps;
          document.getElementById("secondsreport").innerHTML=timeinseconds;
        }
}

function unlockCard(){
        var el=document.getElementById("deck").childNodes;
        

        el.forEach(function(element) {
           if(! element.classList.contains("match")){
                            element.classList.remove("show");
                             element.classList.remove("open");
                             element.classList.remove("error");
                        }
        });
}

function errorCard(){
    var el=document.getElementById("deck").childNodes;
        el.forEach(function(element) {
           if((! element.classList.contains("match")) &&(element.classList.contains("open"))){
                element.classList.add("error");
            }
        });
}

var moveSteps=0;
function starRating(){
   
    moveSteps+=1;
    document.getElementById("starRating").innerHTML=moveSteps;
     
      
   
    if(moveSteps>6){
          document.getElementById("stars").innerHTML="";
          document.getElementById("stars").innerHTML+='<li><i class="fa fa-star"></i></li> ';
          document.getElementById("stars").innerHTML+='<li><i class="fa fa-star"></i></li> ';
          document.getElementById("stars").innerHTML+='<li><i class="fa fa-star-o"></i></li> ';
    }
    if(moveSteps>10){
          document.getElementById("stars").innerHTML="";
          document.getElementById("stars").innerHTML+='<li><i class="fa fa-star"></i></li> ';
          document.getElementById("stars").innerHTML+='<li><i class="fa fa-star-o"></i></li> ';
          document.getElementById("stars").innerHTML+='<li><i class="fa fa-star-o"></i></li> ';
    }
}
var timeinseconds=0;



window.setInterval(function(){
  document.getElementById("runtimer").innerHTML="";
document.getElementById("runtimer").innerHTML=timeinseconds;
timeinseconds++;
}, 1000);