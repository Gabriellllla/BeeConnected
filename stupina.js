import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";

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

auth.onAuthStateChanged((user) => {
    if (user) {
        const urlParams = new URLSearchParams(window.location.search);
        const stupinaId = urlParams.get('id');
        const stupList = document.getElementById("stup-list");
        const addStupButton = document.getElementById("add-stup-button");

        async function getStupList() {
            const stupineRef = doc(db, "stupine", user.uid, "stupine", stupinaId);
            const stupiCollection = collection(stupineRef, "stupi");
            const stupiSnapshot = await getDocs(stupiCollection);
            stupiSnapshot.forEach((stupDoc) => {
                const stupData = stupDoc.data();
                const stupButton = document.createElement("button");
                stupButton.textContent = stupData.numeStup || `Stup ${stupDoc.id}`;
                stupButton.onclick = () => {
                    window.location.href = `stup_inspectii.html?id=${stupDoc.id}`;
                };
                stupList.appendChild(stupButton);
            });
        }

        addStupButton.onclick = () => {
            window.location.href = `AddHive.html?stupinaId=${stupinaId}`;
        };

        getStupList();
    } else {
        console.log("Utilizatorul nu este autentificat.");
    }
});
