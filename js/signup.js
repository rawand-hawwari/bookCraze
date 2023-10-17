const firebaseConfig = {
  apiKey: "AIzaSyCQM2ALk3jc04MEhCxETa6wRIzhem_Tit8",
  authDomain: "e-library-4a89d.firebaseapp.com",
  projectId: "e-library-4a89d",
  storageBucket: "e-library-4a89d.appspot.com",
  messagingSenderId: "606843380299",
  appId: "1:606843380299:web:61a3bd9d75b1cc64eee3ce",
  measurementId: "G-259LECQSMQ",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

document.getElementById("signup").addEventListener("click", function (event) {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmpassword = document.getElementById("confirmpassword").value;
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const address = document.getElementById("address").value;

  let Successfulmsg0 = `<i class="fa-solid fa-circle-check" style="color: #18af45;"></i>  Successful Sign up`;

  let box = document.getElementById("check-box");

  function Successfulmsg() {
    let check = document.createElement("div");
    check.classList.add("check");
    box.appendChild(check);
    check.innerHTML = Successfulmsg0;
    setTimeout(() => {
      console.log("Removing check element");
      check.remove();
    }, 1600);
  }

  function showInvalidMsg(message) {
    let check = document.createElement("div");
    check.classList.add("check");
    box.appendChild(check);
    check.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color: #f2c218;"></i> ${message}`;
    setTimeout(() => {
      check.remove();
    }, 1600);
  }

  if (!firstname.trim() || !lastname.trim()) {
    showInvalidMsg("First name and last name are required.");
    return;
  } //The trim() method removes leading and trailing whitespace characters from a string.

  if (firstname.includes(" ")) {
    showInvalidMsg("Username cannot contain spaces.");
    return;
  }
  if (lastname.includes(" ")) {
    showInvalidMsg("Username cannot contain spaces.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showInvalidMsg("Invalid email format.");
    return;
  }

  if (
    password.length < 8 ||
    !/[0-9]/.test(password) ||
    !/[A-Z]/.test(password) ||
    !/[!@#$%^&*]/.test(password)
  ) {
    showInvalidMsg(
      "Password must be at least 8 characters and contain 1 number, 1 uppercase letter, and special characters."
    );
    return;
  }
  if (
    confirmpassword.length < 8 ||
    !/[0-9]/.test(confirmpassword) ||
    !/[A-Z]/.test(confirmpassword) ||
    !/[!@#$%^&*]/.test(confirmpassword)
  ) {
    showInvalidMsg(
      "Password must be at least 8 characters and contain 1 number, 1 uppercase letter, and special characters."
    );
  }
  if (password !== confirmpassword) {
    showInvalidMsg("passwords not matches");
    return;
  }

  const userData = {
    firstname: firstname,
    lastname: lastname,
    email: email,
    address: address,
    id: firebase.firestore.FieldValue.serverTimestamp(),
  };

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log(user);
      // Save user data to Firestore
      return db.collection("users").doc(email).set({
        firstname: firstname,
        lastname: lastname,
        email: email,
        address: address,
        userUID:userCredential.user.uid
      });
    })
    .then(() => {
      console.log("User data saved to Firestore successfully.");

      Successfulmsg();
      setTimeout(() => {
        window.location.href = "../HTML/signin.html";
      }, 3000);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      if (errorCode === "auth/email-already-in-use") {
        showInvalidMsg("Email already used!");
      } else {
        console.error("Error creating user:", error);
      }
    });
});