// Buttons and Styles
const qDiv = document.querySelector("#qDiv");
const closeBtn = document.querySelector("#closeBtn");
const qText = document.querySelector("#qText");

closeBtn.addEventListener("click", (e) => {
  e.preventDefault();
  qDiv.style.display = "none";
});

const showQ = (cardQuestion) => {
  qDiv.style.display = "flex";
  qText.textContent = cardQuestion;
};

// Data
const objArr = [];
const cats = [];
const qArr = [];

async function fetchData() {
  try {
    const response = await fetch("./data.json");
    const data = await response.json();
    for (obj of data) {
      objArr.push(obj);
    }
    for (let cat in objArr) {
      cats.push(objArr[cat].category);
    }
    for (let qObj in objArr) {
      qArr.push(objArr[qObj].questions);
    }
    // Usage
    const cardCreator = new CardCreator(".container", cats, qArr);
    cardCreator.addCardsToContainer();

    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}
fetchData();

// Important Data
const c1 = [7, 13, 19, 25];
const c2 = [8, 14, 20, 26];
const c3 = [9, 15, 21, 27];
const c4 = [10, 16, 22, 28];
const c5 = [11, 17, 23, 29];
const c6 = [12, 18, 24, 30];
const mainCats = [1, 2, 3, 4, 5, 6];
const qCards = [c1, c2, c3, c4, c5, c6];

// Card Constructor
class CardCreator {
  constructor(containerSelector, categories, questions) {
    this.container = document.querySelector(containerSelector);
    this.categories = categories;
    this.questions = questions;
    this.totalQuestions = [];
    this.questions.forEach((question) => {
      question.forEach((child) => {
        this.totalQuestions.push(child);
      });
    });
    this.totalCard = [...this.categories, ...this.totalQuestions];
  }

  createCard(content) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<p>${content}</p>`;
    return card;
  }

  addCardsToContainer() {
    this.totalCard.forEach((content, i) => {
      const indexVal = i + 1;
      if (mainCats.includes(indexVal)) {
        const card = this.createCard(content);
        this.container.appendChild(card);
      } else {
        let price;
        switch (true) {
          case indexVal >= 7 && indexVal <= 12:
            price = "$100";
            break;
          case indexVal >= 13 && indexVal <= 18:
            price = "$200";
            break;
          case indexVal >= 19 && indexVal <= 24:
            price = "$300";
            break;
          case indexVal >= 25 && indexVal <= 30:
            price = "$400";
            break;
          case indexVal >= 31 && indexVal <= 36:
            price = "$500";
            break;
          default:
            price = "Unknown";
            break;
        }

        let message;
        let curIndex;
        switch (true) {
          case c1.includes(indexVal):
            curIndex = c1.indexOf(indexVal);
            message = this.questions[0][curIndex].question;
            break;
          case c2.includes(indexVal):
            curIndex = c2.indexOf(indexVal);
            message = this.questions[1][curIndex].question;
            break;
          case c3.includes(indexVal):
            curIndex = c3.indexOf(indexVal);
            message = this.questions[2][curIndex].question;
            break;
          case c4.includes(indexVal):
            curIndex = c4.indexOf(indexVal);
            message = this.questions[3][curIndex].question;
            break;
          case c5.includes(indexVal):
            curIndex = c5.indexOf(indexVal);
            message = this.questions[4][curIndex].question;
            break;
          case c6.includes(indexVal):
            curIndex = c6.indexOf(indexVal);
            message = this.questions[5][curIndex].question;
            break;
          default:
            message = "Unknown Question";
            break;
        }

        const card = this.createCard(price);
        this.container.appendChild(card);
        card.addEventListener("click", () => {
          showQ(message);
        });
      }
    });
  }
}
