const authForm = document.getElementById("authForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const toggleRegister = document.getElementById("toggleRegister");

toggleRegister.addEventListener("click", () => {
  authForm.reset();
  toggleRegister.style.display = "none";
});

authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("Signed in:", user);
      // Redirect or handle success
      // Redirect to homepage.html
      window.location.href = "homepage.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error("Error:", errorMessage);
      // Handle error
    });
});
