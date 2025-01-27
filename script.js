import { questionsCars,questionsMotorBike,questionsBoat } from "./data.js";

const BackgroundElement = document.getElementById("Background")
const Menu = document.querySelector(".Menu");
const carButton = document.getElementById("btn-icon-car")
const iconecar = document.getElementById("icon-car");
const boatButton = document.getElementById("btn-icon-boat")
const iconeboat = document.getElementById("icon-boat");
const motoButton = document.getElementById("btn-icon-moto")
const iconemoto = document.getElementById("icon-moto");
var quizMode = "";
var questions = [];



var currentQuestionIndex = 0;
var Score = 0;

// Timer for each questions
var timer;
const StartButton = document.getElementById("btn-icon-logo")
StartButton.disabled = true;

StartButton.addEventListener('click', () => {
    startQuiz()
});

carButton.addEventListener('click', () => {
    iconecar.src = "Ressources/iconecarO.png";
    iconeboat.src = "Ressources/iconebateau.png";
    iconemoto.src = "Ressources/iconemoto.png";
    if(!carButton.classList.contains("select")){
        carButton.classList.add("select");
        console.log("voiture");
    }
    if(motoButton.classList.contains("select")){
        motoButton.classList.remove("select");
    }
    if(boatButton.classList.contains("select")){
        boatButton.classList.remove("select");
    }
    setQuizMode("code auto")
    StartButton.disabled = false;
});

boatButton.addEventListener('click', () => {
    iconecar.src = "Ressources/iconecar.png";
    iconeboat.src = "Ressources/iconebateauO.png";
    iconemoto.src = "Ressources/iconemoto.png";
    if(carButton.classList.contains("select")){
        carButton.classList.remove("select");
    }
    if(motoButton.classList.contains("select")){
        motoButton.classList.remove("select");
    }
    if(!boatButton.classList.contains("select")){
        boatButton.classList.add("select");
        console.log("bateau");
    }
    setQuizMode("code bateau")
    StartButton.disabled = false;
});

motoButton.addEventListener('click', () => {
    iconecar.src = "Ressources/iconecar.png";
    iconeboat.src = "Ressources/iconebateau.png";
    iconemoto.src = "Ressources/iconemotoO.png";
    if(carButton.classList.contains("select")){
        carButton.classList.remove("select");
    }
    if(!motoButton.classList.contains("select")){
        motoButton.classList.add("select");
        console.log("moto");
    }
    if(boatButton.classList.contains("select")){
        boatButton.classList.remove("select");
    }
    setQuizMode("code moto")
    StartButton.disabled = false;
});




function setQuizMode(value){
    quizMode = value;
}

function startQuiz(){
    currentQuestionIndex = 0;
    Score = 0;
    if(quizMode == "code auto"){
        questions = questionsCars;
    }else if(quizMode == "code bateau"){
        questions = questionsBoat;
    }else if(quizMode == "code moto"){
        questions = questionsMotorBike;
    }

    shuffleArray(questions);
    questions.forEach(q =>{ 
        q.reponse = shuffleArray(q.reponse);
    })
    Menu.classList.add("hide")
    showQuestion();


}

function BackMenu(){
    let resultatContainer = document.querySelector(".result-container");
    resultatContainer.remove();

    let allApp = document.querySelectorAll(".app");

    Array.from(allApp).forEach(app =>{
        app.remove();
    })


    Menu.classList.remove("hide");
}

var CounterTime;

function showQuestion(){
    createQuizApp();
    CounterTime = 5;
    let counterTime = document.querySelectorAll(".circle2")[currentQuestionIndex];
    counterTime.textContent = CounterTime;
    timer = setInterval(() => {
        CounterTime --;
        counterTime.textContent = CounterTime;

        if(CounterTime === 0){
            VerifAnswer();
            hideapp();
            clearInterval(timer);
            handleNextButton();
            counterTime.textContent = currentQuestionIndex;
        }
    }, 1000);
    //videoQuiz
    let video = document.getElementById("videoQuiz "+ currentQuestionIndex );
    if(video != null){
        video.play().catch((error) => {
            console.error("Impossible de démarrer la vidéo :", error);
        }); 
    }

}
// shuffleAnswer
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}

