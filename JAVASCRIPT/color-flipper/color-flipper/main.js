import './style.css'

const COLOR_PALETTE ={
  "#6b2737": "Wine",
  "#e08e45": "Persian Orange",
  "#f8f4a6": "Vanilla",
  "#bdf7b7": "Tee Green",
  "#3943b7": "Violet Blue",
};

const colorPickerOption = () => {

  const addOptionTocolorPicker = document.querySelector("#color-picker")

  Object.keys(COLOR_PALETTE).forEach((color)=>{
    const option = document.createElement("option");
    option.value = color;
    option.innerText = COLOR_PALETTE[color];
    addOptionTocolorPicker.append(option)
  })
 
}

colorPickerOption()

const addEventListenerToColorPicker = () => {

  const colorPickerSelect = document.querySelector("#color-picker");
  colorPickerSelect.addEventListener("change", (event) => {

    const newColor = event.target.value;
    document.body.style.backgroundColor = newColor;
  })
}
addEventListenerToColorPicker();


