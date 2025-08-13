const navMenu = document.getElementById("navMenu");
navMenu.addEventListener("change", function () {
  const url = this.value;
  if (url !== "#") {
    window.open(url, "_blank"); 
    this.value = "#"; 
  }
});


  document.addEventListener("DOMContentLoaded", () => {
    const focusInp = document.getElementById("email");
    if (focusInp) {
      focusInp.focus();
    }
  });
  
