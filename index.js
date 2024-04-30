
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
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
const db = getFirestore(app);



// Referințele către elementele HTML
const emailInputEl = document.getElementById("email");
const parolaInputEl = document.getElementById("parola");
const loginButtonEl = document.getElementById("login-button");


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
                            window.location.href = "succes.html";
                            // Poate fi redirecționat către altă pagină sau puteți lua alte acțiuni necesare
                        }
                    }
                })
                .catch((error) => {
                    console.error("Eroare la obținerea datelor utilizatorului:", error);
                   
                    // Poți afișa un mesaj de eroare către utilizator sau să iei alte măsuri necesare
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Eroare la autentificare:", errorMessage);
            // Poți afișa un mesaj de eroare către utilizator sau să iei alte măsuri necesare
        });
});