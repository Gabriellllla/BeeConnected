import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-storage.js";

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
const storage = getStorage(app);

auth.onAuthStateChanged((user) => {
    if (user) {
        const urlParams = new URLSearchParams(window.location.search);
        const stupinaId = urlParams.get('stupinaId');
        const addStupForm = document.getElementById("add-stup-form");

        addStupForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            const numeStup = document.getElementById("nume-stup").value;
            const stupPoza = document.getElementById("stup-poza").files[0];

            let stupPozaUrl = null;
            if (stupPoza) {
                const storageRef = ref(storage, `stupi/${user.uid}/${stupinaId}/${stupPoza.name}`);
                const snapshot = await uploadBytes(storageRef, stupPoza);
                stupPozaUrl = await getDownloadURL(snapshot.ref);
            }

            const stupData = {
                numeStup,
                pozaUrl: stupPozaUrl || null
            };

            try {
                const stupineRef = doc(db, "stupine", user.uid, "stupine", stupinaId);
                const stupiCollection = collection(stupineRef, "stupi");
                await addDoc(stupiCollection, stupData);
                console.log("Stup adăugat cu succes!");
                window.location.href = `stup_details.html?id=${stupinaId}`;
            } catch (error) {
                console.error("Eroare la adăugarea stupului:", error);
            }
        });
    } else {
        console.log("Utilizatorul nu este autentificat.");
    }
});
