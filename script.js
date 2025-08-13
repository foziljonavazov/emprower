  const navMenu = document.getElementById("navMenu");
  navMenu.addEventListener("change", function () {
    const url = this.value;
    if (url !== "#") {
      window.location.href = url;
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
    const focusInp = document.getElementById("email");
    if (focusInp) {
      focusInp.focus();
    }
  });
  
