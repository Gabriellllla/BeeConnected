
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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

document.getElementById("add-inspection-button").addEventListener("click", () => {
    const urlParams = new URLSearchParams(window.location.search);
    const stupinaId = urlParams.get("stupinaId");
    const stupId = urlParams.get("stupId");
    window.location.href = `AddInspection.html?stupinaId=${stupinaId}&stupId=${stupId}`; // Redirecționează utilizatorul către pagina de adăugare a unei inspecții
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userId = user.uid;
        const urlParams = new URLSearchParams(window.location.search);
        const stupinaId = urlParams.get("stupinaId");
        const stupId = urlParams.get("stupId");
        const inspectionListContainer = document.getElementById("inspection-list");
        inspectionListContainer.innerHTML = ""; // Golește conținutul înainte de a adăuga inspecțiile

        try {
            const inspectionSnapshot = await getDocs(collection(db, "stupine", userId, "stupine", stupinaId, "stupi", stupId, "inspectii"));
            inspectionSnapshot.forEach((doc) => {
                const inspection = doc.data();
                const inspectionElement = document.createElement("button");
                inspectionElement.classList.add("inspection-item");
                inspectionElement.textContent = `Inspectie: ${inspection.data}`;
                inspectionElement.addEventListener("click", () => {
                    window.location.href = `InspectieDetalii.html?stupinaId=${stupinaId}&stupId=${stupId}&inspectieId=${doc.id}`;
                });
                inspectionListContainer.appendChild(inspectionElement);
            });
        } catch (error) {
            console.error("Eroare la obținerea inspecțiilor:", error);
        }
    } else {
        console.log("Utilizatorul nu este autentificat.");
    }
});
