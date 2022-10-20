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

// Bônus cronômetro

    const stopWatch = setInterval(() => {             
        sec++
        counter.innerHTML = `00:0${sec%60}`
        if (sec > 9) {
            counter.innerHTML = `00:${sec%60}`
                } 
        if ( sec >= 60 ) {    
            min = parseInt(sec/60)                          
            counter.innerHTML = `0${min}:${sec%60}`    
            console.log(min)        
        } if (min > 9) {
            counter.innerHTML = `${min}:${sec%60}` 
        } if (min === 60) {
            clearInterval(stopWatch)
            counter.innerHTML = `59:59`
        }
        
    }, 1000)

/*
Função para verificar virar as cartas clicadas e verificar dois casos:
caso 1: se as cartas forem iguais,deixa as cartas viradas e desabilita o eventode clique para que elas não façam mais parte do jogo;
caso 2: se as cartas foram diferentes, espera 1 segundo e "desvira" as cartas
*/



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
    console.log(acabou());
    console.log("endgame " + endGame)

  
    
    
    if (acabou() === true && endGame === true) {
        setTimeout(() => {
            if (min < 1) {
                console.log('acabou')
                alert(`Você ganhou em ${countPlays} jogadas e demorou ${sec%60} segundos!`);            
            } else if (min >= 1) {
                alert(`Você ganhou em ${countPlays} jogadas e demorou ${min} min e ${sec%60} segundos!`); 
            }
        }, 500);

        

      
        setTimeout(()=> {     
            console.log('jogar aghain')   
            
            do {
                playAgain = prompt("Quer jogar de novo?")  
                if (playAgain !== 'sim' && playAgain !== 'não') {
                    alert('Digite sim ou não')
                }
            } while (playAgain !== 'sim' && playAgain !== 'não') 
            
            
            if (playAgain === 'sim' && endGame === true) {                
                 newArray = [];
                 cardNumber = 0;
                 isFlipped = false;
                 card_1, card_2;
                 countPlays = 0;
                 endGame = false;        
                 console.log("endgame" + endGame) ;       
                 container.innerHTML =''                 
                 min = 0
                 sec = 0       
                 counter.innerHTML = `0${min}:0${sec}`          
                 setInterval(stopWatch, 1000)
                 selectCardsNumber();4
                 console.log(cards);                 
            } else if (playAgain === 'não') {
                alert('Até a próxima :D')
                container.innerHTML = ""
                clearInterval(stopWatch)
            }
        }, 1000)

    }
 }

 

 // Função para verificar se o jogo acabou

 function acabou() {
    for(let i = 0; i < cards.length; i++) {
        if (!cards[i].classList.contains('turnCard'))        
        return false;     
        endGame = true;               
    }
       
    return true;
    
}



