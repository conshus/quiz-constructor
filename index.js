let score = 0;
let scorecard = {};
scorecard.correct =[];
function Question (inquiry, answer){
  this.inquiry = inquiry;
  this.uniqueId = this.inquiry.slice(0,this.inquiry.length-1).split(" ").join("");
  this.answer = answer;
}

Question.prototype.insertTemplate = function(eventElement){
  let source = document.querySelector("#ydkjs-quiz-template").innerHTML;
  let template = Handlebars.compile(source);
  let html = template(this);
  document.querySelector(".ydkjs-quiz").insertAdjacentHTML('beforeend',html);
  document.querySelector(eventElement).addEventListener('click', this.isCorrect.bind(this));
}

Question.prototype.correctTemplate = function(guess, answer, inquiry){
  let correctAnswer = "";
  if (guess === answer){
    this.result = "Correct!";
    event.target.style.backgroundColor ="green";
    score += 10;
    scorecard.correct.push({question: inquiry});
  } else {
    this.result = "No sorry!";
    event.target.style.backgroundColor ="red";
    score -= 5;
  }
  let result = document.querySelector("#answer-");
  result.innerHTML = this.result;
  let runningScore = document.querySelector("#score");
  runningScore.innerHTML = score;
  if (score < 0){
    runningScore.style.color = "red";
  } else if (score > 0){
    runningScore.style.color = "green";
  } else {
    runningScore.style.color = "black";
  }
  event.target.parentElement.classList.add("answered")
}

function MultipleChoiceQuestion(inquiry, choices, answer){
  Question.call(this, inquiry, answer);
  this.choices = choices;
}

MultipleChoiceQuestion.prototype = Object.create(Question.prototype);

MultipleChoiceQuestion.prototype.display = function(){
  this.insertTemplate();
  document.querySelector('.ydkjs-quiz .card:last-of-type ul').addEventListener('click', this.isCorrect.bind(this));
};

MultipleChoiceQuestion.prototype.isCorrect = function(event){
  this.correctTemplate(event.target.textContent, this.answer);
};

ShortAnswerQuestion.prototype = Object.create(Question.prototype);

function ShortAnswerQuestion(inquiry, fillIn, answer){
  Question.call(this, inquiry, answer);
  this.fillIn = fillIn;
}

ShortAnswerQuestion.prototype.display = function(){
  this.insertTemplate();
  document.querySelector('.ydkjs-quiz .card:last-of-type .submitButton').addEventListener('click', this.isCorrect.bind(this));
};

ShortAnswerQuestion.prototype.isCorrect = function(event){
  this.correctTemplate(event.target.previousElementSibling.value.toLowerCase(), this.answer.toLowerCase());
};

function ApiQuestion(inquiry, choices, answer){
  Question.call(this, inquiry, answer);
  this.choices = choices;
}

ApiQuestion.prototype = Object.create(Question.prototype);

ApiQuestion.prototype.display = function(){
  this.insertTemplate('.ydkjs-quiz .card:last-of-type ul');
};
ApiQuestion.prototype.isCorrect = function(event){
this.correctTemplate(event.target.textContent, this.answer, this.inquiry);
};

//Questions
let question1 = new MultipleChoiceQuestion (
  "JavaScript is a trademark of which company?",
  [
    "Microsoft",
    "IBM",
    "Oracle",
    "No One (Open Source)"
  ],
"Oracle"
);
let question2 = new MultipleChoiceQuestion (
  "When did JavaScript first appear?",
  [
    "December 4, 1995",
    "March 12, 1993",
    "January 23, 1996",
    "It's always been here."
  ],
"December 4, 1995"
);
let question3 = new MultipleChoiceQuestion (
  "What was JavaScript officially called when first released?",
  [
    "CoffeeScript",
    "LiveScript",
    "Java",
    "Always was JavaScript"
  ],
"LiveScript"
);
let question4 = new MultipleChoiceQuestion (
  "Who wrote the first JavaScript prototype?",
  [
    "Al Gore",
    "Marc Andreessen",
    "Steve Jobs",
    "Brendan Eich"
  ],
"Brendan Eich"
);
let question5 = new MultipleChoiceQuestion (
  "What internet browser first shipped with JavaScript?",
  [
    "Microsoft Internet Explorer",
    "Netscape Navigator",
    "Opera",
    "Safari"
  ],
"Netscape Navigator"
);
let question6 = new ShortAnswerQuestion (
  "JavaScript is a programming",
  "fillIn",
"language"
);
let question7 = new ShortAnswerQuestion (
  "The object which this refers to at any point in code is called that code`s",
  "fillIn",
"context"
);
let question8 = new ShortAnswerQuestion (
  "Use document.[your answer]('<css-selector>') to select all elements that match the query.",
  "fillIn",
"querySelectorAll"
);

//Randomize questions
//let questionsArray = [question1, question2, question3, question4, question5, question6, question7, question8];
//questionsArray.sort(function(a, b){return 0.5 - Math.random()});
//questionsArray.forEach(question => question.display());

//Go to the previous or next question
function nextQuestion(){
  window.scrollBy(0,800);
  let result = document.querySelector("#answer-");
  result.innerHTML = "";
}
function previousQuestion(){
  window.scrollBy(0,-800);
  let result = document.querySelector("#answer-");
  result.innerHTML = "";
}
let totalApiQuestions=[];
function formatQuestions(questionsObject){
  questionsObject.incorrect_answers.push(questionsObject.correct_answer);
  questionsObject.incorrect_answers.sort(function(a, b){return 0.5 - Math.random()});
  totalApiQuestions.push(new ApiQuestion(questionsObject.question, questionsObject.incorrect_answers, questionsObject.correct_answer));
  return new ApiQuestion(questionsObject.question, questionsObject.incorrect_answers, questionsObject.correct_answer);
}
function displayQuestions(questionsArray){
  questionsArray.sort(function(a, b){return 0.5 - Math.random()});
  questionsArray.forEach(question => question.display());
}
function combineQuestions(questionsArray){
  console.log(questionsArray);
  totalApiQuestions.push(questionsArray);
}
function getApiInfo(category,type){
  return fetch("https://opentdb.com/api.php?amount=5&category="+category+"&type="+type)
  .then(response => response.json())
  .then(object => object.results.map(formatQuestions))
  .then(displayQuestions)
}

function getQuestions(){
  document.getElementById("quizSelect").style.display = "none";
  getApiInfo(document.getElementById("quizSelect").value,"multiple");
  getApiInfo(document.getElementById("quizSelect").value,"boolean");
}

function submitQuiz(){
  let url = "http://putsreq.com/4DNdWqfDVjabX5RriVvV";
  function sendScorecard (data){
    return {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
  }
  scorecard.username = document.getElementById("username").value;
  scorecard.score = score;
  scorecard.questionsAsked = totalApiQuestions;
  fetch(url, sendScorecard(scorecard))
    .then(response => response.json())
    .then(responseData => console.log(responseData))
}
