var title = document.getElementById("title");
var bg_2 = document.getElementById("bg-2");
var bg_3 = document.getElementById("bg-3");

var image_card_1 = document.getElementById("image__card-1");
var image_card_2 = document.getElementById("image__card-2");
var image_card_3 = document.getElementById("image__card-3");
var image_card_4 = document.getElementById("image__card-4");

const Imports = {
  NavbarElement: document.querySelector(".header")
}

let Constants = {
  CurrentScrollY: 0,
}

const UpdateScrollPosition = () => {
  window.addEventListener("scroll", (e) => {
    Constants.CurrentScrollY = window.scrollY;
  })
}
const NavbarPositionAnimation = () => {
    const {log} = console;
    log(Constants.CurrentScrollY);
    Imports.NavbarElement.style.position = `absolute`;
    Imports.NavbarElement.style.top = `92vh`;

    if(Constants.CurrentScrollY > 832) {
      Imports.NavbarElement.style.position = `fixed`;
    Imports.NavbarElement.style.top = `1rem`;
    }
}

document.addEventListener("scroll", (event) => {
  var positionY = window.scrollY;

  title.style.fontSize = `${100 + positionY * 0.5}px`;

  bg_2.style.top = `-${positionY * 0.5}px`;
  bg_3.style.top = `-${positionY}px`;
  bg_3.style.scale = 1 + positionY * 0.001;

  image_card_1.style.transform = `translateY(${positionY * -0.5 + 400}px)`;

  image_card_2.style.transform = `translateY(${positionY * 0.1 + -50}px)`;

  image_card_3.style.transform = `translateY(${positionY * -0.1 + 100}px)`;

  image_card_4.style.transform = `translateY(${positionY * 0.2 + -125}px)`;

  var _newOpacity = positionY * 0.001;
  if (_newOpacity >= 0 && _newOpacity <= 1) {
    image_card_1.style.opacity = _newOpacity;
    image_card_2.style.opacity = _newOpacity;
    image_card_3.style.opacity = _newOpacity;
    image_card_4.style.opacity = _newOpacity;
  }
});
document.getElementById("next").onclick = function () {
  let lists = document.querySelectorAll(".item");
  document.getElementById("slide").appendChild(lists[0]);
};
document.getElementById("prev").onclick = function () {
  let lists = document.querySelectorAll(".item");
  document.getElementById("slide").prepend(lists[lists.length - 1]);
};

window.onload = function() {
  UpdateScrollPosition();
  setInterval(NavbarPositionAnimation, 1);

  const digitsbox = document.getElementById('digitsbox');
  const textcolor = document.getElementById('textcolor');
  const digitcolor = document.getElementById('digitcolor');
  const textData = document.getElementById('textdata');
  const digitTime = document.querySelectorAll('.time');

  // Function to update colors when any color picker value changes
  const updateColors = () => {
  const color1 = digitsbox.value;
  const color2 = textcolor.value;
  const color3 = digitcolor.value;
  textData.style.color = color2;
  digitTime.forEach((time) => {
    time.style.backgroundColor = color1; // Set background color for each element
    time.style.color = color3; // Set text color for each element
  });
};

  // Listen for changes in color picker inputs
  digitsbox.addEventListener('input', updateColors);
  textcolor.addEventListener('input', updateColors);
  digitcolor.addEventListener('input', updateColors);

  document.querySelector("#reset").onclick = reset;
  document.querySelector("#calculate").onclick = calculate;
};

function calculate() {
  const titleText = document.querySelector(".titleoftimerr").value;
  document.querySelectorAll("#set_here").forEach((setHere) => {
    setHere.innerText = titleText;
  });

  const date = document.querySelector("#date").value;
  const time = document.querySelector("#time").value;
  const stop = document.querySelector("#stop");
  const endTime = new Date(date + " " + time);
  const interval = setInterval(() => calculateTime(endTime), 1000);
  stop.addEventListener("click", () => {
    clearInterval(interval);
  });
}

function calculateTime(endTime) {
  const currentTime = new Date();

  const days = document.querySelectorAll("#countdown-days");
  const hours = document.querySelectorAll("#countdown-hours");
  const minutes = document.querySelectorAll("#countdown-minutes");
  const seconds = document.querySelectorAll("#countdown-seconds");

  if (endTime > currentTime) {
    const timeLeft = (endTime - currentTime) / 1000;

    days.forEach((day) => {
      day.innerText = Math.floor(timeLeft / (24 * 60 * 60));
    });
    hours.forEach((hour) => {
      hour.innerText = Math.floor((timeLeft / (60 * 60)) % 24);
    });
    minutes.forEach((minute) => {
      minute.innerText = Math.floor((timeLeft / 60) % 60);
    });
    seconds.forEach((second) => {
      second.innerText = Math.floor(timeLeft % 60);
    });
  } else {
    days.forEach((day) => {
      day.innerText = 0;
    });
    hours.forEach((hour) => {
      hour.innerText = 0;
    });
    minutes.forEach((minute) => {
      minute.innerText = 0;
    });
    seconds.forEach((second) => {
      second.innerText = 0;
    });
  }
}

function reset() {
  document.querySelectorAll(".countdown").forEach((countdown) => {
    countdown.querySelector("#countdown-days").innerText = 0;
    countdown.querySelector("#countdown-hours").innerText = 0;
    countdown.querySelector("#countdown-minutes").innerText = 0;
    countdown.querySelector("#countdown-seconds").innerText = 0;
  });
}
