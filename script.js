let currentQuestionIndex = 0;
let score = 0;

const quizQuestions = [
    {
        question: "Which company developed Windows?",
        options: ["Microsoft", "Apple", "Google"],
        correctAnswerIndex: 0,
        userAnswerIndex: null,
        isCorrect: null
    },
    {
        question: "Which country is known as the Land of the Rising Sun?",
        options: ["Canada", "Iran", "Japan"],
        correctAnswerIndex: 2,
        userAnswerIndex: null,
        isCorrect: null
    },
    {
        question: "Where is Lego land located?",
        options: ["Denmark", "Japan", "USA"],
        correctAnswerIndex: 0,
        userAnswerIndex: null,
        isCorrect: null
    },
    {
        question: "In which country is the Chernobyl nuclear plant located?",
        options: ["Ukraine", "China", "Argentina"],
        correctAnswerIndex: 0,
        userAnswerIndex: null,
        isCorrect: null
    },
    {
        question: "Which game studio makes the Metroid Prime series?",
        options: ["Activision", "EA-games", "Retro Studios"],
        correctAnswerIndex: 2,
        userAnswerIndex: null,
        isCorrect: null
    },
    {
        question: "In Europe, we have one M&M's store. In which city is it located?",
        options: ["London", "Berlin", "Rome"],
        correctAnswerIndex: 0,
        userAnswerIndex: null,
        isCorrect: null
    }];
    const nextButton = document.getElementById("next-button");
    const questionText = document.getElementById("question-text");
    const answerButtonsContainer = document.getElementById("answer-buttons");
    const answerButtons = answerButtonsContainer.querySelectorAll("button");
    const feedbackArea = document.getElementById("feedback-area");

    function renderQuestion(index) {
        const currentQuestion = quizQuestions[index];
        //update question text
        questionText.textContent = currentQuestion.question;
        //Hide feedback and next button for new question
        feedbackArea.textContent = "";
        feedbackArea.classList.add("hidden");
        nextButton.classList.add("hidden");
        nextButton.disabled = true;
        answerSelected = false;

        //Loop through the buttons
        answerButtons.forEach((button, optionIndex) => {
            //Set text content based on data
            button.textContent = currentQuestion.options[optionIndex];
            //Reset all feedback and enabled states
            button.disabled = false;
            button.classList.remove('bg-green-500', 'bg-red-500');
            button.classList.add('bg-amber-500');
        });
    } 

    let answerSelected = false;

    function handleAnswerClick(event) {
        if (!event.target.classList.contains('answer-btn') || answerSelected) {
            return;
        }
        answerSelected = true;

        const selectedButton = event.target;
        const selectedIndex = parseInt(selectedButton.dataset.index);
        const currentQuestion = quizQuestions[currentQuestionIndex];
        const correctAnswerIndex = currentQuestion.correctAnswerIndex;

        //Record the user choice
        currentQuestion.userAnswerIndex = selectedIndex;
        //Check if the answer is correct
        const isCorrect = selectedIndex === correctAnswerIndex;
        currentQuestion.isCorrect = isCorrect;

        selectedButton.classList.remove('bg-amber-500');
        //Update score and provide feedback
        if (isCorrect) {
            score++;
            selectedButton.classList.add('bg-green-500' );
            feedbackArea.textContent = `Excellent, you picked the correct option! 🎉`;
        } else {
            selectedButton.classList.add('bg-red-500');
            const allButtons = answerButtonsContainer.querySelectorAll('.answer-btn');
            const correctButton = allButtons[correctAnswerIndex];
            correctButton.classList.remove('bg-amber-500');
            correctButton.classList.add('bg-green-500');
            feedbackArea.textContent = `Incorrect. The correct answer was: ${currentQuestion.options[correctAnswerIndex]}.`;
            
        }
        feedbackArea.classList.remove("hidden");

        //Disable answer buttons and show next button
        answerButtonsContainer.querySelectorAll('button').forEach(button => {
            button.disabled = true;
        });
        nextButton.classList.remove("hidden");
        nextButton.disabled = false;
    }
    //attach event listener to answer buttons container
    answerButtonsContainer.addEventListener('click', handleAnswerClick);

    function handleNextClick() {
        answerSelected = false;
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizQuestions.length) {
            //render next question
            renderQuestion(currentQuestionIndex);
        } else {
            //End the Quiz and show final score
            showResults();
        }
    }
    nextButton.addEventListener('click', handleNextClick);

    //function to hide the start screen and show the quiz card
    function startQuiz() {
        document.getElementById('start-screen').classList.add('hidden');
        document.getElementById('question-card').classList.remove('hidden');
        renderQuestion(currentQuestionIndex);
    }
    //Event listener for start button
    document.getElementById('start-button').addEventListener('click', startQuiz);

    //function to show final results
    function showResults() {
        //Hide question card and show result screen
        document.getElementById('question-card').classList.add('hidden');
        document.getElementById('result-screen').classList.remove('hidden');
        //Update final score text
        document.getElementById('finalScore').textContent = `Your final score is ${score} out of ${quizQuestions.length}.`;
        const resultContainer = document.getElementById('results-container');
        resultContainer.innerHTML = '';
        quizQuestions.forEach(q => {
            const resultText = q.isCorrect ? '✅ Correct' : '❌ Incorrect';
            //Get user input
            const userAnswerText = q.userAnswerIndex !== null
                                   ? q.options[q.userAnswerIndex]
                                   : 'No Answer';

            //Build result summery item
            const resultItem = `
            <div class="p-4 rounded-lg shadow-md">
                <p class="font-bold mb-1">${q.question}</p>
                <p class="text-sm">Your choice: ${userAnswerText}</p>
                <p class="text-sm font-semibold">Correct Answer: ${q.options[q.correctAnswerIndex]}</p>
                <p class="mt-2 font-extrabold">${resultText}</p>
                </div>
                `;
                resultContainer.innerHTML += resultItem;            
        });
    }

    //Initial state: hide everything but the start screen
    document.getElementById('question-card').classList.add('hidden');
    document.getElementById('result-screen').classList.add('hidden');

    const restartButton = document.getElementById('restart-button');
    const exitButton = document.getElementById('exit-button');
    const startScreen = document.getElementById('start-screen');
    const resultScreen = document.getElementById('result-screen');

    function handleRestartClick() {
        //Reset quiz state
        currentQuestionIndex = 0;
        score = 0;
        answerSelected = false;
        //Reset quiz data
        quizQuestions.forEach(q => {
            q.userAnswerIndex = null;
            q.isCorrect = null;
        });
        //Return to start screen
        resultScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    }
    restartButton.addEventListener('click', handleRestartClick);

    function handleExitClick() {
        document.getElementById('navigation-buttons').classList.add('hidden');
        resultScreen.innerHTML = '<h2 class="text-2xl font-bold mb-4">Quiz Complete! Thank you for participating!</h2><p class="text-lg">You can close the tab or navigate away.</p>';
    }
    exitButton.addEventListener('click', handleExitClick);