const randomCode = () => {
    let code = Math.floor(Math.random() * (999999 - 1000000) + 1000000); 
    return code;
  };
  
  module.exports = randomCode;