// location.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
import * as L from "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";

document.addEventListener("DOMContentLoaded", function() {
    // Crearea hărții cu Leaflet
    const map = L.map("map").setView([45.7597, 21.2300], 7);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors"
    }).addTo(map);

    // Adăugarea unui marker pe hartă la clic
    let marker;
    map.on("click", function(event) {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker(event.latlng).addTo(map);
    });

    // Referință către formularul de locație
    const locationForm = document.getElementById("location-form");

    // Adăugarea unui listener pentru trimiterea formularului
    locationForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Oprirea acțiunii implicite a formularului

        // Obținerea valorilor introduse de utilizator
        const numeStupina = document.getElementById("nume-stupina").value;
        const latitudine = marker ? marker.getLatLng().lat : null;
        const longitudine = marker ? marker.getLatLng().lng : null;

        // Salvarea datelor în Firestore
        const locationData = {
            numeStupina,
            latitudine,
            longitudine
        };

        // Configurare Firebase
        const firebaseConfig = {
            apiKey: "YOUR_API_KEY",
            authDomain: "bee-connected-2a01a.firebaseapp.com",
            databaseURL: "https://bee-connected-2a01a-default-rtdb.europe-west1.firebasedatabase.app",
            projectId: "bee-connected-2a01a",
            storageBucket: "bee-connected-2a01a.appspot.com",
            messagingSenderId: "1037546953098",
            appId: "1:1037546953098:web:66810ebfba86ff36111073",
            measurementId: "G-00SQH47GGE"
        };

        // Inițializarea aplicației Firebase
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        // Salvarea datelor în Firestore
        setDoc(doc(db, "stupine"), locationData)
            .then(() => {
                console.log("Locație salvată cu succes în Firestore!");
                window.location.href = "AddHive.html";
            })
            .catch((error) => {
                console.error("Eroare la salvarea locației:", error);
            });
    });
});