// VARIABELEN // 
const pagina1 = document.querySelector("#pagina1");
const pagina2 = document.querySelector("#pagina2");
const pagina3 = document.querySelector("#pagina3");
const pagina4 = document.querySelector("#pagina4");

const startKnop = document.querySelector("#start");
const leeftijdInput = document.querySelector("#leeftijdInput");

const toby = document.querySelector("#toby");
const beker = document.querySelector("#beker");
const jello = document.querySelector("#jello");
const tanden = document.querySelector("#tanden");

const melding = document.querySelector("#meldingP");
const seconden = document.querySelector("#sec");

const michaelMad = document.querySelector("#michael1");
const michaelHappy = document.querySelector("#michael2");

const toeter = document.querySelector("#toeter");
const confettiA = document.querySelector("#confetti");
const confettiB = document.querySelector("#confetti2");

const lamp = document.querySelector("#lamp1");

const opnieuw = document.querySelector("#opnieuw");

const items = [toby, beker, jello, tanden];

let itemsAantal = items.length;
let timerInterval;

/* 
Bron audio: Eakin, N. (2021, December 16). Adding Sound to Your JS Web App - Noah Eakin - Medium. Medium. 
https://noaheakin.medium.com/adding-sound-to-your-js-web-app-f6a0ca728984 
*/
let geluid = new Audio('./sound/no-sound.mp3');
let geluidHappy = new Audio('./sound/sound2.mp3');
let geluidEnd = new Audio('./sound/sound3.mp3');
let geluidGameOver = new Audio('./sound/game-over.mp3');
let geluidPrisonMike = new Audio('./sound/prison-mike.mp3');

let lampStatus = false;

let tijd = 15;

let leeftijd;




// FUNCTIONS // 

function pagina() {
    // Bron input: https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value // 
    // Gebruiker typt zijn leeftijd in, als hij jonger is dan 15 en ouder dan 99, geen toegang. Tussen in wel //
    leeftijd = parseInt(leeftijdInput.value);
    if (leeftijd >= 15 && leeftijd <= 99) {
        pagina1.style.display = "none";
        pagina2.style.display = "block";
        geluid.play();
        geluidPrisonMike.pause();
        startTimer();
    } else if (leeftijd > 99) {
        alert("Je bent te oud om te spelen en Michael houd niet van BOOMERS... jammer");
    } else {
        alert("Je bent te jong om door te gaan, jammer...");
    }
}

function schakelLamp() {
    if (lampStatus) {
        lamp.src = "images/lamp1.png";
        lampStatus = false;
    } else {
        lamp.src = "images/lamp2.png";
        lampStatus = true;
        geluidPrisonMike.play();
    }
}

function startTimer() {
    timerInterval = setInterval(() => {
        tijd--;
        seconden.textContent = `Nog ${tijd} seconden`; // Hulp van docent Lisette, arrays //
        if (tijd < 0) {
            clearInterval(timerInterval);
            alert("Tijd is om... je moet opnieuw beginnen");
            pagina2.style.display = "none";
            pagina4.style.display = "block";
            geluidGameOver.play();
        }  
    }, 1000);
}

function troepWeg(element) { // Hulp van Julian studentasisstent //
    element.style.display = "none";
    itemsAantal--;
    melding.textContent = `Je hebt nog ${itemsAantal} item(s) te gaan!`; // Hulp van docent Lisette, arrays //
    if (itemsAantal == 0) {
        pagina1.style.display = "none";
        pagina2.style.display = "none";
        pagina3.style.display = "block";
        geluidEnd.play();
        geluidHappy.pause();
        clearInterval(timerInterval);
    } else if (itemsAantal == 1) {
        michaelMad.src = "images/michael2.gif";
        geluidHappy.play();
        geluid.pause();
    }
}

function confetti() {
    confettiA.style.display = "block";
    confettiB.style.display = "block";
}




// EVENT LISTENERS //

startKnop.addEventListener('click', pagina);

leeftijdInput.addEventListener('keydown', function(event) {
    // Hulp van Toria (klasgenoot Staal) // 
    if (event.key === "Enter") {
        pagina();
    }
});

// Hulp van Julian studentasisstent (gebruik gemaakt van arrow function =>) // 
toby.addEventListener('click', () => {
    troepWeg(toby);
});

beker.addEventListener('click', () => {
    troepWeg(beker);
});

jello.addEventListener('click', () => {
    troepWeg(jello);
});

tanden.addEventListener('click', () => {
    troepWeg(tanden);
    
});

opnieuw.addEventListener('click', function () {
    // Bron: https://stackoverflow.com/questions/12564999/onclick-page-go-to-homepage-without-any-absolute-path // 
    // Wanneer op de button geklikt word gaat hij terug naar de home page //
    window.location = 'index.html'; 
});

toeter.addEventListener('click', confetti);

lamp.addEventListener('click', schakelLamp);