// Mobile menu
    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");

      if (navLinks.classList.contains("active")) {
        menuBtn.textContent = "✕";
      } else {
        menuBtn.textContent = "☰";
      }
    });


    // Close mobile menu after clicking a link
    document.querySelectorAll(".nav-links a").forEach(link => {

      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        menuBtn.textContent = "☰";
      });

    });


    // Automatically show current year
    document.getElementById("year").textContent =
      new Date().getFullYear();


    // Smooth scroll fallback
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

      anchor.addEventListener("click", function (event) {

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
          event.preventDefault();

          target.scrollIntoView({
            behavior: "smooth"
          });
        }

      });

    });