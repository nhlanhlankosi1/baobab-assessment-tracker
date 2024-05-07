// Initialize Firestore
const db = firebase.firestore();

const parentForm = document.getElementById("parentForm");
const childForm = document.getElementById("childForm");
const nameInput = document.getElementById("name");
const surnameInput = document.getElementById("surname");
const addressInput = document.getElementById("address");
const childNameInput = document.getElementById("childName");
const ageInput = document.getElementById("age");
const genderInput = document.getElementById("gender");

parentForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = nameInput.value;
  const surname = surnameInput.value;
  const address = addressInput.value;
  // Get parent's email from the Firebase Auth user object
  const email = firebase.auth().currentUser.email;
  db.collection("parents")
    .doc(email)
    .set({
      name: name,
      surname: surname,
      address: address,
      // Add more fields as needed
    })
    .then(() => {
      console.log("Parent information saved");
    })
    .catch((error) => {
      console.error("Error saving parent information:", error);
      // Handle error
    });
});

childForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const childName = childNameInput.value;
  const age = ageInput.value;
  const gender = genderInput.value;
  // Get parent's email from the Firebase Auth user object
  const email = firebase.auth().currentUser.email;

  // Generate a unique key for the child
  const childKey = db.collection("children").doc().id;

  // Save child information to Firestore
  db.collection("parents")
    .doc(email)
    .collection("children")
    .doc(childKey)
    .set({
      name: childName,
      age: age,
      gender: gender,
      // Add more fields as needed
    })
    .then(() => {
      console.log("Child information saved");
      // Redirect to homepage.html
      window.location.href = "homepage.html";
    })
    .catch((error) => {
      console.error("Error saving child information:", error);
      // Handle error
    });
});
