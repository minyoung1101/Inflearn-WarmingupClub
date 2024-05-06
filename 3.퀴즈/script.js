/**
 * get json file contents
 * @returns quizContents object
 */
async function getJson() {
  const res = await fetch('quizContents.json');
  const quizContents = await res.json();
  return quizContents;
}

/**
 * print quiz content on document
 * @param {Object} quiz { question: String, answers: [], correctAnswer:Number }
 * @param {Number} curIdx
 */
function printQuizContent(quiz, curIdx) {
  const question = document.getElementsByClassName('quiz-content')[0];
  const btns = document.getElementsByClassName('btn-answer');

  question.innerText = quiz[curIdx].question;
  btns[0].innerText = quiz[curIdx].answers[0];
  btns[1].innerText = quiz[curIdx].answers[1];
}

/**
 * check targetBtn's answer is correct or not
 * @param {Element} targetBtn
 * @returns true || false
 */
function checkAnswer(targetBtn) {
  if (targetBtn.innerText == quizContents[curIdx].correctAnswer) {
    correctCnt++;
    return true;
  } else {
    return false;
  }
}

/**
 * change [html, answer buttons] background for red or green
 * (element.classList.add('correct' || 'wrong')
 * @param {Boolean} result
 */
function changeElemetStyle(result) {
  const html = document.getElementsByTagName('html')[0];
  html.classList.add(result ? 'correct' : 'wrong');

  const answerBtns = document.getElementsByClassName('btn-answer');
  const correctAnswer = quizContents[curIdx].correctAnswer;
  Array.from(answerBtns).forEach((answer) => {
    answer.classList.add(answer.innerHTML == correctAnswer ? 'correct' : 'wrong');
  });
}

/**
 * remove [html, answer buttons] background style
 * (element.classList.remove('correct' && 'wrong')
 */
function removeElementStyle() {
  const html = document.getElementsByTagName('html')[0];
  html.classList.remove('correct', 'wrong');

  const answerBtns = document.getElementsByClassName('btn-answer');
  Array.from(answerBtns).forEach((answer) => {
    answer.classList.remove('correct', 'wrong');
  });
}

/**
 * print total score on document,
 * create restart button to reload a page
 */
function printResult() {
  const quizContainer = document.getElementsByClassName('quiz-container')[0];
  const correctQuestion = document.createElement('h2');
  correctQuestion.innerText = `총 점수 : ${correctCnt} / ${quizContents.length}`;

  const restartBtn = document.createElement('button');
  restartBtn.innerText = 'Restart';
  restartBtn.classList.add('btn-restart');
  restartBtn.addEventListener('click', () => {
    location.reload();
  });

  quizContainer.append(correctQuestion, restartBtn);
}

/**
 * on clicked answer button
 * 1. check targetBtn's answer
 * 2. change element background style
 * 3. print next button on document
 * 4. if current index is last index, print total score
 * @param {Element} targetBtn
 */
function clickAnswerBtn(targetBtn) {
  const result = checkAnswer(targetBtn);
  changeElemetStyle(result);

  const nextBtn = document.getElementsByClassName('btn-next')[0];
  if (curIdx < quizContents.length - 1) {
    nextBtn.style.display = 'block';
  } else {
    printResult();
  }
}

/**
 * on clicked next button
 * 1. remove [html, answer buttons] background style
 * 2. print next quiz content
 * 3. hide next button
 * @param {Element} targetBtn
 */
function clickNextBtn(targetBtn) {
  removeElementStyle();
  printQuizContent(quizContents, ++curIdx);
  targetBtn.style.display = 'none';
}


let quizContents = [];
let curIdx = 0;
let correctCnt = 0;
window.onload = () => {
  getJson().then((Contents) => {
    Contents.map((quiz) => quizContents.push(quiz));
    printQuizContent(quizContents, curIdx);
  });

  const answerBtns = document.getElementsByClassName('btn-answer');
  Array.from(answerBtns).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      clickAnswerBtn(e.target);
    });
  });

  const nextBtn = document.querySelector('.btn-next');
  nextBtn.addEventListener('click', (e) => {
    clickNextBtn(e.target);
  });
};