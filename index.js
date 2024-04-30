
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, doc, updateDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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

     // Încercarea de a autentifica userul in cont cu adresa de email și parola
    signInWithEmailAndPassword(auth, email, parola)
        .then(async(userCredential) => {
            // Autentificare reușită
            const user = userCredential.user;
            console.log("Autentificare reușită pentru:", user.email);


// Verificăm dacă utilizatorul este nou sau existent
const userDocRef = doc(db, "users", user.uid);
const userDocSnap = await getDoc(userDocRef);
const userData = userDocSnap.data();
if (!userData || !userData.firstLogin) {
    // Utilizatorul este nou sau nu a mai vizitat pagina de bun venit

    // Actualizăm profilul utilizatorului
    await updateProfile(user, { displayName: email.split("@")[0] });

    // Actualizăm starea de "firstLogin" în baza de date a utilizatorului
    if (!userData) {
        // Dacă utilizatorul este nou, creăm un document nou în colecția "users"
        await setDoc(userDocRef, { firstLogin: true });
    } else {
        // Dacă utilizatorul există deja, actualizăm documentul existent
        await updateDoc(userDocRef, { firstLogin: true });
    }


            window.location.href = "welcome.html";
            // Redirecționează utilizatorul către altă pagină sau efectuează alte acțiuni necesare
}
else {
    // Utilizatorul a mai vizitat deja pagina de bun venit
                // Redirecționăm utilizatorul către pagina principală sau altă pagină relevantă
                window.location.href = "succes.html";
}
        })
        .catch((error) => {
            // Autentificare eșuată
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Eroare la autentificare:", errorMessage);
            // Poți afișa un mesaj de eroare către utilizator sau să iei alte măsuri necesare
        });
});
