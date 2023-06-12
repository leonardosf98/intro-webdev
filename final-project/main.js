let row = 0;
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
      const wordOfTheDay = processedResponse.word;
      console.log(wordOfTheDay);
    });
}
getWordOfTheDay();
function createBoard() {
  let row = document.querySelector(".square__container");
  for (let i = 1; i < 31; i++) {
    let square = document.createElement("div");
    square.classList.add(`square`);
    square.classList.add(`square-${i}`);
    row.appendChild(square);
    document.querySelector("main").appendChild(row);
  }
}

/* 0,0
0,5 =
1,0 =
1,1 =
1,4
2,5
3,0

let tries = 3;
let position = 0;

let currentIndex = 0;
if (tries === 0) {
  currentIndex = tries + position;
} else {
  currentIndex = (tries * 5) + position + tries;
} */

document.querySelector("square");
console.log(document.querySelector(".square"));
const isLetter = (value) => /^[a-zA-Z]$/.test(value);

document.addEventListener("keydown", function (event) {
  if (isLetter(event.key) === true) {
    userWord.push(event.key);
    console.log(isLetter(event.key));
  }

  let currentIndex = 0;
  if (row === 0) {
    currentIndex = row + column;
  } else {
    currentIndex = row * 5 + column + row;
  }

  let squareElement = document.querySelector(`.square-${currentIndex}`);
  console.log({ tries: row, position: column, currentIndex, squareElement });

  if (event.key === "Backspace") {
    userWord.pop();
    const previousElement = document.querySelector(
      `.square-${currentIndex - 1}`
    );

    previousElement.innerHTML = "";
    if (column > 0) column--;
    return;
  }

  if (event.key === "Enter" && userWord.length === 5) {
    verifyWord();
    return;
  }

  if (!isLetter(event.key) || event.key.length > 1) return;

  squareElement.innerText = event.key.toUpperCase();

  if (column === 5) {
    row++;
    column = 0;
  } else {
    column++;
  }
  console.log(userWord);
});

function verifyWord() {
  console.log(userWord);
  const word = userWord.join("").toLowerCase();
  console.log(word === wordOfTheDay);
  if (word === wordOfTheDay) {
    alert("You win!");
  } else {
    alert("You lose!");
    clear();
  }
}
createBoard();

function clear() {
  userWord = [];
}
