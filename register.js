// import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
// import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
// import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

// const appSettings = {
//   databaseURL: "https://bee-connected-2a01a-default-rtdb.europe-west1.firebasedatabase.app/"
// }

// const app = initializeApp(appSettings);
// const database = getDatabase(app);
// const utilizatoriInDB = ref(database, "utilizatori");

// const numeInputEl = document.getElementById("nume");
// const prenumeInputEl = document.getElementById("prenume");
// const emailInputEl = document.getElementById("email");
// const parolaInputEl = document.getElementById("parola");
// const registerButtonEl = document.getElementById("register-button");

// registerButtonEl.addEventListener("click", function(){
//     const nume = numeInputEl.value;
//     const prenume = prenumeInputEl.value;
//     const email = emailInputEl.value;
//     const parola = parolaInputEl.value;

//     // Înregistrare utilizator cu adresa de email și parola
//     createUserWithEmailAndPassword(app.auth(), email, parola)
//         .then((userCredential) => {
//             // Salvare date suplimentare în baza de date
//             const userData = {
//                 nume: nume,
//                 prenume: prenume,
//                 email: email
//             };

//             // Salvare în baza de date
//             push(utilizatoriInDB, userData)
//                 .then(() => {
//                     console.log("Utilizator înregistrat și datele salvate în Firebase.");
//                     // Redirecționați utilizatorul către altă pagină sau efectuați alte acțiuni necesare
//                 })
//                 .catch((error) => {
//                     console.error("Eroare la salvarea datelor în Firebase: ", error);
//                 });
//         })
//         .catch((error) => {
//             console.error("Eroare la înregistrare în Firebase: ", error);
//         });
// });


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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
            window.location.href = "succes.html";
            // Redirecționarea utilizatorului către altă pagină sau alte acțiuni necesare
        })
        .catch((error) => {
            // Crearea contului a eșuat
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Eroare la crearea contului:", errorMessage);
            // Poți afișa un mesaj de eroare către utilizator sau să iei alte măsuri necesare
        });
});