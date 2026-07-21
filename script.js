// ================= NAVIGATION BAR FUNCTIONALITY =================
document.addEventListener("DOMContentLoaded", function () {
  // Initialize all functionalities
  initNavigation();
  initHeroSlider();
  initClientSlider();
  initContactForm();
  initServicesSlider();
  initPortfolioFilter();
  initSmoothScroll();
  initNavbarScroll();
});

/* ================= NAVIGATION ================= */
function initNavigation() {
  const navbar = document.getElementById("navbar");
  const menuDots = document.getElementById("menuDots");
  const navMenu = document.getElementById("navMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle menu
  menuDots.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("active");
  });

  // Close on link click
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      setActiveLink(link);
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!navbar.contains(e.target)) {
      navMenu.classList.remove("active");
    }
  });
}

/* ================= SCROLL EFFECT ================= */
function initNavbarScroll() {
  const navbar = document.getElementById("navbar");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });
}

/* ================= SMOOTH SCROLL ================= */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;

      window.scrollTo({
        top: target.offsetTop - 90,
        behavior: "smooth",
      });
    });
  });
}

/* ================= ACTIVE LINK ================= */
function setActiveLink(activeLink) {
  document
    .querySelectorAll(".nav-link")
    .forEach((link) => link.classList.remove("active"));
  activeLink.classList.add("active");
}

//======================== Hero Slider Functions============================//
//======================== Hero Slider Functions ============================//
function initHeroSlider() {
  const slides = document.querySelectorAll(".hero-slide");
  const dotsContainer = document.querySelector(".slider-dots");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (!slides.length || !dotsContainer) return;

  let currentSlide = 0;
  let slideInterval;
  const slideDuration = 3000; // ✅ 3 seconds per slide

  /* ========================
     CREATE DOTS
  ======================== */
  slides.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");

    dot.addEventListener("click", () => {
      goToSlide(index);
      resetInterval();
    });

    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  /* ========================
     SLIDE FUNCTIONS
  ======================== */
  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
    currentSlide = index;
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % slides.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIndex);
  }

  function goToSlide(index) {
    showSlide(index);
  }

  /* ========================
     INTERVAL CONTROL (FIXED)
  ======================== */
  function startInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, slideDuration);
  }

  /* ========================
     BUTTON EVENTS
  ======================== */
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      resetInterval();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      resetInterval();
    });
  }

  /* ========================
     HOVER PAUSE
  ======================== */
  const heroSlider = document.querySelector(".hero-slider");
  if (heroSlider) {
    heroSlider.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    heroSlider.addEventListener("mouseleave", () => {
      startInterval();
    });
  }

  /* ========================
     INIT
  ======================== */
  showSlide(currentSlide);
  startInterval();
}

/* ========================
   CLIENT SLIDER (UNCHANGED)
======================== */
function initClientSlider() {
  const clientsTrack = document.querySelector(".clients-track");
  if (!clientsTrack) return;

  const clients = document.querySelectorAll(".client");

  clients.forEach((client) => {
    const clone = client.cloneNode(true);
    clientsTrack.appendChild(clone);
  });
}
// /==================keyboard navigation with the arrow keys=======================/
document.addEventListener("keydown", function (e) {
  // Get all hero slides
  const slides = document.querySelectorAll(".hero-slide");
  let currentSlideIndex = Array.from(slides).findIndex((slide) =>
    slide.classList.contains("active")
  );

  // Navigate to the previous slide (Arrow Left)
  if (e.key === "ArrowLeft") {
    if (currentSlideIndex > 0) {
      // Hide current slide
      slides[currentSlideIndex].classList.remove("active");

      // Show previous slide
      slides[currentSlideIndex - 1].classList.add("active");
    } else {
      // If we're at the first slide, loop to the last slide
      slides[slides.length - 1].classList.add("active");
      slides[currentSlideIndex].classList.remove("active");
    }
  }

  // Navigate to the next slide (Arrow Right)
  if (e.key === "ArrowRight") {
    if (currentSlideIndex < slides.length - 1) {
      // Hide current slide
      slides[currentSlideIndex].classList.remove("active");

      // Show next slide
      slides[currentSlideIndex + 1].classList.add("active");
    } else {
      // If we're at the last slide, loop to the first slide
      slides[0].classList.add("active");
      slides[currentSlideIndex].classList.remove("active");
    }
  }
});

