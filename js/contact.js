document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const charCount = document.getElementById("charCount");
  const successModal = document.getElementById("successModal");
  const closeModal = document.getElementById("closeModal");

  messageInput.addEventListener("input", function () {
    const count = this.value.length;
    charCount.textContent = count;

    if (count > 500) {
      this.value = this.value.substring(0, 500);
      charCount.textContent = 500;
    }
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    let isValid = true;

    document.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = "";
    });

    if (!nameInput.value.trim()) {
      document.getElementById("nameError").textContent =
        "Please enter your name";
      isValid = false;
      nameInput.style.borderColor = "#ff6b6b";
    } else {
      nameInput.style.borderColor = "#8b5e3c";
    }

    if (!emailInput.value.trim()) {
      document.getElementById("emailError").textContent =
        "Please enter your email";
      isValid = false;
      emailInput.style.borderColor = "#ff6b6b";
    } else if (!validateEmail(emailInput.value)) {
      document.getElementById("emailError").textContent =
        "Please enter a valid email address";
      isValid = false;
      emailInput.style.borderColor = "#ff6b6b";
    } else {
      emailInput.style.borderColor = "#8b5e3c";
    }

    if (!messageInput.value.trim()) {
      document.getElementById("messageError").textContent =
        "Please enter your message";
      isValid = false;
      messageInput.style.borderColor = "#ff6b6b";
    } else if (messageInput.value.trim().length < 10) {
      document.getElementById("messageError").textContent =
        "Message must be at least 10 characters";
      isValid = false;
      messageInput.style.borderColor = "#ff6b6b";
    } else {
      messageInput.style.borderColor = "#8b5e3c";
    }

    const privacyCheckbox = document.getElementById("privacy");
    if (!privacyCheckbox.checked) {
      document.getElementById("privacyError").textContent =
        "You must agree to the Privacy Policy";
      isValid = false;
    }

    if (isValid) {
      const submitBtn = contactForm.querySelector(".submit-btn");
      const originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        contactForm.reset();
        charCount.textContent = "0";

        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;

        successModal.style.display = "flex";
      }, 1500);
    }
  });

  closeModal.addEventListener("click", function () {
    successModal.style.display = "none";
  });

  successModal.addEventListener("click", function (e) {
    if (e.target === successModal) {
      successModal.style.display = "none";
    }
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && successModal.style.display === "flex") {
      successModal.style.display = "none";
    }
  });

  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const answer = this.nextElementSibling;
      const isActive = this.classList.contains("active");

      faqQuestions.forEach((q) => {
        q.classList.remove("active");
        q.nextElementSibling.classList.remove("active");
      });

      if (!isActive) {
        this.classList.add("active");
        answer.classList.add("active");
      }
    });
  });

  nameInput.addEventListener("input", function () {
    if (this.value.trim()) {
      document.getElementById("nameError").textContent = "";
      this.style.borderColor = "#8b5e3c";
    }
  });

  emailInput.addEventListener("input", function () {
    if (this.value.trim() && validateEmail(this.value)) {
      document.getElementById("emailError").textContent = "";
      this.style.borderColor = "#8b5e3c";
    }
  });

  messageInput.addEventListener("input", function () {
    if (this.value.trim().length >= 10) {
      document.getElementById("messageError").textContent = "";
      this.style.borderColor = "#8b5e3c";
    }
  });

  const phoneInput = document.getElementById("phone");
  phoneInput.addEventListener("input", function () {
    let value = this.value.replace(/\D/g, "");
    if (value.length > 3 && value.length <= 6) {
      value = "(" + value.substring(0, 3) + ") " + value.substring(3);
    } else if (value.length > 6) {
      value =
        "(" +
        value.substring(0, 3) +
        ") " +
        value.substring(3, 6) +
        "-" +
        value.substring(6, 10);
    }
    this.value = value;
  });
});
