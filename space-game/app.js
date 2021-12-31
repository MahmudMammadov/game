"use strict";

const container = document.querySelector(".container");
const jet = document.querySelector(".jet");
const asteroit = document.querySelector(".asteroit");
const scoreValue = document.querySelector("span");
const modal = document.querySelector(".modal");
const startButton = document.querySelector(".start");
let score = 0;
let x, y;

for (let i = 0; i <= 1000; i++) {
  const starItem = document.createElement("div");
  let x = Math.trunc(Math.random() * window.innerWidth);
  let y = Math.trunc(Math.random() * window.innerHeight);
  starItem.style.top = y + "px";
  starItem.style.left = x + "px";
  starItem.classList.add("star");
  let starSize = Math.trunc(Math.random() * 3);
  starItem.style.height = starSize + "px";
  starItem.style.width = starSize + "px";
  starItem.style.backgroundColor = "white";
  container.appendChild(starItem);
}

window.addEventListener("keydown", (e) => {
  let left = parseInt(window.getComputedStyle(jet).getPropertyValue("left"));
  if (e.key === "ArrowLeft" && left >= 0) {
    jet.style.left = left - 10 + "px";
  } else if (e.key === "ArrowRight" && left <= 635) {
    jet.style.left = left + 10 + "px";
  }

  if (e.key === "ArrowUp") {
    let bullet = document.createElement("div");
    bullet.classList.add("bullet");
    container.appendChild(bullet);

    setInterval(() => {
      let asteroitShoot = document.querySelectorAll(".asteroit");

      for (let u = 0; u < asteroitShoot.length; u++) {
        let asteroit = asteroitShoot[u];
        if (asteroit.parentElement) {
          let bulletDistance = bullet.getBoundingClientRect();
          let asteroitMoveDistance = asteroit.getBoundingClientRect();

          if (
            bulletDistance.top <= asteroitMoveDistance.top &&
            bulletDistance.right <= asteroitMoveDistance.right &&
            bulletDistance.bottom <= asteroitMoveDistance.bottom &&
            bulletDistance.left >= asteroitMoveDistance.left
          ) {
            container.removeChild(bullet);
            asteroit.parentElement.removeChild(asteroit);
            score = score + 1;
            scoreValue.textContent = score;
          }
        }
      }
      let bulletTop = parseInt(
        window.getComputedStyle(bullet).getPropertyValue("top")
      );

      bullet.style.top = bulletTop - 50 + "px";

      if (bulletTop < 10) {
        container.removeChild(bullet);
      }
    });
    let bulletBottom = parseInt(
      window.getComputedStyle(bullet).getPropertyValue("bottom")
    );

    bullet.style.left = left + 15 + "px";
    bullet.style.top = bulletBottom - 30 + "px";
  }
});

let asteroitCreate = () => {
  let move = setInterval(() => {
    let asteroit = document.createElement("div");
    asteroit.classList.add("asteroit");
    asteroit.style.left = Math.trunc(Math.random() * 500) + "px";
    asteroit.style.top = -10 + "px";
    container.appendChild(asteroit);
    let allAsteroit = document.querySelectorAll(".asteroit");
    for (let a = 0; a < allAsteroit.length; a++) {
      let asteroitBottomRemove = parseInt(
        window.getComputedStyle(allAsteroit[a]).getPropertyValue("top")
      );

      let allAsteroitTop = parseInt(
        window.getComputedStyle(allAsteroit[a]).getPropertyValue("top")
      );
      allAsteroit[a].style.top = allAsteroitTop + 20 + "px";
      let containerBottom = container.getBoundingClientRect();
      if (asteroitBottomRemove > containerBottom.bottom - 110) {
        setTimeout(() => {
          container.removeChild(allAsteroit[a]);
          modal.classList.remove("closemodal");
        }, 200);
        clearInterval(move);
      }
    }
  }, 900);
};

startButton.addEventListener("click", () => {
  document.querySelectorAll(".asteroit").forEach((element) => {
    container.removeChild(element);
  });

  modal.classList.add("closemodal");
  asteroitCreate();
  jet.style.left = "50%";
  jet.style.bottom = "0";
  score = 0;
  scoreValue.textContent = score;
});
