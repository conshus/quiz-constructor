function Question (inquiry, choices, answer){
  this.inquiry = inquiry;
  this.uniqueId = this.inquiry.slice(0,this.inquiry.length-1).split(" ").join("");
  this.choices = choices;
  this.answer = answer;
  this.isCorrect = function(event){
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
  this.display = function(){
    let source = document.querySelector("#ydkjs-quiz-template").innerHTML;
    let template = Handlebars.compile(source);
    let html = template(this);
    document.querySelector(".ydkjs-quiz").insertAdjacentHTML('beforeend',html);
    document.querySelector('.ydkjs-quiz .card:last-of-type ul').addEventListener('click', this.isCorrect.bind(this));
    console.log(document.querySelector('.ydkjs-quiz .card:last-of-type ul'))
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
[question1, question2, question3, question4, question5].forEach(question => question.display());
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