function selectAnswer(e){
    const selectBtn = e.target;
    let sss = document.querySelectorAll("#answer-buttons")[currentQuestionIndex]
    console.log(sss);
    if(selectBtn.classList.contains("check")){
        selectBtn.classList.remove("check");
    }else{
        selectBtn.classList.add("check");
    }
    Array.from(sss.children).forEach(button =>{
        if(button.classList.contains("check") && button != selectBtn ){
            button.classList.remove("check");
        }
    })
}


function VerifAnswer(){
    let sss = document.querySelectorAll("#answer-buttons")[currentQuestionIndex]
    Array.from(sss.children).forEach(button =>{
        if(button.dataset.correct === "true" && button.classList.contains("check")){
            button.classList.remove("check");
            button.classList.add("correct");
            Score++;
        }
        else if(button.dataset.correct === "true" && !button.classList.contains("check")){
            button.classList.remove("check");
            button.classList.add("correct");
        }
        else if( button.classList.contains("check")){
            button.classList.remove("check");
            button.classList.add("incorrect");
        }
        button.disabled = true;
    })
}

function hideapp(){
    let currentapp = document.getElementById("app "+currentQuestionIndex);
    currentapp.classList.add("hide");
}

function removeIndex(){
    if(currentQuestionIndex > 0){
        currentQuestionIndex--;
    }
}
function addIndex(){
    if(currentQuestionIndex < 1){
        currentQuestionIndex++;
    }
}

function CurrentQuestion(){
    let allApp = document.querySelectorAll(".app")
    Array.from(allApp).forEach(app =>{
        if(!(app.classList.contains("hide"))){
            app.classList.add("hide");
        }
    })
    let currentapp = allApp[currentQuestionIndex]
    if(currentapp != null){
        currentapp.classList.remove("hide");
    }

}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        displayTestResult(Score)
        currentQuestionIndex = 0;
    }
}





function createQuizApp() {
    /////////////////////////
    let currentQuestion = questions[currentQuestionIndex]
    const videoImage = document.createElement('div');
    videoImage.className = 'VideoImage';
    const video = document.createElement('video');
    video.muted = true;
    video.id = 'videoQuiz '+currentQuestionIndex;
    video.className = 'videoQuiz';

    const source = document.createElement('source');
    source.src = currentQuestion.video;
    source.type = 'video/mp4';
    video.appendChild(source);


    
    const image = document.createElement('img');
    image.id = 'imageQuiz';
    image.className = 'imageQuiz';
    image.alt = 'Image indisponible';
    image.src = currentQuestion.image;
    if(currentQuestion.video){
        videoImage.appendChild(video);
    }
    else if(currentQuestion.image){
        videoImage.appendChild(image);
    }



    // Créer le conteneur principal
    const app = document.createElement('div');
    app.id = 'app '+ currentQuestionIndex;
    app.className = 'app';

    // Ajouter la barre supérieure
    const modeTest = document.createElement('div');
    modeTest.id = 'mode-test';
    modeTest.className = 'blackline topcorner';
    modeTest.textContent = quizMode;
    app.appendChild(modeTest);

    // Ajouter la section vidéo et image
    app.appendChild(videoImage);

    // Ajouter l'indice de la question
    const indexQuestion = document.createElement('div');
    indexQuestion.id = 'index-question';
    indexQuestion.className = 'blacklineR';
    indexQuestion.textContent = (currentQuestionIndex + 1) +'/40';
    app.appendChild(indexQuestion);

    // Ajouter la section quiz
    const quiz = document.createElement('div');
    quiz.className = 'quiz';

    const question = document.createElement('h2');
    question.id = 'question';

    const circle = document.createElement('div');
    circle.className = 'circle';
    // Counter Time
    const circle2 = document.createElement('div');
    circle2.id = 'circle2';
    circle2.className = 'circle2';
    circle.appendChild(circle2);

    question.appendChild(circle);
    question.appendChild(document.createTextNode('Que signifie un panneau de limitation de vitesse affichant 60 ?'));
    quiz.appendChild(question);

    // Ajouter les boutons de réponses
    const answerButtons = document.createElement('div');
    answerButtons.id = 'answer-buttons';



    let indexAnswer = 0;
    let indexLetter;
    currentQuestion.reponse.forEach(answer => {
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
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click",selectAnswer)

    });

    quiz.appendChild(answerButtons);





    // Element
    const Button = document.createElement('div');
    Button.className = 'NextButton hide';
    Button.id = 'NextButton'

    const nextButton = document.createElement('button');
    nextButton.className = 'btn-with-icon';

    const imageButton = document.createElement('img');
    imageButton.className = 'btn-icon';
    imageButton.src = 'Ressources/left-arrow.png'
    imageButton.alt = 'Icone';

    const nextButton2 = document.createElement('button');
    nextButton2.className = 'btn-with-icon';

    const imageButton2 = document.createElement('img');
    imageButton2.className = 'btn-icon';
    imageButton2.src = 'Ressources/right-arrow.png'
    imageButton2.alt = 'Icone';

    nextButton.addEventListener("click", () => {
        removeIndex()
        CurrentQuestion()
    });

    nextButton2.addEventListener("click", () => {
        addIndex()
        CurrentQuestion()
    });


    nextButton.appendChild(imageButton)
    Button.appendChild(nextButton)

    nextButton2.appendChild(imageButton2)
    Button.appendChild(nextButton2)






    quiz.appendChild(Button);
    app.appendChild(quiz);

    // Ajouter l'application au corps du document
    BackgroundElement.appendChild(app);
}

