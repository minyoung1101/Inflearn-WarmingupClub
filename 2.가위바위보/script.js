/**
 * 사용자 vs 컴퓨터 승패 확인 후 document Elements 숫자, 문구 변경
 * @param {String} playerChoice - '가위' or '바위' or '보'
 */
function clickBtn(playerChoice) {
  const choice = { '가위': 0, '바위': 1, '보': 2 };
  const result = checkWinner(choice[playerChoice], createComputerChoice());
  changeDocument(result);
}

/**
 * 컴퓨터 가위바위보 선택지 생성
 * @returns {Number} 0 or 1 or 2
 */
function createComputerChoice() {
  return Math.floor(Math.random() * 3);
}

/**
 * 가위바위보 승패 확인
 * @param {Number} player
 * @param {Number} computer
 * @returns {String} 'e': 비김 or 'w': 사용자 이김 or 'l': 사용자 짐
 */
function checkWinner(player, computer) {
  const checkBoard = [
    ['e', 'l', 'w'],
    ['w', 'e', 'l'],
    ['l', 'w', 'e'],
  ];
  return checkBoard[player][computer];
}

/**
 * total score 체크해서 결과 출력 후 restart 버튼 생성, document에 출력
 * @param {Element} docArea
 * @param {Number} pscore
 * @param {Number} cscore
 */
function FinishGame(docArea, pscore, cscore) {
  docArea.innerHTML = '';

  const endMessage = document.createElement('p');
  endMessage.innerText = '게임 종료!';
  endMessage.classList.add('end-message');

  const resultMessage = document.createElement('p');
  // check total score
  if (pscore > cscore) {
    resultMessage.innerText = '게임에서 이겼습니다!';
    resultMessage.style.color = 'var(--mn-green)';
  } else if (pscore < cscore) {
    resultMessage.innerText = '게임에서 졌습니다!';
    resultMessage.style.color ='var(--mn-red)';
  } else {
    resultMessage.innerText = '게임에서 비겼습니다!';
  }

  // create restart button
  const restartBtn = document.createElement('button');
  restartBtn.innerText = '다시 시작';
  restartBtn.addEventListener('click', () => {
    window.location.reload();
  });

  docArea.append(endMessage, resultMessage, restartBtn);
}

/**
 * document Elements 값 변경 (현재 점수, 남은 횟수, 승패 결과)
 * @param {String} result - 'e' or 'w' or 'l'
 */
function changeDocument(result) {
  const playerScore = document.querySelector('.score-player .score');
  const computerScore = document.querySelector('.score-computer .score');
  const chooseArea = document.getElementsByClassName('choose-area')[0];
  const chance = chooseArea.querySelector('.chance');
  const winner = chooseArea.querySelector('.winner');
  const winnerMessage = { e: '무승부', w: '플레이어 승리', l: '컴퓨터 승리' };

  // 현재 점수(플레이어/컴퓨터), 남은 횟수, 승패 결과 변경
  if (result === 'w') {
    playerScore.innerText = Number(playerScore.innerText)+1;
  } else if (result === 'l') {
    computerScore.innerText = Number(computerScore.innerText)+1;
  }
  chance.innerText = Number(chance.innerText) - 1;
  winner.innerText = winnerMessage[result];

  // 남은 횟수가 0이 되면 게임 종료
  if (chance.innerText == 0) {
    FinishGame(chooseArea, Number(playerScore.innerText), Number(computerScore.innerText));
  }
}

window.onload = () => {
  // 가위바위보 버튼 클릭 이벤트리스너 등록
  const RPSbtns = document.querySelectorAll('.btns-container button');
  RPSbtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      clickBtn(e.target.innerText);
    });
  });
};
