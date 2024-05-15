import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

document.getElementById("add-hive-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const hiveName = document.getElementById("hive-name").value;
    const hiveType = document.getElementById("hive-type").value;

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userId = user.uid;
            const stupineRef = collection(db, "stupine", userId, "stupine");
            const stupiRef = collection(stupineRef.doc(), "stupi"); // Referința către colecția "stupi" în cadrul colecției "stupine"

            const hiveData = {
                name: hiveName,
                type: hiveType
            };
            
            try {
                await addDoc(stupiRef, hiveData);
                alert("Stup adăugat cu succes!");
                window.location.href = "stupina.html"; // Redirecționează utilizatorul către lista de stupi
            } catch (error) {
                console.error("Eroare la adăugarea stupului:", error);
                alert("A apărut o eroare. Vă rugăm să încercați din nou.");
            }
        } else {
            console.log("Utilizatorul nu este autentificat.");
        }
    });
});