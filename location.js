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


// Inițializare hartă Mapbox
mapboxgl.accessToken = 'pk.eyJ1IjoiZ2FicmllbGFtMDIiLCJhIjoiY2x2dzRxeXQyMjJweDJxcXpjNmQxeWF6dSJ9.54PMrpaTZ3yq6eTRQQ7d9w';
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [21.2300, 45.7597],
    zoom: 7
});

let marker = new mapboxgl.Marker(); // Inițializare marker

// Adăugare listener pentru trimiterea formularului
const locationForm = document.getElementById("location-form");
const numeStupinaInput = document.getElementById("nume-stupina");

locationForm.addEventListener("submit", function(event) {
    event.preventDefault(); // Oprirea acțiunii implicite a formularului

    // Obținerea valorilor introduse de utilizator
    const numeStupina = numeStupinaInput.value;
    const latitudine = marker.getLngLat().lat;
    const longitudine = marker.getLngLat().lng;
    const locality = location.context.find(context => context.id.includes('place'));
    const county = location.context.find(context => context.id.includes('region'));

    // Salvarea datelor în Firestore
    const locationData = {
        numeStupina,
        latitudine,
        longitudine,
        localitate: locality ? locality.text : null,
        judet: county ? county.text : null
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

// Adăugare marker la clic pe hartă
map.on('click', function(e) {
    marker.setLngLat(e.lngLat).addTo(map);
});