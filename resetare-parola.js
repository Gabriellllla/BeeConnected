import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

// Configurarea Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDY4OQCbazOZQ9EIFZR5iY1tfV5yQ2IJ4g",
  authDomain: "bee-connected-2a01a.firebaseapp.com",
  databaseURL: "https://bee-connected-2a01a-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "bee-connected-2a01a",
  storageBucket: "bee-connected-2a01a.appspot.com",
  messagingSenderId: "1037546953098",
  appId: "1:1037546953098:web:66810ebfba86ff36111073",
  measurementId: "G-00SQH47GGE"
};

// Inițializarea aplicației Firebase
const app = initializeApp(firebaseConfig);

// Obținerea serviciului de autentificare
const auth = getAuth(app);

// Referințele către elementele HTML
const resetEmailInputEl = document.getElementById("reset-email");
const resetButtonEl = document.getElementById("reset-button");
const backToLoginLinkEl = document.getElementById("back-to-login-link");

// Eveniment de click pentru butonul de resetare a parolei
resetButtonEl.addEventListener("click", function() {
    const email = resetEmailInputEl.value;

    sendPasswordResetEmail(auth, email)
        .then(() => {
            console.log("Email pentru resetarea parolei trimis cu succes");
            alert("Un email pentru resetarea parolei a fost trimis. Verifică căsuța de email.");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Eroare la trimiterea emailului pentru resetarea parolei:", errorMessage);
            alert("A apărut o eroare la trimiterea emailului. Te rugăm să încerci din nou.");
        });
});
