import { Question } from "./utils/question.module.js";
import { Quiz } from "./utils/quiz.module.js";

//https://opentdb.com/api.php?amount=5&category=23&difficulty=medium
const form = document.getElementById("quizOptions");
const categoryMenu = document.getElementById("categoryMenu");
const difficultyOptions = document.getElementById("difficultyOptions");
const questionsNumber = document.getElementById("questionsNumber");
const btn = document.getElementById("startQuiz");
export const myRow = document.querySelector(".questions .container .row");
export let questions;
export let myQuiz;


btn.addEventListener("click", async function () {
  let category = categoryMenu.value;
  let difficulty = difficultyOptions.value;
  let number = questionsNumber.value;

  myQuiz = new Quiz(category, difficulty, number);
  questions = await myQuiz.getAllQuestion();
  let myQuestion = new Question(0);
  form.classList.replace("d-flex", "d-none");
  myQuestion.display();
});



