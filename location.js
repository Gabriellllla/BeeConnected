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

locationForm.addEventListener("submit", async function(event) {
    event.preventDefault(); // Oprirea acțiunii implicite a formularului

    // Obținerea valorilor introduse de utilizator
    const numeStupina = numeStupinaInput.value;
    const latitudine = marker.getLngLat().lat;
    const longitudine = marker.getLngLat().lng;
   
    try {
        const userId = getCurrentUserId(); 
        const userStupineRef = collection(db, "stupine", userId, "stupine");
        const locationData = {
            numeStupina,
            latitudine,
            longitudine
        };
        await setDoc(doc(userStupineRef), locationData);
        console.log("Locație salvată cu succes în Firestore!");
        window.location.href = "AddHive.html";
    } catch (error) {
        console.error("Eroare la salvarea locației:", error);
    }
    
});

map.on('click', async function(e) {
    marker.setLngLat(e.lngLat).addTo(map);

    // Obținerea informațiilor despre localitate și județ utilizând geocodificarea inversă cu Mapbox
    const locality = await reverseGeocode(e.lngLat);
    const county = getAdminArea(locality);

    // Adăugarea informațiilor despre localitate și județ în câmpurile de formular ascunse
    document.getElementById("locality").value = locality ? locality.place_name : '';
    document.getElementById("county").value = county ? county : '';
});

// Funcție pentru geocodificarea inversă a locației (obținerea informațiilor despre localitate)
async function reverseGeocode(lngLat) {
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`);
    const data = await response.json();
    return data.features[0];
}

// Funcție pentru obținerea județului din contextul geografic returnat de Mapbox
function getAdminArea(context) {
    const adminArea = context.context.find((item) => item.id.startsWith('region'));
    return adminArea ? adminArea.text : null;
}

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
} else {
    // Utilizatorul nu este autentificat, poți gestiona acest caz aici
    console.log("Utilizatorul nu este autentificat.");
}
});