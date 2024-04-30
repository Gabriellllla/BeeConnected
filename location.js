document.addEventListener("DOMContentLoaded", function() {
    // Configurare Firebase
    const firebaseConfig = {
        // Configurațiile Firebase
    };
    const app = firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore(app);

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
        db.collection("stupine").add(locationData)
            .then(() => {
                console.log("Locație salvată cu succes în Firestore!");
                window.location.href = "AddHive.html";
            })
            .catch((error) => {
                console.error("Eroare la salvarea locației:", error);
            });
    });
});