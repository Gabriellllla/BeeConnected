// Initializează Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

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

// Crează harta Google
let map;
let marker; 

function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 45.7597, lng: 21.2300 },
        zoom: 7,
    });

    // Adaugă un marker la clic pe hartă
    //let marker;
    google.maps.event.addListener(map, "click", function(event) {
        if (marker) {
            marker.setPosition(event.latLng);
        } else {
            marker = new google.maps.Marker({
                position: event.latLng,
                map: map,
            });
        }
    });
}

// Referințe către elementele HTML
const locationForm = document.getElementById("location-form");
const numeStupinaInput = document.getElementById("nume-stupina");

// Adăugare listener pentru trimiterea formularului
locationForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Oprirea acțiunii implicite a formularului

    // Obține valorile introduse de utilizator
    const numeStupina = numeStupinaInput.value;
    const latitudine = marker ? marker.getPosition().lat() : null;
    const longitudine = marker ? marker.getPosition().lng() : null;

    // Salvează datele în Firestore
    const locationData = {
        numeStupina,
        latitudine,
        longitudine
    };

    setDoc(doc(db, "stupine", "idDocument"), locationData)
        .then(() => {
            console.log("Locație salvată cu succes în Firestore!");
            window.location.href = "AddHive.html";
        })
        .catch((error) => {
            console.error("Eroare la salvarea locației:", error);
        });
});