//===================== Contact Form Submission==========================//
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;

  const submitBtn = document.getElementById("submitBtn");
  const btnText = submitBtn.querySelector(".btn-text");
  const btnLoader = submitBtn.querySelector(".btn-loader");

  // Basic validation rules
  const fields = {
    name: (value) => value.trim().length >= 3,
    phone: (value) => /^[6-9]\d{9}$/.test(value),
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    subject: (value) => value.trim().length >= 3,
    message: (value) => value.trim().length >= 10,
  };

  form.addEventListener("submit", function (e) {
    // Validate before sending
    let valid = true;

    Object.keys(fields).forEach((key) => {
      const input = form[key];
      const errorBox = document.getElementById(key + "Error");

      if (!fields[key](input.value)) {
        valid = false;
        errorBox.textContent = "Please enter a valid " + key;
        input.parentElement.classList.add("error");
      } else {
        errorBox.textContent = "";
        input.parentElement.classList.remove("error");
        input.parentElement.classList.add("success");
      }
    });

    if (!valid) {
      e.preventDefault(); // Block form submission
      return;
    }

    // Show loader and allow form to submit
    btnText.style.display = "none";
    btnLoader.style.display = "flex";
    submitBtn.disabled = true;
  });
}

document.addEventListener("DOMContentLoaded", initContactForm);

// Services Horizontal Slider with Dots Navigation
function initServicesSlider() {
  const wrapper = document.querySelector(".cards-wrapper");
  const nextBtn = document.getElementById("nextBtn");
  const container = document.querySelector(".slider-container");

  if (!wrapper || !nextBtn || !container) return;

  const cards = wrapper.querySelectorAll(".service-card");
  if (!cards.length) return;

  const gap = 20;
  let cardIndex = 0;

  function getCardWidth() {
    const card = cards[1] || cards[0]; // skip left-card safely
    return card.offsetWidth + gap;
  }

  function getVisibleCards() {
    return Math.floor(container.offsetWidth / getCardWidth());
  }

  function slideCards() {
    const cardWidth = getCardWidth();
    const visibleCards = getVisibleCards();
    const maxIndex = cards.length - visibleCards;

    if (cardIndex < maxIndex) {
      cardIndex++;
    } else {
      cardIndex = 0; // loop safely
    }

    wrapper.style.transform = `translateX(-${cardIndex * cardWidth}px)`;
  }

  nextBtn.addEventListener("click", slideCards);
}

// Portfolio Filter
function initPortfolioFilter() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const portfolioItems = document.querySelectorAll(".portfolio-card");

  if (filterBtns.length === 0 || portfolioItems.length === 0) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      // Show/hide items
      portfolioItems.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });

      // Set active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    });
  });
}

// ================= Our Premium Clients =========================//
document.addEventListener("DOMContentLoaded", function () {
  const track = document.querySelector(".automotive-track");
  const cards = document.querySelectorAll(".automotive .client");
  const dotsContainer = document.querySelector(".automotive-dots");

  if (!track || !cards.length || !dotsContainer) return;

  const gap = 20;
  let currentIndex = 0;

  function getCardWidth() {
    return cards[0].offsetWidth + gap;
  }

  function getVisibleCards() {
    return Math.floor(
      document.querySelector(".automotive-slider").offsetWidth / getCardWidth()
    );
  }

  function getTotalSlides() {
    return cards.length - getVisibleCards();
  }

  /* Create dots */
  dotsContainer.innerHTML = "";
  for (let i = 0; i <= getTotalSlides(); i++) {
    const dot = document.createElement("span");
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.querySelectorAll("span");

  function updateSlider() {
    track.style.transform = `translateX(-${currentIndex * getCardWidth()}px)`;

    dots.forEach((d) => d.classList.remove("active"));
    dots[currentIndex]?.classList.add("active");
  }

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      currentIndex = Number(dot.dataset.index);
      updateSlider();
      resetAutoSlide();
    });
  });

  function autoSlide() {
    const maxIndex = getTotalSlides();
    currentIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
    updateSlider();
  }

  let slideInterval = setInterval(autoSlide, 3500);

  function resetAutoSlide() {
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlide, 3500);
  }

  window.addEventListener("resize", () => {
    currentIndex = 0;
    updateSlider();
  });

  updateSlider();
});

// ================= WINDOW RESIZE HANDLER =================
window.addEventListener("resize", function () {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768) {
    const navMenu = document.querySelector(".nav-menu");
    const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");

    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
    }

    if (mobileMenuToggle && mobileMenuToggle.classList.contains("active")) {
      mobileMenuToggle.classList.remove("active");
    }
  }
});

const wrapper = document.querySelector(".cards-wrapper");
const dotsContainer = document.querySelector(".service-dots");

const totalCards = wrapper.children.length;
let activeIndex = 0;

// Create one dot per original card
// for(let i = 0; i < totalCards; i++){
//     const dot = document.createElement("span");
//     if(i === 0) dot.classList.add("active");
//     dotsContainer.appendChild(dot);
// }

// const dots = document.querySelectorAll(".service-dots span");

// function updateDots(){
//     dots.forEach(dot => dot.classList.remove("active"));
//     dots[activeIndex].classList.add("active");
// }

// function slide(){

//     const firstCard = wrapper.firstElementChild;
//     const cardWidth = firstCard.offsetWidth;

//     wrapper.style.transition = "transform .5s ease";
//     wrapper.style.transform = `translateX(-${cardWidth}px)`;

//     wrapper.addEventListener("transitionend", function handler(){

