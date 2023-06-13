let row = 1;
let column = 1;
let userWord = [];
let wordOfTheDay;

const wordURL = "https://words.dev-apis.com/word-of-the-day";

function getWordOfTheDay() {
  const promise = fetch(wordURL);
  promise
    .then(function (response) {
      const processingPromise = response.json();
      return processingPromise;
    })
    .then(function (processedResponse) {
      wordOfTheDay = processedResponse.word;
    });
}
getWordOfTheDay();

function createBoard() {
  let row = document.querySelector(".square__container");
  for (let linhas = 1; linhas < 7; linhas++) {
    for (let colunas = 1; colunas < 6; colunas++) {
      let square = document.createElement("div");
      square.classList.add(`square`);
      square.classList.add(`square-${linhas}-${colunas}`);
      row.appendChild(square);
      document.querySelector("main").appendChild(row);
    }
  }
}

function isLetter(value) {
  return /^[a-zA-Z]$/.test(value);
}

document.addEventListener("keydown", function (event) {
  let squareElement = document.querySelector(`.square-${column}-${row}`);

  if (isLetter(event.key) === true && userWord.length < 5) {
    userWord.push(event.key);
    squareElement.innerText = event.key.toUpperCase();
    row++;
  }

  if (event.key === "Backspace") {
    userWord.pop();
    let element = document.querySelector(`.square-${column}-${row - 1}`);
    element.innerHTML = "";
    if (column > 0) row--;
    return;
  }

  if (event.key === "Enter" && userWord.length === 5) {
    verifyIfWordExists();
    return;
  }

  if (!isLetter(event.key) || userWord.length < 5) return;
});

function verifyIfWordExists() {
  const validatorURL = "https://words.dev-apis.com/validate-word";
  fetch(validatorURL, {
    method: "POST",
    body: JSON.stringify({
      word: userWord.join("").toLowerCase(),
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      if (data.validWord === true) {
        verifyWord();
      } else {
        for (let i = 1; i < 6; i++) {
          let squareElement = document.querySelector(`.square-${column}-${i}`);
          squareElement.style.backgroundColor = "red";
          setTimeout(function () {
            squareElement.style.backgroundColor = "white";
          }, 100);
          clear();
        }
      }
    });
}

function verifyWord() {
  const word = userWord.join("").toLowerCase();
  if (word === wordOfTheDay) {
    alert("You win!");
    for (let i = 1; i < 6; i++) {
      let squareElement = document.querySelector(`.square-${column}-${i}`);
      squareElement.style.backgroundColor = "green";
    }
    return;
  } else {
    for (let j = 0; j < 5; j++) {
      if (word[j] === wordOfTheDay[j]) {
        let squareElement = document.querySelector(
          `.square-${column}-${j + 1}`
        );
        squareElement.style.backgroundColor = "green";
      } /*else if (word.includes(wordOfTheDay[j])) {
        let squareElement = document.querySelector(
          `.square-${column}-${word.indexOf(wordOfTheDay[j])}`
        );
        squareElement.style.backgroundColor = "yellow";
      }*/ else {
        let squareElement = document.querySelector(
          `.square-${column}-${j + 1}`
        );
        squareElement.style.backgroundColor = "red";
      }
    }
  }
  column++;
  userWord = [];
  row = 1;
  gameIsOver();
}

createBoard();
function gameIsOver() {
  if (column === 7) {
    alert("Game Over! Try again tomorrow!");
  }
}

function clear() {
  userWord = [];
  row = 1;
  for (let i = 1; i < 6; i++) {
    let squareElement = document.querySelector(`.square-${column}-${i}`);
    squareElement.innerHTML = "";
  }
}
