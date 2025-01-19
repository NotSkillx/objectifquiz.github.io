import { questionsCars,questionsMotorBike,questionsBoat } from "./data.js";



const questionElement = document.getElementById("question");
const reponseElement = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")
const videoElement = document.getElementById("videoQuiz")
const imageElement = document.getElementById("imageQuiz")
const appElement = document.getElementById("app")
var quizMode = "Voiture";
var questions = [];


var currentQuestionIndex = 0;
var Score = 0;

// Timer for each questions
var timer;
var sec = 0;
var timeLeft = 10;


function startQuiz(){
    currentQuestionIndex = 0;
    Score = 0;
    nextButton.innerHTML = "Suivant";
    if(quizMode == "Voiture"){
        questions = questionsCars;
    }else if(quizMode == "Bateau"){
        questions = questionsBoat;
    }else if(quizMode == "Moto"){
        questions = questionsMotorBike;
    }

    shuffleArray(questions);
    questions.forEach(q =>{ 
        q.reponse = shuffleArray(q.reponse);
    })

    showQuestion();


}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    if(currentQuestion.video){
        imageElement.style.display = "none";
        videoElement.style.display = "block";
        videoElement.src = currentQuestion.video ;

    }else if(currentQuestion.image){
        imageElement.style.display = "block";
        videoElement.style.display = "none";
        imageElement.src = currentQuestion.image
    }
    else{
        imageElement.style.display = "none";
        videoElement.style.display = "none";
    }
    let indexAnswer = 0;
    currentQuestion.reponse.forEach(answer => {
        let indexLetter;
        if(indexAnswer < 4){
            indexAnswer++;
            if(indexAnswer == 1){
                indexLetter = "A. "
            }else if(indexAnswer == 2){
                indexLetter = "B. "
            }else if(indexAnswer == 3){
                indexLetter = "C. "    
                
            }else if(indexAnswer == 4){
                indexLetter = "D. "
            }
        }

        const button = document.createElement("button");
        button.innerHTML = indexLetter + answer.text;
        button.classList.add("btn");
        reponseElement.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click",selectAnswer)
    });


    if(currentQuestion.video){
        videoElement.play().catch((error) => {
            console.error("Lecture automatique échouée :", error);
        });
    }

    // Intervalle tout les 1 seconde 
    // Fin tout les x secondes
    /*
    sec = 0;
    timer = setInterval(() => {
        sec++;
        console.log(sec); // Affiche la valeur de sec chaque seconde
        if(sec === timeLeft){
            clearInterval(timer);
            handleNextButton();
            console.log("Intervalle arrêté !");
        }
    }, 1000);*/

    //setTimeout(() => {
    //    clearInterval(timer);
    //    handleNextButton();
    //    console.log("Intervalle arrêté !");
    //}, 6000);


}
// shuffleAnswer
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

function resetState(){
    nextButton.style.display = "none";
    while(reponseElement.firstChild){
        reponseElement.removeChild(reponseElement.firstChild)
    }
}
function resetElement(){
    imageElement.style.display = "none";
    videoElement.style.display = "none";
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        Score++;
    }else{
        selectBtn.classList.add("incorrect");
    }
    Array.from(reponseElement.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block"
}

nextButton.addEventListener("click",()=>{
    console.log(questions.length)
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
        //console.log("plus de question")
    }
})

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
        console.log("plus de question")

    }
}

function showScore(){
    resetState();
    resetElement();
    questionElement.innerHTML = `You scored ${Score} out of 40!`
    nextButton.innerHTML = "Recommencer";
    nextButton.style.display = "block"
}



startQuiz()



console.log(questions)

// html file
//<button class ="btn">Answer 1</button>
//<button class ="btn">Answer 2</button>
//<button class ="btn">Answer 3</button>
//<button class ="btn">Answer 4</button>
// video/mp4
//videoElement.play();
// <h1>OBJECTIF QUIZZ</h1>





