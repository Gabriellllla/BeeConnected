import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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

document.getElementById("add-hive-button").addEventListener("click", () => {
    window.location.href = "AddHive.html"; // Redirecționează utilizatorul către pagina de adăugare a unui stup
});

onAuthStateChanged(auth, async (user) => {
    if (user) {
        const userId = user.uid;
        const userStupineRef = collection(db, "stupine", userId, "stupine");
        const stupineSnapshot = await getDocs(userStupineRef);

        stupineSnapshot.forEach(async (stupinaDoc) => {
            const stupinaId = stupinaDoc.id;
            const stupiRef = collection(db, "stupine", userId, "stupine", stupinaId, "stupi");
            const stupiSnapshot = await getDocs(stupiRef);

            stupiSnapshot.forEach((stupDoc) => {
                const stupData = stupDoc.data();
                console.log("Nume: " + stupData.nume + ", Tip: " + stupData.tip);
            });
        });
    } else {
        console.log("Utilizatorul nu este autentificat.");
    }
});