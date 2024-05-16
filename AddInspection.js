import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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

document.getElementById("add-inspection-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const inspectionDate = document.getElementById("inspection-date").value;
    const hasQueen = document.getElementById("has-queen").checked;
    const hasBrood = document.getElementById("has-brood").checked;
    const hasDisease = document.getElementById("has-disease").checked;
    const diseaseType = hasDisease ? document.getElementById("disease-type").value : null;
    const hasFed = document.getElementById("has-fed").checked;
    const feedTypes = hasFed ? Array.from(document.getElementById("feed-type").selectedOptions).map(option => option.value) : [];

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userId = user.uid;
            const urlParams = new URLSearchParams(window.location.search);
            const stupinaId = urlParams.get("stupinaId");
            const stupId = urlParams.get("stupId");

            const inspectionData = {
                date: inspectionDate,
                hasQueen,
                hasBrood,
                hasDisease,
                diseaseType,
                hasFed,
                feedTypes
            };

            try {
                await addDoc(collection(db, "stupine", userId, "stupine", stupinaId, "stupi", stupId, "inspectii"), inspectionData);
                alert("Inspecție adăugată cu succes!");
                window.location.href = `inspectii.html?stupinaId=${stupinaId}&stupId=${stupId}`; // Redirecționează utilizatorul către lista de inspecții
            } catch (error) {
                console.error("Eroare la adăugarea inspecției:", error);
                alert("A apărut o eroare. Vă rugurăm să încercați din nou mai târziu.");
            }
            } else {
            console.log("Utilizatorul nu este autentificat.");
            }
            });
            });
