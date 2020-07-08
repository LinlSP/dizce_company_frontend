const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

var defaultVh = 780;

if (windowWidth > 1700) {
  defaultVh = windowHeight * 0.9;
}

const vh = defaultVh * 0.01;
const screenHeight = windowHeight * 0.01;

export { vh, screenHeight };
