let source = document.querySelector("#ydkjs-quiz-template").innerHTML;
let template = Handlebars.compile(source);
let questionsArray =[];
let buttonsArray=[];
function Question (inquiry, choices, answer){
  this.inquiry = inquiry;
  this.uniqueId = this.inquiry.slice(0,this.inquiry.length-1).split(" ").join("+");
  this.choices = choices;
  this.answer = answer;
  this.result = "";
  this.isCorrect = function(event){
    let correctAnswer = "";
    for (i=0;i<questionsArray.length;i++){
      if(buttonsArray[i].indexOf(event.target.id) != -1){
        correctAnswer = questionsArray[i].answer;
      }
    }
    if (event.target.id == correctAnswer){
      this.result = "Correct!";
      event.target.style.backgroundColor ="green";

    } else {
      this.result = "No sorry!";
      event.target.style.backgroundColor ="red";
    }
    let result = document.querySelector("#answer-");
    result.innerHTML = this.result;
/*
    let quizChoices = document.querySelectorAll(".choice");
    for (i=0; i<quizChoices.length; i++){
      let quizChoice = quizChoices[i];

      var clone = quizChoice.cloneNode();
  while (quizChoice.firstChild) {
    clone.appendChild(quizChoice.lastChild);
  }
  quizChoice.parentNode.replaceChild(clone, quizChoice);
}*/
/*    let quizChoices = document.querySelectorAll(".choice");
    for (i=0; i<quizChoices.length; i++){
      let quizChoice = quizChoices[i];
      quizChoice.addEventListener("click","");
      console.log("removeEventListener")
    }*/
  };
  this.display = function(){
    questionsArray = [
      question1,
      question2,
      question3,
      question4,
      question5
    ];
    let html = questionsArray.map(object => template(object)).join("");
    let destination = document.querySelector(".ydkjs-quiz");
    destination.innerHTML = html;
    let quizChoices = document.querySelectorAll(".choice");
    let buttonSet =[];
    let buttonsPerQuestion = quizChoices.length / questionsArray.length;
    for (i=0; i<questionsArray.length; i++){
      for (j=0; j<buttonsPerQuestion; j++){
         buttonSet[j] = quizChoices[j+(4*i)].id;
      }
      buttonsArray.push(buttonSet);
      buttonSet=[];
    }
    for (i=0; i<quizChoices.length; i++){
      let quizChoice = quizChoices[i];
      quizChoice.addEventListener("click",this.isCorrect.bind(this));
    }
  }
}
let question1 = new Question (
  "JavaScript is a trademark of which company?",
  [
    "Microsoft",
    "IBM",
    "Oracle",
    "No One (Open Source)"
  ],
"Oracle"
);
let question2 = new Question (
  "When did JavaScript first appear?",
  [
    "December 4, 1995",
    "March 12, 1993",
    "January 23, 1996",
    "It's always been here."
  ],
"December 4, 1995"
);
let question3 = new Question (
  "What was JavaScript officially called when first released?",
  [
    "CoffeeScript",
    "LiveScript",
    "Java",
    "Always was JavaScript"
  ],
"LiveScript"
);
let question4 = new Question (
  "Who wrote the first JavaScript prototype?",
  [
    "Al Gore",
    "Marc Andreessen",
    "Steve Jobs",
    "Brendan Eich"
  ],
"Brendan Eich"
);
let question5 = new Question (
  "What internet browser first shipped with JavaScript?",
  [
    "Microsoft Internet Explorer",
    "Netscape Navigator",
    "Opera",
    "Safari"
  ],
"Netscape Navigator"
);
question5.display();
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
