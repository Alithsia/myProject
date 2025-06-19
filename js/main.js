changeBackgroundHero();
drawTOPPlaces();
drawDistricts();

//Изменение фона секции hero
function changeBackgroundHero() {
  const images = document.querySelectorAll(".hero__image");
  let currentIndex = 0;
  const total = images.length;

  images[currentIndex].classList.add("hero__image_visible");

  setInterval(() => {
    const previousIndex = currentIndex;
    currentIndex = (currentIndex + 1) % total;

    images[previousIndex].classList.remove("hero__image_visible");
    images[currentIndex].classList.add("hero__image_visible");
  }, 6000);
}

//

// //districts
// fetch("districts.json")
//   .then((response) => response.json())
//   .then((data) => {
//     const container = document.querySelector(".districts__list");
//     data.forEach((item) => {
//       const block = document.createElement("div");
//       block.innerHTML = `
//         <h2>${item.name}</h2>
//         <img src="${item.img}" alt="${item.name}" width="300">
//       `;
//       container.appendChild(block);
//     });
//   })
//   .catch((error) => console.error("Ошибка загрузки данных:", error));

//splide
// document.addEventListener("DOMContentLoaded", function () {
//   new Splide("#top-places-carousel", {
//     type: "loop",
//     perPage: 3,
//     pagination: false,
//     // autoScroll: {
//     //   speed: 2,
//     // },
//   }).mount();
// });

//top
function drawTOPPlaces() {
  const cards = document.querySelector(".top-places__cards");

  fetch("districts.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((elem) => {
        elem.landmarks.forEach((item) => {
          if (item.top) {
            let card = document.createElement("li");
            card.classList.add("splide__slide", "top-places__card");
            card.innerHTML = `
            <img src="${item.img}" alt="${item.name}"  class="card__img" />
            <span class="card__title">${item.name}</span>
            <p class="card__text">${item.about}</p>
            <a href="#" class="card__link">${item.link}</a>
          `;
            cards.appendChild(card);
          }
        });
      });
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));
}

// const slider = new Splide("#top-places-carousel", {
//   type: "loop",
//   perPage: 2,
//   pagination: false,
//   // autoScroll: {
//   //   speed: 2,
//   // },
// }).mount();

const slider = new Splide("#top-places-carousel", {
  perPage: 3,
  rewind: true,
}).mount();

//districts
function drawDistricts() {
  const cards = document.querySelector(".districts__list");

  fetch("districts.json")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((elem) => {
        let landmark = declineLandmark(elem.landmarks.length);

        let card = document.createElement("li");
        card.classList.add("splide__slide", "districts__item");
        card.innerHTML = `
            <img src="${elem.img}" alt="${elem.name}"  class="card__img" />
            <div class="districts__content">
              <h3 class="district-title">${elem.name}</h3>
              <p class="district-text">${elem.landmarks.length} ${landmark}</p>
            </div>
          `;
        cards.appendChild(card);
      });
    })
    .catch((error) => console.error("Ошибка загрузки данных:", error));
}

function declineLandmark(number) {
  const mod10 = number % 10;
  const mod100 = number % 100;

  if (mod100 >= 11 && mod100 <= 14) {
    return `достопримечательностей`;
  }
  if (mod10 === 1) {
    return `достопримечательность`;
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return `достопримечательности`;
  }
  return `достопримечательностей`;
}

new Splide("#districts-carousel", {
  grid: {
    rows: 2,
    cols: 2,
    gap: {
      row: "1rem",
      col: "1.5rem",
    },
  },
}).mount();

// fetch("districts.json")
//   .then((response) => response.json())
//   .then((data) => {
//     data.forEach((elem) => {
//       console.log(elem.landmarks.length);
//     });
//   });
