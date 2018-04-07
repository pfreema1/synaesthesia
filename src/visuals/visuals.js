import Anime from "animejs";

export const COLOR_PALETTE = [
  "RGBA(7, 28, 55, 1.00)",
  "RGBA(78, 63, 118, 1.00)",
  "RGBA(61, 99, 149, 1.00)",
  "RGBA(173, 216, 223, 1.00)",
  "RGBA(214, 95, 108, 1.00)",
  "RGBA(143, 60, 76, 1.00)"
];

const randomColorFromPalette = () => {
  return COLOR_PALETTE[parseInt(Math.random() * 5, 10)];
};

export const changeBgColor = bgWrapperEl => {
  // console.log("bgWrapperEl:  ", bgWrapperEl);
  // change background color
  // const randomNum = parseInt(Math.random() * 5, 10);
  // bgWrapperEl.setAttribute("style", "background:" + COLOR_PALETTE[randomNum]);
  // let box1El = document.getElementById("box1");
  // // console.log("box1El:  ", box1El);
  // box1El.style.background = randomColorFromPalette();
  // const colorToChangeTo = randomColorFromPalette();
  // Anime({
  //   targets: bgWrapperEl,
  //   background: colorToChangeTo,
  //   duration: 4000
  // });
  // Anime({
  //   targets: "div",
  //   translateX: [{ value: 50 }],
  //   loop: true
  // });
};
