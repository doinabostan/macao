window.onload = init


var cardsYou = []
var cardsComp = []
var board = []
var cardsLeft = []


// document.querySelector(".btn-roll").addEventListener("click", playCards)
document.querySelector(".btn-new-card").addEventListener("click", addCard)




function init() {
    var cards = ["01_c", "01_in", "01_ir", "01_t", "02_c", "02_in", "02_ir", "02_t", "03_c", "03_in", "03_ir", "03_t", "04_c", "04_in", "04_ir", "04_t", "05_c", "05_in", "05_ir", "05_t", "06_c", "06_in", "06_ir", "06_t", "07_c", "07_in", "07_ir", "07_t", "08_c", "08_in", "08_ir", "08_t", "09_c", "09_in", "09_ir", "09_t", "10_c", "10_in", "10_ir", "10_t", "11_c", "11_in", "11_ir", "11_t"]


    //shuffle array
    shuffleArray(cards)

    //split the cards into 4 arrays
    var splice1 = cards.splice(0, 5)
    var splice2 = cards.splice(0, 5)
    var splice3 = cards.splice(0, 1)
    for (var x = 0; x < splice1.length; x++) {
        cardsYou.push(splice1[x]);
        cardsComp.push(splice2[x]);
    }
    board.push(splice3[0]);
    cardsLeft = cards


    displayCards()
    selectCard()
}


function displayCards() {

    //grab the divs where i'll display the cards 
    var displayYou = document.querySelector("#score-1")
    displayYou.innerHTML = ""
    var displayComp = document.querySelector("#score-0")
    displayComp.innerHTML = ""
    var displayBoard = document.querySelector(".board")
    displayBoard.innerHTML = ""

    //display cards for you

    if (cardsYou.length > 0) {
        for (var i = 0; i < cardsYou.length; i++) {
            displayYou.innerHTML += '<img src="img/' + cardsYou[i] + '.png" id="' + cardsYou[i] + '">'


        }
    } else {
        displayYou.innerHTML = "YOU WIN!!!!!!"
        displayComp=""
    }

    //arrange your cards

    var img = document.querySelectorAll("#score-1 img")
    for (var x = 0; x < img.length; x++) {

        if (cardsYou.length > 9) {
            img[x].style.marginLeft = "-50px";
            img[0].style.marginLeft = "0px";
        }
        if (cardsYou.length > 14) {
            img[x].style.marginLeft = "-80px";
            img[0].style.marginLeft = "0px";
        }

    }

    //display cards for computer
    if (cardsComp.length > 0) {
        for (var i = 0; i < cardsComp.length; i++) {
            var nr = cardsComp[i].split("_")[0]
            var smn = cardsComp[i].split("_")[1]
            displayComp.innerHTML += '<img src="img/back.png" data-number=' + nr + '  data-semn=' + smn + '>'

        }
    } else {
        displayComp.innerHTML = "COMPUTER WINS!!!!!!";
        displayYou=""
    }
    //display card for the board

    displayBoard.innerHTML = '<img src="img/' + board[0] + '.png">'


    //arrange computer's cards

    var img2 = document.querySelectorAll("#score-0 img")
    for (var x = 0; x < img.length; x++) {

        if (cardsComp.length > 9) {
            img2[x].style.marginLeft = "-50px";
            img2[0].style.marginLeft = "0px";
        }
        if (cardsComp.length > 14) {
            img2[x].style.marginLeft = "-80px";
            img2[0].style.marginLeft = "0px";
        }

    }


}

function selectCard() {

    //add class "select" for your cards when chick on them
    var imagini = document.querySelectorAll('#score-1 img')
    for (let i = 0; i < imagini.length; i++) {
        imagini[i].addEventListener("click", function(event) {
            if (document.querySelector('.select') !== null) {
                document.querySelector('.select').classList.remove("select");

            }
            event.target.classList.add("select")
        })
       imagini[i].addEventListener("dblclick", function(event){
       	playCards()
       })
    }
}




function playCards() {

    //find out the number and sign of the board card
    var carteBoard = board[0]
    var carteBoardNumar = carteBoard.split("_")[0]
    var carteBoardSemn = carteBoard.split("_")[1]

    //if there is no selected card is the computer turn

    if (document.querySelector('.select') == null) {
        playComp()
    } else {

        //find out the number and sign of the selected card

        var carteSelectata = document.querySelector('.select').id
        var carteSelectataNumar = carteSelectata.split("_")[0]
        var carteSelectataSemn = carteSelectata.split("_")[1]


        //find out if the card selected match with the board card
        if (carteSelectataNumar == carteBoardNumar || carteSelectataSemn == carteBoardSemn) {
            document.querySelector('.errors').innerHTML = ""

            //move the selected card in the board array		
            var pozitie = cardsYou.indexOf(carteSelectata);
            cardsYou.splice(pozitie, 1)
            board.unshift(carteSelectata)


            displayCards()
            playComp()


        } else {
          //  document.querySelector('.errors').innerHTML = "Selecteaza o carte potrivita"
            displayCards()
            playComp()
        }
    }
}



function shuffleArray(array) {
    for (var x = array.length - 1; x > 0; x--) {
        var holder = Math.floor(Math.random() * (x + 1));
        var itemValue = array[x];
        array[x] = array[holder];
        array[holder] = itemValue;
    }
    return array;
}



function addCard() {

    //move the card from the left array in your cards array 
    cardsYou.push(cardsLeft[0])
    cardsLeft.shift()
   
    displayCards()
   playCards()
}


function playComp() {

    setTimeout(function() {
        
        //find out the number and sign of the board card
        var carteBoard = board[0]
        var carteBoardNumar = carteBoard.split("_")[0]
        var carteBoardSemn = carteBoard.split("_")[1]
		var match = ""
		
	
			//loop through computer cards 
        for (var j = 0; j < cardsComp.length; j++) {

            var nr = cardsComp[j].split("_")[0]
            var semn = cardsComp[j].split("_")[1]

            //find out if board card number match with the number of a computer's card			

            if (nr == carteBoardNumar) {
                match = cardsComp[j]               
                break
            //find out if board card sign match with the sign of a computer's card    
            } else if (semn == carteBoardSemn) {
                match = cardsComp[j];
                break;
            }
        }
	

  
        




		
        //find out the match position 
        var poz = cardsComp.indexOf(match);
        //move the match in the board array 
        if (poz > -1) {
            cardsComp.splice(poz, 1);
            board.unshift(match)
        }

        //if the is no match add a new card from the left array
        if (match == "") {
            cardsComp.push(cardsLeft[0])
            cardsLeft.shift()
        }

        moveCards()


        displayCards()
        selectCard()        
    }, 1000);
}



//hide the popup witn the instructions

function hide() {
	
    document.querySelector(".popup").style.display = 'none'
}

//move the cards from the board to the left array

function moveCards() {

    if (board.length > 10) {
        var center = board.splice(1, board.length - 1);
        shuffleArray(center)
        cardsLeft = cardsLeft.concat(center);
    }

}


function TwoCards(){

	var carteBoard = board[0]
    var carteBoardNumar = carteBoard.split("_")[0]
    var carteBoardSemn = carteBoard.split("_")[1]




}