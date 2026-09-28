let filters = {
  Brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  Contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },

  Saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  Huerotation: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  Blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  Grayscale: {
    value: 0,
    min: 0,
    max: 200,
    unit: "%",
  },
  Sepia: {
    value: 0,
    min: 0,
    max: 200,
    unit: "%",
  },
  Opacity: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  Invert: {
    value: 0,
    min: 0,
    max: 200,
    unit: "%",
  },
};

const Downloadbtn = document.querySelector("#download-btn");
const ResetBtn = document.querySelector("#reset-btn");
const filterContainer = document.querySelector(".filters");
const PresetsContainer = document.querySelector(".presets");
const ImageCanvas = document.querySelector("#image-canvas");
const ImageInput = document.querySelector("#image-input");
const CanvasCTX = ImageCanvas.getContext("2d");
let file = null;
let image = null;

function createfilter(name, unit, value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.value = value;
  input.name = name;
  input.max = max;

  const p = document.createElement("p");
  p.innerText = name;

  div.appendChild(p);
  div.appendChild(input);
  input.addEventListener("input", (event) => {
    filters[name].value = event.target.value;
    console.log(name + " " + filters[name].value);
    ApplyFilters();
  });
  return div;
}

function CreateFilters() {
  Object.keys(filters).forEach((filter) => {
    const fil = filters[filter];
    const filterElement = createfilter(
      filter,
      fil.unit,
      fil.value,
      fil.min,
      fil.max,
    );
    filterContainer.appendChild(filterElement);
  });
}

CreateFilters();

ImageInput.addEventListener("change", (event) => {
  file = event.target.files[0]; //getting the first file uploaded
  ImageCanvas.style.display = "block";
  const img = new Image(); // creates an object of Image class , its like creating  the img tag in HTML
  img.src = URL.createObjectURL(file); //creates an URL for the uploaded file
  const PlaceHolder = document.querySelector(".placeholder");
  PlaceHolder.style.display = "none";
  img.onload = () => {
    //runs when the image loads
    image = img;
    ImageCanvas.height = img.height;
    ImageCanvas.width = img.width;

    CanvasCTX.drawImage(img, 0, 0); //putting image on canvas
  };
});

function ApplyFilters() {
  if (!image) return;

  const cssFilterNames = {
    Saturation: "saturate",
    Huerotation: "hue-rotate",
  };
  const filterString = Object.entries(filters)
    .map(([name, filter]) => {
      const cssName = cssFilterNames[name] ?? name.toLowerCase();
      return `${cssName}(${filter.value}${filter.unit})`;
    })
    .join(" ");

  CanvasCTX.clearRect(0, 0, ImageCanvas.width, ImageCanvas.height);
  CanvasCTX.filter = filterString;
  CanvasCTX.drawImage(image, 0, 0);
}

ResetBtn.addEventListener("click", () => {
  filters = {
    Brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    Contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },

    Saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    Huerotation: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    Blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },
    Grayscale: {
      value: 0,
      min: 0,
      max: 200,
      unit: "%",
    },
    Sepia: {
      value: 0,
      min: 0,
      max: 200,
      unit: "%",
    },
    Opacity: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    Invert: {
      value: 0,
      min: 0,
      max: 200,
      unit: "%",
    },
  };
  ApplyFilters();
  filterContainer.innerHTML = "";
  CreateFilters();
});

Downloadbtn.addEventListener("click", (event) => {
  if(!image)return
  
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = ImageCanvas.toDataURL();
  link.click();
});

const presets = {
  normal: {
    Brightness: 100,
    Contrast: 100,
    Saturation: 100,
    Huerotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },
  vintage: {
    Brightness: 95,
    Contrast: 110,
    Saturation: 70,
    Huerotation: 15,
    Blur: 0,
    Grayscale: 0,
    Sepia: 40,
    Opacity: 100,
    Invert: 0,
  },
  noir: {
    Brightness: 90,
    Contrast: 170,
    Saturation: 0,
    Huerotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 20,
    Opacity: 100,
    Invert: 0,
  },
  cool: {
    Brightness: 105,
    Contrast: 110,
    Saturation: 90,
    Huerotation: 190,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },
  warm: {
    Brightness: 105,
    Contrast: 105,
    Saturation: 120,
    Huerotation: 20,
    Blur: 0,
    Grayscale: 0,
    Sepia: 30,
    Opacity: 100,
    Invert: 0,
  },
  dramatic: {
    Brightness: 90,
    Contrast: 160,
    Saturation: 130,
    Huerotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 10,
    Opacity: 100,
    Invert: 0,
  },
  cyberpunk: {
    Brightness: 110,
    Contrast: 140,
    Saturation: 180,
    Huerotation: 290,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },
  goldenHour: {
    Brightness: 110,
    Contrast: 115,
    Saturation: 140,
    Huerotation: 35,
    Blur: 0,
    Grayscale: 0,
    Sepia: 25,
    Opacity: 100,
    Invert: 0,
  },
  fade: {
    Brightness: 115,
    Contrast: 85,
    Saturation: 80,
    Huerotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 15,
    Opacity: 100,
    Invert: 0,
  },
  matrix: {
    Brightness: 100,
    Contrast: 130,
    Saturation: 150,
    Huerotation: 100,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },
};

Object.keys(presets).forEach((preset) => {
  const PresetBtn = document.createElement("button");
  PresetBtn.classList.add("btn");
  PresetBtn.innerText = preset;
  PresetsContainer.appendChild(PresetBtn);

  PresetBtn.addEventListener("click", () => {
    const selectedPreset = presets[preset];
    Object.entries(selectedPreset).forEach(([filterName, value]) => {
      filters[filterName].value = value;
    });
    ApplyFilters();
    filterContainer.innerHTML = "";
    CreateFilters();
  });
});
