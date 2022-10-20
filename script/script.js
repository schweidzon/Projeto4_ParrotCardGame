const container = document.querySelector('.container-cards');
const array = [('./images/bobrossparrot.gif'), ('./images/bobrossparrot.gif'), ('./images/explodyparrot.gif'), ('./images/explodyparrot.gif'), ('./images/fiestaparrot.gif'), ('./images/fiestaparrot.gif'), ('./images/metalparrot.gif'), ('./images/metalparrot.gif'), ('./images/revertitparrot.gif'), ('./images/revertitparrot.gif'), ('./images/tripletsparrot.gif'), ('./images/tripletsparrot.gif'), ('./images/unicornparrot.gif'), ('./images/unicornparrot.gif')];
const counter = document.querySelector('.stopWatch')
let newArray = [];
let cardNumber;
let playAgain;
let isFlipped = false;
let card_1, card_2;
let countPlays = 0;
let endGame = false;
let sec = 0;
let min = 0;


window.onload = selectCardsNumber();


let cards = document.querySelectorAll('.card');




// Função para selecionar o número de cartas para o jogo e embaralha-las

function selectCardsNumber() {
    
    do {
        cardNumber = prompt('Numero de cartas'); 
        if ( cardNumber < 4 || cardNumber > 14 || cardNumber%2!==0) {
            alert('Quantidade de cartas inválida!')
        }   
    } while (cardNumber < 4 || cardNumber > 14 || cardNumber%2!==0)    
    
    for (let i = 0; i < cardNumber; i++) {
        newArray.push(array[i]);  
        function comparador() { 
            return Math.random() - 0.5; 
        }
        newArray.sort(comparador);      
    }

    for (let i = 0; i < cardNumber; i++) { 
        container.innerHTML +=
        `
           <div class="card" onclick="flipCard(this)" >                
           <img class="front-face" src="./images/back.png" alt="">
           <img class="back-face" src="${newArray[i]}" alt="">                              
           </div> 
       `
    }       
   
}







 function flipCard(card) {
   
    card.classList.add('turnCard')
    cards = document.querySelectorAll('.card');
    console.log(cards)

    if (isFlipped === false) {
        card_1 = card;
        isFlipped = true;      
        countPlays++;        
      
    } else {
        isFlipped = false;
        card_2 = card;  
        countPlays++;           

        if (card_1.innerHTML === card_2.innerHTML) {
            card_1.onclick = null;
            card_2.onclick = null; 
            console.log('achou');
                    
        } else {
            setTimeout(()=> {
                card_1.classList.remove('turnCard');
                card_2.classList.remove('turnCard');

            }, 1000);
        }       
    } 
    
    
 }

 

