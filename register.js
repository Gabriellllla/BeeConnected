
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";


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
const numeInputEl = document.getElementById("nume");
const prenumeInputEl = document.getElementById("prenume");
const emailInputEl = document.getElementById("email");
const parolaInputEl = document.getElementById("parola");
const registerButtonEl = document.getElementById("register-button");

// Adăugarea unui listener pentru butonul de înregistrare
registerButtonEl.addEventListener("click", function() {
    // Obținerea valorilor introduse de utilizator
    const nume = numeInputEl.value;
    const prenume = prenumeInputEl.value;
    const email = emailInputEl.value;
    const parola = parolaInputEl.value;

    // Încercarea de a crea un cont nou cu adresa de email și parola
    createUserWithEmailAndPassword(auth, email, parola)
        .then((userCredential) => {
            // Crearea contului a reușit
            const user = userCredential.user;
            console.log("Cont creat cu succes pentru:", user.email);

            const userDocRef = doc(db, "users", user.uid);
            setDoc(userDocRef, {
                nume: nume,
                prenume: prenume,
                email: email
                // Alte date pe care dorești să le salvezi
            }).then(() => {
                console.log("Datele utilizatorului salvate în Firestore cu succes");
                window.location.href = "index.html";
                // Redirecționarea utilizatorului către altă pagină sau alte acțiuni necesare
            }).catch((error) => {
                console.error("Eroare la salvarea datelor utilizatorului:", error);
                // Poți afișa un mesaj de eroare către utilizator sau să iei alte măsuri necesare
            });

           
        })
        .catch((error) => {
            // Crearea contului a eșuat
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Eroare la crearea contului:", errorMessage);
            // Poți afișa un mesaj de eroare către utilizator sau să iei alte măsuri necesare
        });
});