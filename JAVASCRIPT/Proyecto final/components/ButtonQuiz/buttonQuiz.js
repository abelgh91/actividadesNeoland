const getPreviousIndex = () => {
    console.log("index en el previus", index);
    if (index >= 1) {
      index--;
    }
  
    if (index === 0) {
      const navigatePrevious = document.getElementById("previous");
      navigatePrevious.style.display = "none";
    }
  };
  
  const getNextIndex = () => {
    index++;
    if (index === 0) {
      const navigatePrevious = document.getElementById("previous");
      navigatePrevious.style.display = "none";
    }
    if (index > 0) {
      const navigatePrevious = document.getElementById("previous");
      navigatePrevious.style.display = "flex";
    }
  };

  module.exports = {getPreviousIndex, getNextIndex}