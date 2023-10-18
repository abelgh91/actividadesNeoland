export const changeColorRGB = () => {
  const randomNumber = (min, max) => {
    min = Math.ceil(min);
    console.log(min);
    max = Math.floor(max);
    console.log("🚀 ~ file: changeColor.js:6 ~ randomNumber ~ max:", max);
    const random = Math.floor(Math.random() * (max - min + 1) + min);
    console.log(
      "🚀 ~ file: changeColor.js:8 ~ randomNumber ~  random:",
      random
    );

    return random;
  };

  let R = randomNumber(140, 190);
  let G = randomNumber(140, 190);
  let B = randomNumber(140, 190);

  const color = `rgb(${R},${G},${B})`;
  return color;
};
