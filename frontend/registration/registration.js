/* =========================
   SHRA REGISTRATION
========================= */

const registrationForm = document.getElementById("registrationForm");

const registrationDate = document.getElementById("registrationDate");

const mobileInput = document.getElementById("mobile");

const submitBtn = document.getElementById("submitBtn");

const formMessage = document.getElementById("formMessage");

const successOverlay = document.getElementById("successOverlay");

const successOkBtn = document.getElementById("successOkBtn");

const successName = document.getElementById("successName");

const successMobile = document.getElementById("successMobile");

const successEmail = document.getElementById("successEmail");

const successCollege = document.getElementById("successCollege");

const successCourse = document.getElementById("successCourse");

const successDate = document.getElementById("successDate");

const printBtn = document.getElementById("printBtn");

const successRegistrationId = document.getElementById("successRegistrationId");

/* =========================
   AUTOMATIC REGISTRATION DATE
========================= */

const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1).padStart(2, "0");

const day = String(today.getDate()).padStart(2, "0");

registrationDate.value = `${year}-${month}-${day}`;

/* =========================
   MOBILE NUMBER
========================= */

mobileInput.addEventListener("input", () => {
  mobileInput.value = mobileInput.value.replace(/\D/g, "");
});

/* =========================
   FORM SUBMIT
========================= */

registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  formMessage.className = "form-message";

  formMessage.textContent = "";

  /* =========================
           GET FORM DATA
        ========================== */

  const studentData = {
    name: document.getElementById("name").value.trim(),

    mobile: document.getElementById("mobile").value.trim(),

    email: document.getElementById("email").value.trim(),

    college: document.getElementById("college").value.trim(),

    currentCourse: document.getElementById("currentCourse").value.trim(),

    registrationDate: registrationDate.value,
  };

  /* =========================
           BASIC VALIDATION
        ========================== */

  if (studentData.mobile.length !== 10) {
    showMessage("Please enter a valid 10-digit mobile number.", "error");

    return;
  }

  /* =========================
           SEND TO BACKEND
        ========================== */

  try {
    submitBtn.disabled = true;

    submitBtn.textContent = "Registering...";

    const response = await fetch("https://shra-technology-advertisment.onrender.com/api/registrations", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(studentData),
    });

    const result = await response.json();

    /* =========================
               BACKEND RESPONSE
            ========================== */

    if (!response.ok) {
      throw new Error(result.message || "Registration failed.");
    }

    /* =========================
               SUCCESS
            ========================== */

    /* =========================
   SHOW SUCCESS OVERLAY
========================= */

    successRegistrationId.textContent = result.registrationId || result.id;

    successName.textContent = studentData.name;

    successMobile.textContent = studentData.mobile;

    successEmail.textContent = studentData.email;

    successCollege.textContent = studentData.college;

    successCourse.textContent = studentData.currentCourse;

    successDate.textContent = registrationDate.value;

    /* Show overlay */

    successOverlay.classList.add("active");
  } catch (error) {
    console.error(error);

    showMessage(
      error.message || "Something went wrong. Please try again.",
      "error",
    );
  } finally {
    submitBtn.disabled = false;

    submitBtn.textContent = "Register for Free Week";
  }
});

/* =========================
   MESSAGE FUNCTION
========================= */

function showMessage(message, type) {
  formMessage.textContent = message;

  formMessage.className = `form-message ${type}`;
}

/* =========================
   OK BUTTON
========================= */

successOkBtn.addEventListener("click", () => {
  window.location.href = "/";
});

// when user click to print
printBtn.addEventListener("click", () => {
  const registrationId = successRegistrationId.textContent.trim();

  const studentName = successName.textContent
    .trim()
    .replace(/[^a-zA-Z0-9]/g, "-");

  document.title = `SHRA-Registration-${registrationId}-${studentName}`;

  window.print();
});
