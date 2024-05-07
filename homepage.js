const db = firebase.firestore();

// Fetch parent information
const parentInfoDiv = document.getElementById("parentInfo");
const childInfoDiv = document.getElementById("childInfo");
const logoutBtn = document.getElementById("logoutBtn");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    const email = user.email;

    // Fetch parent information
    db.collection("parents")
      .doc(email)
      .get()
      .then((doc) => {
        if (doc.exists) {
          const parentData = doc.data();
          const parentInfoHTML = `
            <p><strong>Name:</strong> ${parentData.name}</p>
            <p><strong>Surname:</strong> ${parentData.surname}</p>
            <p><strong>Address:</strong> ${parentData.address}</p>
            <!-- Add more fields as needed -->
          `;
          parentInfoDiv.innerHTML = parentInfoHTML;
        } else {
          parentInfoDiv.innerHTML = "<p>No parent information found.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching parent information:", error);
        parentInfoDiv.innerHTML = "<p>Error fetching parent information.</p>";
      });

    // Fetch child information
    db.collection("parents")
      .doc(email)
      .collection("children")
      .get()
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          let childInfoHTML = "";
          querySnapshot.forEach((doc) => {
            const childData = doc.data();
            childInfoHTML += `
              <div class="child">
                <h3>Child Information</h3>
                <p><strong>Name:</strong> ${childData.name}</p>
                <p><strong>Age:</strong> ${childData.age}</p>
                <p><strong>Gender:</strong> ${childData.gender}</p>
                <!-- Add more fields as needed -->
              </div>
            `;
          });
          childInfoDiv.innerHTML = childInfoHTML;
        } else {
          childInfoDiv.innerHTML = "<p>No child information found.</p>";
        }
      })
      .catch((error) => {
        console.error("Error fetching child information:", error);
        childInfoDiv.innerHTML = "<p>Error fetching child information.</p>";
      });
  } else {
    // User is not logged in
    console.log("User is not logged in.");
  }
});

logoutBtn.addEventListener("click", () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("User logged out successfully");
      window.location.href = "index.html"; // Redirect to index.html after logout
    })
    .catch((error) => {
      console.error("Error logging out:", error);
    });
});