// Appeler la fonction pour générer l'interface

function displayTestResult(score) {
    // Conteneur principal
    const resultContainer = document.createElement('div');
    resultContainer.className = 'result-container';

    let button = document.querySelectorAll("#NextButton")
    button.forEach((button)=>{
        button.classList.remove("hide")
    })

    // Afficher le score
    const scoreText = document.createElement('p');
    scoreText.className = 'score-text';
    scoreText.textContent = `Votre score : ${score}/40`;
    resultContainer.appendChild(scoreText);

    // Déterminer l'icône et le message en fonction du score
    const icon = document.createElement('div');
    icon.className = 'result-icon';
    const message = document.createElement('p');
    message.className = 'result-message';

    if (score >= 35) {
        // Réussite (80% ou plus)
        icon.textContent = '🎉'; // Icône de réussite
        message.textContent = 'Félicitations ! Vous avez réussi le test.';
    } else if (score >= 20) {
        // Moyenne (50-79%)
        icon.textContent = '🙂'; // Icône moyenne
        message.textContent = 'Bon effort ! Continuez à vous entraîner.';
    } else {
        // Échec (moins de 50%)
        icon.textContent = '😔'; // Icône échec
        message.textContent = 'Dommage, vous pouvez faire mieux. Réessayez !';
    }

    resultContainer.appendChild(icon);
    resultContainer.appendChild(message);

    // Ajouter un bouton pour réessayer ou continuer
    const retryButton = document.createElement('button');
    retryButton.className = 'retry-btn';
    retryButton.textContent = 'Retour au Menu';
    retryButton.addEventListener('click', () => {
        // Action sur clic du bouton (par exemple, recharger la page ou redémarrer le test)
        //location.reload();
        BackMenu();
    });
    const resultButton = document.createElement('button');
    resultButton.className = 'result-btn';
    resultButton.textContent = 'Afficher les resultat';
    resultButton.addEventListener('click', () => {
        // Action sur clic du bouton (par exemple, recharger la page ou redémarrer le test)
        CurrentQuestion();
    });
    resultContainer.appendChild(retryButton);
    resultContainer.appendChild(resultButton);

    // Ajouter le conteneur au corps du document
    BackgroundElement.appendChild(resultContainer);
}

// Exemple d'appel
//displayTestResult(40);


