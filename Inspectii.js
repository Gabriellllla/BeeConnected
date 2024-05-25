
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
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.getElementById("add-inspection-button").addEventListener("click", () => {
    const stupinaId = getQueryParam("stupinaId");
    const stupId = getQueryParam("stupId");
    if (stupinaId && stupId) {
        window.location.href = `AddInspection.html?stupinaId=${stupinaId}&stupId=${stupId}`;
    } else {
        alert("ID-ul stupinei sau al stupului lipsește din URL.");
    }
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userId = user.uid;
        const stupinaId = getQueryParam("stupinaId");
        const stupId = getQueryParam("stupId");
        
        if (!stupinaId || !stupId) {
            alert("ID-ul stupinei sau al stupului lipsește din URL.");
            return;
        }

        const inspectionListContainer = document.getElementById("inspection-list");

        try {
            const inspectiiRef = collection(db, "stupine", userId, "stupine", stupinaId, "stupi", stupId, "inspectii");
            const inspectiiSnapshot = await getDocs(inspectiiRef);

            inspectionListContainer.innerHTML = "";
            inspectiiSnapshot.forEach((inspectieDoc) => {
                const inspectieData = inspectieDoc.data();
                const inspectionElement = document.createElement("button");
                inspectionElement.classList.add("inspection-item");
                inspectionElement.textContent = `Inspecție ${inspectieData.date}`;
                inspectionElement.addEventListener("click", () => {
                    alert(JSON.stringify(inspectieData, null, 2));
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

// Funcție pentru a afișa dialogul cu inspecția
function showInspectionDialog(inspectieData) {
    const inspectionDialog = document.getElementById('inspection-dialog');
    const inspectionDetails = document.getElementById('inspection-details');
    inspectionDetails.innerHTML = `
        <h2>Detalii Inspecție</h2>
        <p><strong>Data:</strong> ${inspectieData.date}</p>
        <p><strong>Observații:</strong> ${inspectieData.observatii}</p>
        <p><strong>Concluzii:</strong> ${inspectieData.concluzii}</p>
        <p><strong>Acțiuni:</strong> ${inspectieData.actiuni}</p>
    `;
    inspectionDialog.style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function closeInspectionDialog() {
    const inspectionDialog = document.getElementById('inspection-dialog');
    inspectionDialog.style.display = 'none';
    document.getElementById('overlay').style.display = 'none';
}

document.getElementById('close-dialog').onclick = closeInspectionDialog;
// *****logout button******

document.addEventListener('DOMContentLoaded', function() {
    const logoutButton = document.getElementById('logout-button');
    const dialogOverlay = document.getElementById('dialog-overlay');
    const confirmLogout = document.getElementById('confirm-logout');
    const cancelLogout = document.getElementById('cancel-logout');

    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault();
            dialogOverlay.style.display = 'flex';
        });
    }

    if (confirmLogout) {
        confirmLogout.addEventListener('click', function() {
            window.location.href = 'index.html'; // Redirecționează la pagina de log in
        });
    }

    if (cancelLogout) {
        cancelLogout.addEventListener('click', function() {
            dialogOverlay.style.display = 'none';
        });
    }
});
