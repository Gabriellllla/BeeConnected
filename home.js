// Initializează Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, setDoc, collection } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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
// Funcție pentru a obține lista de stupine din Firestore
function getHiveList() {
    const hiveList = document.getElementById("hive-list");
    db.collection("stupine").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const hiveData = doc.data();
            const hiveName = hiveData.numeStupina;
            const hiveLocality = hiveData.localitate;
            const hiveCounty = hiveData.judet;
            const hiveButton = document.createElement("button");
            hiveButton.textContent = `${hiveName} - ${hiveLocality}, ${hiveCounty}`;
            hiveButton.onclick = () => {
                // Redirectează utilizatorul către pagina de detalii a stupinei
                window.location.href = `hive_details.html?id=${doc.id}`;
            };
            hiveList.appendChild(hiveButton);
        });
    }).catch((error) => {
        console.error("Eroare la obținerea listei de stupine:", error);
    });
}

// Apelează funcția pentru a afișa lista de stupine când pagina este încărcată complet
document.addEventListener("DOMContentLoaded", function() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
        if (user) {
            getHiveList();
        } else {
            // Utilizatorul nu este autentificat, poți gestiona acest caz aici
            console.log("Utilizatorul nu este autentificat.");
        }
    });
});

// Funcție pentru afișarea tooltip-ului la survolul butoanelor din meniu
function showTooltip(message) {
    alert(message);
} 
}else {
        // Utilizatorul nu este autentificat, poți gestiona acest caz aici
        console.log("Utilizatorul nu este autentificat.");
    }
});
