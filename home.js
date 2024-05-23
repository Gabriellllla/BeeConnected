// Initializează Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged  } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";


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

// Inițializare Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

// Funcție pentru a obține ID-ul utilizatorului curent
function getCurrentUserId() {
    if (auth.currentUser) {
        return auth.currentUser.uid;
    } else {
        console.error("Utilizatorul nu este autentificat.");
    }
}

// Funcție pentru afișarea listei de stupine în pagina home
function displayHiveList(hiveList) {
    const hiveListContainer = document.getElementById("hive-list");
    hiveListContainer.innerHTML = "";

    hiveList.forEach((hiveData) => {
        const hiveName = hiveData.numeStupina;
        const hiveLocality = hiveData.localitate;
        const hiveCounty = hiveData.judet;

        const hiveButton = document.createElement("button");
        hiveButton.textContent = `${hiveName} - ${hiveLocality}, ${hiveCounty}`;
        hiveButton.onclick = () => {
            window.location.href = `stupina.html?stupinaId=${hiveData.id}`;
        };

        hiveListContainer.appendChild(hiveButton);
    });
}

// Apelarea funcției pentru afișarea listei de stupine când pagina este încărcată complet
document.addEventListener("DOMContentLoaded", function() {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const userId = getCurrentUserId();
            const userStupineRef = collection(db, "stupine", userId, "stupine");
            getDocs(userStupineRef)
                .then((querySnapshot) => {
                    const hiveList = [];
                    querySnapshot.forEach((doc) => {
                        hiveList.push({ id: doc.id, ...doc.data() });
                    });
                    displayHiveList(hiveList);
                })
                .catch((error) => {
                    console.error("Eroare la obținerea listei de stupine:", error);
                });
        } else {
            console.log("Utilizatorul nu este autentificat.");
        }
    });
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
