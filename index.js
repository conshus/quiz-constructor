function Question (inquiry, answer){
  this.inquiry = inquiry;
  this.uniqueId = this.inquiry.slice(0,this.inquiry.length-1).split(" ").join("");
  //this.choices = choices;
  this.answer = answer;
}
function MultipleChoiceQuestion(inquiry, choices, answer){
  Question.call(this, inquiry, answer);
  this.choices = choices;
}
MultipleChoiceQuestion.prototype.display = function(){
  let source = document.querySelector("#ydkjs-quiz-template").innerHTML;
  let template = Handlebars.compile(source);
  let html = template(this);
  document.querySelector(".ydkjs-quiz").insertAdjacentHTML('beforeend',html);
  //console.log(this);
    document.querySelector('.ydkjs-quiz .card:last-of-type ul').addEventListener('click', this.isCorrect.bind(this));
    //console.log(document.querySelector('.ydkjs-quiz .card:last-of-type ul'))
};
MultipleChoiceQuestion.prototype.isCorrect = function(event){
  let correctAnswer = "";
  console.log(event.target.textContent);
  console.log(this.answer);
  if (event.target.textContent === this.answer){
    this.result = "Correct!";
    event.target.style.backgroundColor ="green";

  } else {
    this.result = "No sorry!";
    event.target.style.backgroundColor ="red";
  }
  let result = document.querySelector("#answer-");
  result.innerHTML = this.result;
};
function ShortAnswerQuestion(inquiry, fillIn, answer){
  Question.call(this, inquiry, answer);
  this.fillIn = fillIn;
}
ShortAnswerQuestion.prototype.display = function(){
  let source = document.querySelector("#ydkjs-quiz-template").innerHTML;
  let template = Handlebars.compile(source);
  let html = template(this);
  document.querySelector(".ydkjs-quiz").insertAdjacentHTML('beforeend',html);
  //console.log(this);
    document.querySelector('.ydkjs-quiz .card:last-of-type .submitButton').addEventListener('click', this.isCorrect.bind(this));
    //console.log(document.querySelector('.submitButton'));
};
ShortAnswerQuestion.prototype.isCorrect = function(event){
  let correctAnswer = "";
  console.log(event.target.previousElementSibling.value);
  console.log(this.answer);
  console.log(document.querySelector("#shortAnswerResponse"));
  if (event.target.previousElementSibling.value === this.answer){
    this.result = "Correct!";
    event.target.style.backgroundColor ="green";

  } else {
    this.result = "No sorry!";
    event.target.style.backgroundColor ="red";
  }
  let result = document.querySelector("#answer-");
  result.innerHTML = this.result;
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
[question1, question2, question3, question4, question5].forEach(question => question.display());
[question6, question7, question8].forEach(question => question.display());
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