//         wrapper.style.transition = "none";
//         wrapper.style.transform = "translateX(0)";

//         wrapper.appendChild(firstCard);

//         activeIndex++;

//         if(activeIndex >= totalCards){
//             activeIndex = 0;
//         }

//         updateDots();

//         wrapper.removeEventListener("transitionend", handler);

//     });

// }

// setInterval(slide,3000);


// const serviceWrapper = document.querySelector(".cards-wrapper");
// const serviceCards = document.querySelectorAll(".cards-wrapper .service-card");
// const serviceDotsContainer = document.querySelector(".service-dots");

// if (serviceWrapper && serviceCards.length && serviceDotsContainer) {

//     let serviceCurrentIndex = 0;
//     const gap = 20;

//     function getCardWidth() {
//         return serviceCards[0].offsetWidth + gap;
//     }

//     function getVisibleCards() {
//         return Math.floor(
//             document.querySelector(".slider-container").offsetWidth /
//             getCardWidth()
//         );
//     }

//     function getMaxIndex() {
//         return serviceCards.length - getVisibleCards();
//     }

//     // Create dots
//     serviceDotsContainer.innerHTML = "";

//     for (let i = 0; i <= getMaxIndex(); i++) {
//         const dot = document.createElement("span");
//         dot.dataset.index = i;
//         serviceDotsContainer.appendChild(dot);
//     }

//     const serviceDots = serviceDotsContainer.querySelectorAll("span");

//     function updateServiceSlider() {

//         serviceWrapper.style.transition = "transform .5s ease";
//         serviceWrapper.style.transform =
//             `translateX(-${serviceCurrentIndex * getCardWidth()}px)`;

//         serviceDots.forEach(dot => dot.classList.remove("active"));
//         serviceDots[serviceCurrentIndex]?.classList.add("active");
//     }

//     // Dot click
//     serviceDots.forEach(dot => {

//         dot.addEventListener("click", () => {

//             serviceCurrentIndex = Number(dot.dataset.index);

//             updateServiceSlider();

//             resetAuto();

//         });

//     });

//     function autoSlide() {

//         if (serviceCurrentIndex < getMaxIndex()) {
//             serviceCurrentIndex++;
//         } else {
//             serviceCurrentIndex = 0;
//         }

//         updateServiceSlider();

//     }

//     let interval = setInterval(autoSlide, 3000);

//     function resetAuto() {
//         clearInterval(interval);
//         interval = setInterval(autoSlide, 3000);
//     }

//     window.addEventListener("resize", updateServiceSlider);

//     updateServiceSlider();

// }
// ================= SERVICES SLIDER =================
document.addEventListener("DOMContentLoaded", () => {

    const wrapper = document.querySelector(".cards-wrapper");
    const dotsContainer = document.querySelector(".service-dots");

    if (!wrapper || !dotsContainer) return;

    // Save original order
    const originalCards = [...wrapper.children];

    // Restore original order
    wrapper.innerHTML = "";
    originalCards.forEach(card => wrapper.appendChild(card));

    let totalCards = originalCards.length;
    let activeIndex = 0;
    let autoSlide;

    // ------------------------
    // Create Dots
    // ------------------------
    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalCards; i++) {
        const dot = document.createElement("span");
        if (i === 0) dot.classList.add("active");
        dotsContainer.appendChild(dot);
    }

    const dots = dotsContainer.querySelectorAll("span");

    function updateDots() {
        dots.forEach(dot => dot.classList.remove("active"));
        dots[activeIndex].classList.add("active");
    }

    function slide() {

        const firstCard = wrapper.firstElementChild;

        const style = window.getComputedStyle(wrapper);
        const gap = parseFloat(style.gap || style.columnGap || 0);

        const moveWidth = firstCard.offsetWidth + gap;

        wrapper.style.transition = "transform .5s ease";
        wrapper.style.transform = `translateX(-${moveWidth}px)`;

        wrapper.addEventListener("transitionend", function handler() {

            wrapper.style.transition = "none";
            wrapper.style.transform = "translateX(0)";

            wrapper.appendChild(firstCard);

            activeIndex = (activeIndex + 1) % totalCards;
            updateDots();

        }, { once: true });

    }

    // ------------------------
    // Dot Click
    // ------------------------
    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            clearInterval(autoSlide);

            // Restore original order
            wrapper.innerHTML = "";
            originalCards.forEach(card => wrapper.appendChild(card));

            // Rotate cards
            for (let i = 0; i < index; i++) {
                wrapper.appendChild(wrapper.firstElementChild);
            }

            activeIndex = index;
            updateDots();

            wrapper.style.transition = "none";
            wrapper.style.transform = "translateX(0)";

            autoSlide = setInterval(slide, 3000);

        });

    });

    // ------------------------
    // Reset on Resize
    // ------------------------
    window.addEventListener("resize", () => {
        wrapper.style.transition = "none";
        wrapper.style.transform = "translateX(0)";
    });

    updateDots();

    autoSlide = setInterval(slide, 3000);

});