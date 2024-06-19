import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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

document.getElementById("add-hive-button").addEventListener("click", () => {
    const stupinaId = getQueryParam("stupinaId");
    if (stupinaId) {
        window.location.href = `AddHive.html?stupinaId=${stupinaId}`;
    } else {
        alert("ID-ul stupinei lipsește din URL.");
    }
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userId = user.uid;
        const stupinaId = getQueryParam("stupinaId");
        if (!stupinaId) {
            alert("ID-ul stupinei lipsește din URL.");
            return;
        }

        const hiveListContainer = document.getElementById("hive-list");
        hiveListContainer.innerHTML = ""; // Golește conținutul înainte de a adăuga stupii

        try {
            const stupiRef = collection(db, "stupine", userId, "stupine", stupinaId, "stupi");
            const stupiSnapshot = await getDocs(stupiRef);
            hiveListContainer.innerHTML = "";

            let warningMessage = "";
            let showWarning = false;
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1;
            const isWinter = currentMonth <= 2 || currentMonth === 12;

            const promises = stupiSnapshot.docs.map(async (stupDoc) => {
                const stupData = stupDoc.data();

                console.log("Nume: " + stupData.name + ", Tip: " + stupData.type);
                const hiveElement = document.createElement("button");
                hiveElement.classList.add("hive-item");
                hiveElement.textContent = `Nume: ${stupData.name}, Tip: ${stupData.type}`;
                hiveElement.addEventListener("click", () => {
                    window.location.href = `inspectii.html?stupinaId=${stupinaId}&stupId=${stupDoc.id}`;
                });
                hiveListContainer.appendChild(hiveElement);

                const inspectiiRef = collection(db, "stupine", userId, "stupine", stupinaId, "stupi", stupDoc.id, "inspectii");
                const inspectiiSnapshot = await getDocs(inspectiiRef);

                inspectiiSnapshot.forEach((inspectieDoc) => {
                    const inspectieData = inspectieDoc.data();
                    const inspectieDate = new Date(inspectieData.date);
                    const timeDifference = Math.abs(currentDate - inspectieDate);
                    const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

                    // Verifică dacă avertismentul trebuie afișat
                    if ((isWinter && dayDifference > 30) || (!isWinter && dayDifference > 7)) {
                        warningMessage += `Stupul ${stupData.name} nu a fost inspectat de ${dayDifference} zile.\n`;
                        showWarning = true;
                    }
                });
            });

            await Promise.all(promises);

            if (showWarning) {
                const warningDialogOverlay = document.getElementById("warning-dialog-overlay");
                const warningMessageElement = document.getElementById("warning-message");
                warningMessageElement.textContent = warningMessage;
                warningDialogOverlay.style.display = "flex";

                const closeWarningButton = document.getElementById("close-warning");
                closeWarningButton.addEventListener("click", () => {
                    warningDialogOverlay.style.display = "none";
                });
            }
        } catch (error) {
            console.error("Eroare la obținerea stupilor:", error);
        }
    } else {
        console.log("Utilizatorul nu este autentificat.");
    }
});

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
