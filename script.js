
document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ JavaScript Loaded Successfully");

  /* ================= 1. IMAGE POPUP MODAL (EXPERIENCE SECTION) ================= */
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("fullImage");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close-btn");
  
  // Select Buttons with the new class 'view-btn'
  const viewBtns = document.querySelectorAll(".view-btn");

  if (viewBtns.length > 0) {
    viewBtns.forEach((btn) => {
      btn.addEventListener("click", function(e) {
        e.preventDefault(); // Stop page jump
        
        // 1. Find the parent card (.doc-card)
        const card = this.closest(".doc-card");
        
        if (card) {
          // 2. Find Image inside the card
          const imgElement = card.querySelector(".doc-visual img");
          // 3. Find Title inside the card
          const titleElement = card.querySelector("h3");

          // 4. Open Modal if image exists
          if (imgElement && modal) {
            modal.style.display = "flex";
            modalImg.src = imgElement.src;
            captionText.innerText = titleElement ? titleElement.innerText : "Offer Letter";
          } else {
            console.error("❌ Error: Image or Modal not found!");
          }
        }
      });
    });
  }

  // Close Modal Logic
  if (closeBtn) {
    closeBtn.onclick = () => modal.style.display = "none";
  }

  // Close on Outside Click
  window.onclick = (e) => {
    if (e.target == modal) {
      modal.style.display = "none";
    }
  };

  /* ================= 2. THEME TOGGLE (DARK/LIGHT MODE) ================= */
  const themeBtn = document.getElementById("theme-btn");
  const body = document.body;

  if (themeBtn) {
    // Check Local Storage on Load
    if (localStorage.getItem("theme") === "dark") {
      body.classList.add("dark");
    }

    // Toggle on Click
    themeBtn.addEventListener("click", () => {
      body.classList.toggle("dark");
      
      // Save Preference
      if (body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  }

  /* ================= 3. 3D TILT EFFECT (HERO & CARDS) ================= */
  // Targets: New Doc Cards, Old Tilt elements, and Hero Visual
  const tiltElements = document.querySelectorAll(".doc-card, .tilt, .hero-visual");

  tiltElements.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Calculate Rotation
      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -5; // -5 deg max
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 5;  // 5 deg max

      // Apply Transform
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    // Reset on Mouse Leave
    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
    });
  });

  /* ================= 4. SCROLL REVEAL ANIMATION ================= */
  const reveals = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    reveals.forEach((el) => {
      const windowHeight = window.innerHeight;
      const elementTop = el.getBoundingClientRect().top;
      const elementVisible = 50; // Trigger point

      if (elementTop < windowHeight - elementVisible) {
        el.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Run once on load to show visible elements
});
document.addEventListener('DOMContentLoaded', () => {

  /* ================= IMAGE POPUP LOGIC (FIXED) ================= */
  const modal = document.getElementById("imageModal");
  const modalImg = document.getElementById("fullImage");
  const captionText = document.getElementById("caption");
  const closeBtn = document.querySelector(".close-btn");
  const viewBtns = document.querySelectorAll(".view-btn"); // Class name check karein

  if (viewBtns.length > 0) {
    viewBtns.forEach((btn) => {
      btn.addEventListener("click", function(e) {
        e.preventDefault();
        
        // 1. Image element dhundo
        const imgElement = this.querySelector("img");
        
        // 2. Title dhundo
        const card = this.closest(".doc-card");
        const titleElement = card.querySelector("h3");

        if (imgElement && modal) {
          // CSS Display Flex set karein
          modal.style.display = "flex"; 
          
          // Thoda delay taaki animation dikhe
          setTimeout(() => {
            modal.classList.add("active");
          }, 10);

          modalImg.src = imgElement.src;
          captionText.innerText = titleElement ? titleElement.innerText : "";
        }
      });
    });
  }

  // Close Function
  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
      setTimeout(() => {
        modal.style.display = "none";
      }, 300); // Animation khatam hone ka wait
    }
  }

  if (closeBtn) closeBtn.onclick = closeModal;
  
  // Outside Click Close
  window.onclick = (e) => {
    if (e.target == modal) closeModal();
  };
  
  // Baaki ka code (Theme, Tilt etc.) yahan niche rahega...
  // ...
});
/* ================= 1. INITIALIZE SWIPER (UPDATED FOR LANDSCAPE) ================= */
  var swiper = new Swiper(".cert-swiper", {
    slidesPerView: 1, 
    spaceBetween: 20,
    loop: true,
    grabCursor: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      600: { slidesPerView: 2, spaceBetween: 20 }, // Tablet par 2 dikhenge
      1024: { slidesPerView: 3, spaceBetween: 30 }, // Desktop par 3 dikhenge
    },
  });
  /* ================= MATRIX RAIN EFFECT (DEVELOPER SNOW) ================= */
/* ================= SMART MATRIX RAIN (AUTO THEME) ================= */
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
const matrix = letters.split("");
const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) { drops[x] = 1; }

function drawMatrix() {
  // Check karein ki abhi Dark Mode hai ya Light Mode
  const isDark = document.body.classList.contains("dark");

  // 1. TRAIL EFFECT (Pichle frame ko dhundhla karna)
  if (isDark) {
    // Dark Mode: Black trail (Glow effect)
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
  } else {
    // Light Mode: White trail (Taaki screen kali na pade)
    ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  }
  
  // Puri screen par halki parat chadao
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 2. TEXT COLOR
  if (isDark) {
    ctx.fillStyle = "#6366f1"; // Neon Purple (Dark Theme)
  } else {
    ctx.fillStyle = "#4f46e5"; // Thoda Dark Purple (Light Theme ke liye visible)
  }
  
  ctx.font = fontSize + "px monospace";

  // 3. DROPS LOGIC
  for (let i = 0; i < drops.length; i++) {
    const text = matrix[Math.floor(Math.random() * matrix.length)];
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

// Animation start
setInterval(drawMatrix, 35);
/* ================= MOBILE MENU TOGGLE ================= */
const menuBtn = document.getElementById('menu-btn');
const navLinks = document.getElementById('nav-links');
const navLinksItems = document.querySelectorAll('.nav-link');

// 1. Toggle Menu on Click
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Animation for Bars (Optional X effect)
    const bars = menuBtn.querySelectorAll('.bar');
    if (navLinks.classList.contains('active')) {
      bars[0].style.transform = "rotate(45deg) translate(5px, 5px)";
      bars[1].style.opacity = "0";
      bars[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
    } else {
      bars[0].style.transform = "none";
      bars[1].style.opacity = "1";
      bars[2].style.transform = "none";
    }
  });
}

// 2. Close Menu when a Link is clicked
navLinksItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    // Reset Hamburger Icon
    const bars = menuBtn.querySelectorAll('.bar');
    bars[0].style.transform = "none";
    bars[1].style.opacity = "1";
    bars[2].style.transform = "none";
  });
});