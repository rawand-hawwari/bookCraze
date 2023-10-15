import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-auth.js';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js';
import { getFirestore, doc, getDoc } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js';

const firebaseConfig = {
    apiKey: "AIzaSyCQM2ALk3jc04MEhCxETa6wRIzhem_Tit8",
    authDomain: "e-library-4a89d.firebaseapp.com",
    projectId: "e-library-4a89d",
    storageBucket: "e-library-4a89d.appspot.com",
    messagingSenderId: "606843380299",
    appId: "1:606843380299:web:61a3bd9d75b1cc64eee3ce",
    measurementId: "G-259LECQSMQ"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let box = document.getElementById("check-box2");

document.getElementById('signin').addEventListener('click', async function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    function showInvalidMsg(message) {
        let check = document.createElement("div");
        check.classList.add("check")
        box.appendChild(check);
        check.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color: #f2c218;"></i> ${message}`;
        setTimeout(() => {
            check.remove();
        }, 1600);
    }

    function Successfulmsg(message) {
        let check = document.createElement("div");
        check.classList.add("check")
        box.appendChild(check);
        check.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #18af45;"></i> ${message}`;
        setTimeout(() => {
            console.log("Removing check element");
            check.remove();
        }, 1600)
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
        showInvalidMsg("Invalid password format.");
        return;
    }


    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            // Fetch user data from Firestore
            return getDoc(doc(db, 'users', email)); // name of collection 'users'
        })
        .then((docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                const userJSON = JSON.stringify({
                    firstname: userData.firstname,
                    lastname: userData.lastname,
                    address: userData.address, 
                });
                Successfulmsg(`${userData.firstname} ${userData.lastname} login successfully`);
                setTimeout(() => {
                    window.location.href = "../index.html"; //here to go to homepage
                    fetch("http://localhost:3000/data", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: userJSON,
                    })
                        .then(response => {
                            if (!response.ok) {
                                throw new Error(`HTTP error! Status: ${response.status}`);
                            }
                            return response.json();
                        })
                        .catch(error => console.error("Error sign up:", error));
                }, 1600);
            } else {
                showInvalidMsg("User data not found.");
            }
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
                showInvalidMsg("Invalid email or password. Please try again.");
            } else {
                console.error(errorCode, errorMessage);
            }
        });
});
