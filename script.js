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
  Exposure: {
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
    max: 200,
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

const filterContainer = document.querySelector(".filters")

function createfilter(name, unit, value, min, max) {
    const div =  document.createElement("div")
    div.classList.add("filter")

    const input =  document.createElement("input")
    input.type = "range"
    input.min = min
    input.value = value
    input.name= name
    input.max =max

    const p = document.createElement("p")
    p.innerText= name

    div.appendChild(p)
    div.appendChild(input)

    return div
}


Object.keys(filters).forEach(filter=>{
   
    const fil =filters[filter]
   const filterElement = createfilter(filter, fil.unit , fil.value , fil.min , fil.max)
    console.log(filterElement);
    filterContainer.appendChild(filterElement)
})


