// Initializează Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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

// Inițializare Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Funcție pentru a obține ID-ul utilizatorului curent
function getCurrentUserId() {
    // Obține obiectul de autentificare Firebase
    const auth = getAuth();
    
    // Verifică dacă utilizatorul este autentificat
    if (auth.currentUser) {
        // Returnează ID-ul utilizatorului curent
        return auth.currentUser.uid;
    } else {
        // Dacă utilizatorul nu este autentificat, ar trebui să implementezi o logică de gestionare a acestui caz
        console.error("Utilizatorul nu este autentificat.");
    }
}

// Funcție pentru afișarea listei de stupine în pagina home
function displayHiveList(hiveList) {
    const hiveListContainer = document.getElementById("hive-list");

    // Curăță conținutul containerului
    hiveListContainer.innerHTML = "";

    // Parcurge lista de stupine și adaugă fiecare în container
    hiveList.forEach((hiveData) => {
        const hiveName = hiveData.numeStupina;
        const hiveLocality = hiveData.localitate;
        const hiveCounty = hiveData.judet;

        const hiveButton = document.createElement("button");
        hiveButton.textContent = `${hiveName} - ${hiveLocality}, ${hiveCounty}`;
        hiveButton.onclick = () => {
            // Redirectează utilizatorul către pagina de detalii a stupinei
            window.location.href = `stupina.html?id=${hiveData.id}`;
        };

        // Adaugă butonul în container
        hiveListContainer.appendChild(hiveButton);
    });
}

// Apelarea funcției pentru afișarea listei de stupine când pagina este încărcată complet
document.addEventListener("DOMContentLoaded", function() {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
        if (user) {
            // Obține lista de stupine din Firestore și apelează funcția pentru afișare
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
            // Utilizatorul nu este autentificat, poți gestiona acest caz aici
            console.log("Utilizatorul nu este autentificat.");
        }
    });
});


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

