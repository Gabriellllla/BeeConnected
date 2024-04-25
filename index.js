// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";

// const firebaseApp = initializeApp({
//   apiKey: "AIzaSyDY4OQCbazOZQ9EIFZR5iY1tfV5yQ2IJ4g",
//   authDomain: "bee-connected-2a01a.firebaseapp.com",
//   databaseURL: "https://bee-connected-2a01a-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "bee-connected-2a01a",
//   storageBucket: "bee-connected-2a01a.appspot.com",
//   messagingSenderId: "1037546953098",
//   appId: "1:1037546953098:web:66810ebfba86ff36111073",
//   measurementId: "G-00SQH47GGE"
// });

// const analytics = getAnalytics(app);
// const app = initializeApp(firebaseApp);


import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


const appSettings = {
  databaseURL: "https://bee-connected-2a01a-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const utilizatoriInDB = ref(database, "utilizatori");

const numeInputEl = document.getElementById("nume");
const prenumeInputEl = document.getElementById("prenume");
const emailInputEl = document.getElementById("email");
const parolaInputEl = document.getElementById("parola");
const registerButtonEl = document.getElementById("register-button");

registerButtonEl.addEventListener("click", function(){
    const nume = numeInputEl.value;
    const prenume = prenumeInputEl.value;
    const email = emailInputEl.value;
    const parola = parolaInputEl.value;

    // Înregistrare utilizator cu adresa de email și parola
    createUserWithEmailAndPassword(app.auth(), email, parola)
        .then((userCredential) => {
            // Salvare date suplimentare în baza de date
            const userData = {
                nume: nume,
                prenume: prenume,
                email: email
            };

            // Salvare în baza de date
            push(utilizatoriInDB, userData)
                .then(() => {
                    console.log("Utilizator înregistrat și datele salvate în Firebase.");
                    // Redirecționați utilizatorul către altă pagină sau efectuați alte acțiuni necesare
                })
                .catch((error) => {
                    console.error("Eroare la salvarea datelor în Firebase: ", error);
                });
        })
        .catch((error) => {
            console.error("Eroare la înregistrare în Firebase: ", error);
        });
});


// const inputFieldEl = document.getElementById("input-field");
// const addButtonEl =  document.getElementById("add-button");

// addButtonEl.addEventListener("click", function(){
//   let inputValue = inputFieldEl.value;

//   push(utilizatoriInDB, inputValue);

//   console.log(`${inputValue} added to database`);
  
// });

