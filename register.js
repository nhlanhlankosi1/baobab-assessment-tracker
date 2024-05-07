// Initialize Firebase Auth and Firestore
const auth = firebase.auth();
const db = firebase.firestore();

const registerForm = document.getElementById("registerForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;

  // Register user with Firebase Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // Create parent document in Firestore
      return db.collection("parents").doc(email).set({});
    })
    .then(() => {
      console.log("Parent document created");
      // Redirect to user_info.html
      window.location.href = "user_info.html";
    })
    .catch((error) => {
      console.error("Error registering user:", error);
      // Handle error
    });
});
