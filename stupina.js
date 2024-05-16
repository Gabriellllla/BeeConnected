import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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
    window.location.href = `AddHive.html?stupinaId=${stupinaId}`;
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userId = user.uid;
        const urlParams = new URLSearchParams(window.location.search);
        const stupinaId = urlParams.get("id");
        const hiveListContainer = document.getElementById("hive-list");
        hiveListContainer.innerHTML = ""; // Golește conținutul înainte de a adăuga stupii

        try {
            const hiveSnapshot = await getDocs(collection(db, "stupine", userId, "stupine", stupinaId, "stupi"));
            hiveSnapshot.forEach((doc) => {
                const hive = doc.data();
                const hiveElement = document.createElement("button");
                hiveElement.classList.add("hive-item");
                hiveElement.textContent = `Nume: ${hive.name}, Tip: ${hive.type}`;
                hiveElement.addEventListener("click", () => {
                    window.location.href = `inspectii.html?stupinaId=${stupinaId}&stupId=${doc.id}`;
                });
                hiveListContainer.appendChild(hiveElement);
            });
        } catch (error) {
            console.error("Eroare la obținerea stupilor:", error);
        }
    } else {
        console.log("Utilizatorul nu este autentificat.");
    }
});