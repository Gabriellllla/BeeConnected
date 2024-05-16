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

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.getElementById("diseases-present").addEventListener("change", (event) => {
    document.getElementById("disease-options").style.display = event.target.checked ? "block" : "none";
});

document.getElementById("feeding").addEventListener("change", (event) => {
    document.getElementById("feeding-options").style.display = event.target.checked ? "block" : "none";
});

document.getElementById("add-inspection-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const inspectionDate = document.getElementById("inspection-date").value;
    const queenPresent = document.getElementById("queen-present").checked;
    const broodPresent = document.getElementById("brood-present").checked;
    const diseasesPresent = document.getElementById("diseases-present").checked;
    const diseaseType = diseasesPresent ? document.getElementById("disease-type").value : null;
    const feeding = document.getElementById("feeding").checked;
    const feedingType = feeding ? Array.from(document.getElementById("feeding-type").selectedOptions).map(option => option.value) : null;

    const inspectionData = {
        date: inspectionDate,
        queenPresent: queenPresent,
        broodPresent: broodPresent,
        diseasesPresent: diseasesPresent,
        diseaseType: diseaseType,
        feeding: feeding,
        feedingType: feedingType
    };

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userId = user.uid;
            const stupinaId = getQueryParam("stupinaId");
            const stupId = getQueryParam("stupId");
            
            if (!stupinaId || !stupId) {
                alert("ID-ul stupinei sau al stupului lipsește din URL.");
                return;
            }

            const inspectiiRef = collection(db, "stupine", userId, "stupine", stupinaId, "stupi", stupId, "inspectii");
            
            try {
                await addDoc(inspectiiRef, inspectionData);
                alert("Inspecție adăugată cu succes!");
                window.location.href = `inspectii.html?stupinaId=${stupinaId}&stupId=${stupId}`;
            } catch (error) {
                console.error("Eroare la adăugarea inspecției:", error);
                alert("A apărut o eroare. Vă rugăm să încercați din nou.");
            }
        } else {
            console.log("Utilizatorul nu este autentificat.");
        }
    });
});