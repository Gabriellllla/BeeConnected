import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, getDocs, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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

        // Funcție pentru a obține ID-ul unic al stupinei din URL
        function getStupinaIdFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('stupinaId');
        }

        // Funcția pentru adăugarea stupului în colecția stupi a stupinei corespunzătoare
        async function addHiveToStupina(userId, stupinaId, hiveName, hiveType) {
            const stupiRef = db.collection("stupine").doc(userId).collection("stupine").doc(stupinaId).collection("stupi");
            try {
                await stupiRef.add({
                    name: hiveName,
                    type: hiveType
                });
                alert("Stup adăugat cu succes!");
                window.location.href = "HomePage.html"; // Redirecționează utilizatorul către pagina principală
            } catch (error) {
                console.error("Eroare la adăugarea stupului:", error);
                alert("A apărut o eroare. Vă rugăm să încercați din nou.");
            }
        }

        // Ascultă evenimentul de submit al formularului
        document.getElementById("add-hive-form").addEventListener("submit", async (e) => {
            e.preventDefault();
            const userId = auth.currentUser.uid;
            const stupinaId = getStupinaIdFromUrl();
            const hiveName = document.getElementById("hive-name").value;
            const hiveType = document.getElementById("hive-type").value;
            await addHiveToStupina(userId, stupinaId, hiveName, hiveType);
        });