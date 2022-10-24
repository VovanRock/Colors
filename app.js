const colors = document.querySelectorAll(".color");

document.addEventListener("keydown", (event) => {
  event.preventDefault();
  if (event.code.toLowerCase() == "space") {
    setRandomColor();
  }
});

document.addEventListener("click", (event) => {
  const type = event.target.dataset.type;

  if (type == "lock") {
    const node =
      event.target.tagName.toLowerCase() == "i"
        ? event.target
        : event.target.children[0];

    node.classList.toggle("fa-lock");
    node.classList.toggle("fa-lock-open");
  } else if (type == "copy") {
    copyToClipboard(event.target.textContent);
  }
});

// function generateRandomColor() {
//   const hexCodes = "012345678ABCDEF";
//   let color = "#";
//   for (let i = 0; i < 6; i++) {
//     color += hexCodes[Math.floor(Math.random() * hexCodes.length)];
//   }
//   return color;
// }

function setRandomColor(isInitial) {
  const colorsHash = isInitial ? getColorsFromLink() : [];

  colors.forEach((col, index) => {
    const isLocked = col.querySelector("i").classList.contains("fa-lock");
    const text = col.querySelector("h2");
    const button = col.querySelector("button");

    if (isLocked) {
      colorsHash.push(text.textContent);
      return;
    }

    const color = isInitial
      ? colorsHash[index]
        ? colorsHash[index]
        : chroma.random()
      : chroma.random();

    if (!isInitial) {
      colorsHash.push(color);
    }

    text.textContent = color;
    col.style.background = color;
    setTextColor(text, color);
    setTextColor(button, color);
  });

  updateColorsHash(colorsHash);
}

function setTextColor(text, color) {
  const luminance = chroma(color).luminance();
  text.style.color = luminance > 0.5 ? "black" : "white";
}

function copyToClipboard(text) {
  return navigator.clipboard.writeText(text);
}

function updateColorsHash(colorsHash = []) {
  document.location.hash = colorsHash
    .map((col) => {
      return col.toString().substring(1);
    })
    .join("-");
}

function getColorsFromLink() {
  if (document.location.hash.length > 1) {
    return document.location.hash
      .substring(1)
      .split("-")
      .map((color) => "#" + color);
  }
  return [];
}

setRandomColor(true);
