let width, height, mode, finalString, reps;

const updateMode = () => {
  let hito = document.querySelector("#hito");
  let colors = document.querySelector("#colors");
  if (hito.checked) {
    colors.style.display = "none";
  } else {
    colors.style.display = "block";
  }
  generate();
  draw(mode);
};

const generate = () => {
  width = document.querySelector("#width").value;
  height = document.querySelector("#height").value;

  finalString = "";

  if (document.querySelector("#hito").checked) {
    mode = "hito";
    hitomezashi();
  } else {
    mode = "multi";
    multiColor(document.querySelector("#num-colors").value);
  }

  document.querySelector("#out").innerHTML = finalString;
};

const draw = (mode) => {
  const canvas = document.querySelector("canvas");
  canvas.width = width * 10 + 20;
  canvas.height = height * 10 + 20;
  const ctx = canvas.getContext("2d");

  switch (mode) {
    case "hito":
      break;
    case "multi":
      break;
  }
};

const hitomezashi = () => {
  for (let i = 0; i < 2; i++) {
    if (i == 0) {
      finalString = finalString + `X: `;
      reps = width;
    } else {
      finalString = finalString + `Y: `;
      reps = height;
    }
    for (let i = 0; i < reps; i++) {
      let rand = Math.random() * 100;
      if (rand >= 50) {
        finalString = finalString + `0`;
      } else {
        finalString = finalString + `1`;
      }
    }
    finalString = finalString + `<br><br>`;
  }
};

const multiColor = (numColors) => {
  for (let i = 0; i < 2; i++) {
    if (i == 0) {
      finalString = finalString + `X: `;
      reps = width;
    } else {
      finalString = finalString + `Y: `;
      reps = height;
    }
    for (let i = 0; i < reps; i++) {
      let rand = Math.random() * 100;
      switch (numColors) {
        case "2":
          if (rand >= 50) {
            finalString = finalString + `0`;
          } else {
            finalString = finalString + `1`;
          }
          break;
        case "3":
          if (rand >= 66) {
            finalString = finalString + `0`;
          } else if (rand >= 33) {
            finalString = finalString + `1`;
          } else {
            finalString = finalString + `2`;
          }
          break;
        case "4":
          if (rand >= 75) {
            finalString = finalString + `0`;
          } else if (rand >= 50) {
            finalString = finalString + `1`;
          } else if (rand >= 25) {
            finalString = finalString + `2`;
          } else {
            finalString = finalString + `3`;
          }
          break;
        case "5":
          if (rand >= 80) {
            finalString = finalString + `0`;
          } else if (rand >= 60) {
            finalString = finalString + `1`;
          } else if (rand >= 40) {
            finalString = finalString + `2`;
          } else if (rand >= 20) {
            finalString = finalString + `3`;
          } else {
            finalString = finalString + `4`;
          }
          break;
        default:
          finalString = "Try a number 2-5.";
          break;
      }
    }
    finalString = finalString + `<br><br>`;
  }
};

export { updateMode, generate };
