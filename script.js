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
  
  const dots = document.querySelectorAll(".dot");
  const carouselInner = document.querySelector(".carousel-inner");
  const items = document.querySelectorAll(".carousel-item");
  
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      // Remove active class from all dots
      dots.forEach(d => d.classList.remove("active"));
      dot.classList.add("active");
  
      const slideIndex = dot.getAttribute("data-slide");
  
      // Add rotate effect before sliding
      items.forEach(item => {
        item.classList.add("animate");
      });
  
      setTimeout(() => {
        // Remove animation class and change slide
        items.forEach(item => {
          item.classList.remove("animate");
        });
  
        // Move carousel
        carouselInner.style.transform = `translateX(-${slideIndex * 100}%)`;
      }, 500); // matches CSS transition time
    });
  });
  

  // Testimonial carousel swipe (mobile, max-width: 768px), fade animation, one card visible, JS only

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector(".testimonial-section .carousel");
  const carouselInner = carousel.querySelector(".carousel-inner");
  const items = Array.from(carouselInner.querySelectorAll(".carousel-item"));
  let currentSlide = 0;
  let currentCard = 0;

  // On mobile: flatten all cards from all slides into one array
  let allCards = [];
  items.forEach(item => {
    allCards = allCards.concat(Array.from(item.children));
  });

  // Create a single card display container for mobile
  let singleCardWrapper = document.createElement("div");
  singleCardWrapper.className = "single-card-fade";
  carouselInner.parentNode.replaceChild(singleCardWrapper, carouselInner);

  function showCard(idx) {
    singleCardWrapper.innerHTML = ""; // Clear
    const card = allCards[idx].cloneNode(true);
    card.style.opacity = 0;
    card.style.transition = "opacity 0.5s";
    // Markazga joylash
    card.style.display = "flex";
    card.style.justifyContent = "center";
    card.style.alignItems = "center";
    card.style.flexDirection = "column";
    singleCardWrapper.appendChild(card);
    setTimeout(() => {
      card.style.opacity = 1;
    }, 20);
  }

  // Touch swipe logic
  let touchStartX = 0;
  let touchEndX = 0;
  singleCardWrapper.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });
  singleCardWrapper.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50; // px
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left (next)
      nextCard();
    }
    if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right (prev)
      prevCard();
    }
  }

  function nextCard() {
    currentCard = (currentCard + 1) % allCards.length;
    showCard(currentCard);
  }
  function prevCard() {
    currentCard = (currentCard - 1 + allCards.length) % allCards.length;
    showCard(currentCard);
  }

  // Listen for resize to enable/disable this mode
  function handleResize() {
    if (window.innerWidth <= 768) {
      // Mobile: show single card mode
      showCard(currentCard);
      singleCardWrapper.style.display = "flex";
      singleCardWrapper.style.justifyContent = "center";
      singleCardWrapper.style.alignItems = "center";
      singleCardWrapper.style.minHeight = "240px";
    } else {
      // Desktop: show original carousel layout
      if (!carouselInner.parentNode) {
        // Re-insert carouselInner if removed
        carousel.replaceChild(carouselInner, singleCardWrapper);
      }
      items.forEach(item => (item.style.display = ""));
      singleCardWrapper.style.display = "none";
    }
  }

  window.addEventListener("resize", handleResize);

  // Initialize on load
  handleResize();
});