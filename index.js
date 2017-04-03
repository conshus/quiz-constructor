let source = document.querySelector("#ydkjs-quiz-template").innerHTML;
let template = Handlebars.compile(source);
function Question (inquiry, choices, answer){
  this.inquiry = inquiry;
  this.uniqueId = this.inquiry.slice(0,this.inquiry.length-1).split(" ").join("+");
  this.choices = choices;
  this.answer = answer;
  this.result = "";
  this.isCorrect = function(event){
    console.log("this: ",this);
    let resultId = "#answer-"+this.uniqueId;
    console.log(resultId);
    //let this.result = document.querySelector("#answer-"+this.uniqueId);
    console.log(this.result);
    console.log("button clicked!");
    console.log(event.target);
    console.log(answer);
    if (event.target.id == answer){
      this.result = "Correct!";
      event.target.style.backgroundColor ="green";

    } else {
      this.result = "No sorry!";
      event.target.style.backgroundColor ="red";
    }
    let result = document.querySelector("#answer-");
    result.textContent = this.result;
    console.log(this.result);

    let quizChoices = document.querySelectorAll(".choice");
    for (i=0; i<quizChoices.length; i++){
      let quizChoice = quizChoices[i];

      var clone = quizChoice.cloneNode();
  while (quizChoice.firstChild) {
    clone.appendChild(quizChoice.lastChild);
  }
  quizChoice.parentNode.replaceChild(clone, quizChoice);
  }
/*    let quizChoices = document.querySelectorAll(".choice");
    for (i=0; i<quizChoices.length; i++){
      let quizChoice = quizChoices[i];
      quizChoice.addEventListener("click","");
      console.log("removeEventListener")
    }*/
  };
  this.display = function(){
    console.log("display works");
    let questionsArray = [
      question1
    ];
    console.log(questionsArray);
    let html = questionsArray.map(object => template(object));//.join("");
    let destination = document.querySelector(".ydkjs-quiz");
    destination.innerHTML = html;
    let quizChoices = document.querySelectorAll(".choice");
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
question1.display();
