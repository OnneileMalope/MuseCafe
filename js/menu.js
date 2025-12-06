// Menu Page JavaScript
document.addEventListener("DOMContentLoaded", function () {
  // Menu Category Navigation
  const categoryButtons = document.querySelectorAll(".category-btn");
  const menuSections = document.querySelectorAll(".menu-section");

  // Set first section as active by default
  if (menuSections.length > 0) {
    menuSections[0].classList.add("active");
  }

  // Add click event to category buttons
  categoryButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Get target section id
      const targetId = this.getAttribute("href").substring(1);

      // Hide all menu sections
      menuSections.forEach((section) => {
        section.classList.remove("active");
        section.style.display = "none";
      });

      // Show target section
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.style.display = "block";
        setTimeout(() => {
          targetSection.classList.add("active");
        }, 10);

        // Smooth scroll to section
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Create PDF Menu (if needed)
  function createPDFMenu() {
    // This is a placeholder function
    // In a real implementation, you would generate or link to an actual PDF
    console.log("PDF menu generation would happen here");
  }

  // Download button functionality
  const downloadButtons = document.querySelectorAll(
    ".download-btn, .download-btn-large"
  );
  downloadButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Optional: Track downloads
      console.log("Menu download initiated");

      // Optional: Add loading state
      const originalText = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';

      setTimeout(() => {
        this.innerHTML = originalText;
      }, 1500);
    });
  });

  // Lazy loading for menu images
  const menuImages = document.querySelectorAll(".menu-item img");
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.add("loaded");
        }
        observer.unobserve(img);
      }
    });
  });

  // Initialize lazy loading
  menuImages.forEach((img) => {
    if (img.complete && img.naturalHeight !== 0) {
      // Image already loaded
      img.classList.add("loaded");
    } else {
      imageObserver.observe(img);
    }
  });

  // Add hover effects for menu items
  const menuItems = document.querySelectorAll(".menu-item");
  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
      this.style.boxShadow = "0 5px 15px rgba(0, 0, 0, 0.05)";
    });
  });
});
