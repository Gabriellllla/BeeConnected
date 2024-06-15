import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, setPersistence, browserSessionPersistence  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, doc, updateDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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
setPersistence(auth, browserSessionPersistence)
  .then(() => {
    // Autentificarea persistentă a fost activată cu succes
    // Utilizatorul va rămâne autentificat între sesiuni
  })
  .catch((error) => {
    // Tratează eventualele erori survenite în timpul configurării autentificării persistente
    console.error("Eroare la configurarea autentificării persistente:", error);
  });
  
const db = getFirestore(app);

// Referințele către elementele HTML
const emailInputEl = document.getElementById("email");
const parolaInputEl = document.getElementById("parola");
const loginButtonEl = document.getElementById("login-button");
const resetPasswordLinkEl = document.getElementById("reset-password-link");
const resetPasswordContainerEl = document.getElementById("reset-password-container");
const loginContainerEl = document.getElementById("login-container");
const resetEmailInputEl = document.getElementById("reset-email");
const resetButtonEl = document.getElementById("reset-button");
const backToLoginLinkEl = document.getElementById("back-to-login-link");

// Adăugarea unui listener pentru butonul de înregistrare
loginButtonEl.addEventListener("click", function() {
    // Obținerea valorilor introduse de utilizator
    const email = emailInputEl.value;
    const parola = parolaInputEl.value;

    // Încercarea de a autentifica userul în cont cu adresa de email și parola
    signInWithEmailAndPassword(auth, email, parola)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Autentificare reușită pentru:", user.email);

            // Obțineți referința către documentul utilizatorului în Firestore
            const userDocRef = doc(db, "users", user.uid);

            // Obțineți datele utilizatorului din Firestore
            getDoc(userDocRef)
                .then((doc) => {
                    if (doc.exists()) {
                        const userData = doc.data();

                        // Verificați dacă utilizatorul a mai vizitat pagina de bun venit
                        if (!userData.visitedWelcomePage) {
                            // Redirecționați utilizatorul către pagina de bun venit
                            window.location.href = "welcome.html";

                            // Actualizați valoarea câmpului visitedWelcomePage pentru a indica că utilizatorul a vizitat pagina de bun venit
                            // De exemplu, actualizați documentul utilizatorului în Firestore
                            updateDoc(userDocRef, {
                                visitedWelcomePage: true
                            });
                        } else {
                            // Utilizatorul a mai vizitat deja pagina de bun venit
                            window.location.href = "home.html";
                            
                        }
                    }
                })
                .catch((error) => {
                    console.error("Eroare la obținerea datelor utilizatorului:", error);
                    
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Eroare la autentificare:", errorMessage);
            
            window.location.href = "recuperare-parola.html";
     
        });
});

// Logica pentru resetarea parolei
resetPasswordLinkEl.addEventListener("click", function() {
    loginContainerEl.classList.add("hidden");
    resetPasswordContainerEl.classList.remove("hidden");
});

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
        });
});

// Eveniment de click pentru linkul de întoarcere la autentificare
backToLoginLinkEl.addEventListener("click", function() {
    resetPasswordContainerEl.classList.add("hidden");
    loginContainerEl.classList.remove("hidden");
});
