import { myQuiz, myRow, questions } from "../index.js";

export class Question {
  constructor(index) {
    this.index = index;
    this.question = questions[index].question;
    this.difficulty = questions[index].difficulty;
    this.correct_answer = questions[index].correct_answer;
    this.incorrect_answers = questions[index].incorrect_answers;
    this.category = questions[index].category;
    this.myAllAnswers = this.getAllAnswers();
    this.isAnswerd = false;
  }

  getAllAnswers() {
    let allAnswers = [...this.incorrect_answers, this.correct_answer];
    allAnswers.sort();
    return allAnswers;
  }

  display() {
    const questionMarkUp = `
      <div
        class="question shadow-lg col-md-6 offset-md-3  p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn"
      >
        <div class="w-100 d-flex justify-content-between">
          <span class="btn btn-category">${this.category}</span>
          <span class="fs-6 btn btn-questions">${this.index + 1} of ${
      questions.length
    } Questions</span>
        </div>
        <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
        <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
        ${this.myAllAnswers.map((answer) => `<li>${answer}</li>`).join("")}
        </ul>
        <h2 class="text-capitalize text-center score-color h3 fw-bold"><i class="bi bi-emoji-laughing"></i> Score: ${
          myQuiz.score
        }</h2>        
      </div>
    `;

    myRow.innerHTML = questionMarkUp;

    const allChoicse = document.querySelectorAll(".choices li");
    allChoicse.forEach((li) => {
      li.addEventListener("click", () => {
        this.checkAnswer(li);
        this.nextQuestion();
      });
    });
  }

  checkAnswer(choice) {
    if (!this.isAnswerd) {
      this.isAnswerd = true;
      if (choice.innerHTML == this.correct_answer) {
        myQuiz.score++;
        choice.classList.add("correct", "animate__animated", "animate__pulse");
      } else {
        choice.classList.add("wrong", "animate__animated", "animate__shakeX");
      }
    }
  }

  nextQuestion() {
    this.index++;
    setTimeout(() => {
      if (this.index < questions.length) {
        let myNewQuestions = new Question(this.index);
        myNewQuestions.display();
      } else {
        let result = myQuiz.showResult();
        myRow.innerHTML = result;

        document.querySelector(".again").addEventListener("click", function () {
          location.reload();
        });
      }
    }, 1000);
  }
}
