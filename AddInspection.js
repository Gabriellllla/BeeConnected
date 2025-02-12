import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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

function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

document.getElementById("Are boli").addEventListener("change", (event) => {
    document.getElementById("Optiuni boli").style.display = event.target.checked ? "block" : "none";
});

document.getElementById("Mâncare").addEventListener("change", (event) => {
    document.getElementById("Tipul mâncării").style.display = event.target.checked ? "block" : "none";
});

document.getElementById("Regină prezentă").addEventListener("change", (event) => {
    const queenColorDialogOverlay = document.getElementById("queen-color-dialog-overlay");

    if (event.target.checked) {
        const dataInspectiei = document.getElementById("Data inspecției").value;
        const inspectieDate = new Date(dataInspectiei);
        const inspectieYear = inspectieDate.getFullYear();
        const lastDigit = inspectieYear % 10;
        let colorMessage = "";

        switch (lastDigit) {
            case 1:
            case 6:
                colorMessage = "Culoarea anului pentru matca este alb.";
                break;
            case 2:
            case 7:
                colorMessage = "Culoarea anului pentru matca este galben.";
                break;
            case 3:
            case 8:
                colorMessage = "Culoarea anului pentru matca este roșu.";
                break;
            case 4:
            case 9:
                colorMessage = "Culoarea anului pentru matca este verde.";
                break;
            case 0:
            case 5:
                colorMessage = "Culoarea anului pentru matca este albastru.";
                break;
            default:
                colorMessage = "Nu s-a putut determina culoarea anului pentru matca.";
        }

        const queenColorMessageElement = document.getElementById("queen-color-message");
        queenColorMessageElement.textContent = colorMessage;

        // Afiseaza dialogul
        queenColorDialogOverlay.style.display = 'flex';
    } else {
        // Ascunde dialogul daca utilizatorul deselecteaza checkbox-ul
        queenColorDialogOverlay.style.display = 'none';
    }
});

// Adauga eveniment pentru butonul de inchidere a dialogului
const closeQueenColorDialogButton = document.getElementById("close-queen-color-dialog");
closeQueenColorDialogButton.addEventListener("click", () => {
    const queenColorDialogOverlay = document.getElementById("queen-color-dialog-overlay");
    queenColorDialogOverlay.style.display = 'none';
});


document.getElementById("Tipul bolii").addEventListener("change", (event) => {
    const disease = event.target.value;
    let treatmentMessage = "";

    switch(disease) {
        case "Boala virala a albinelor":
            treatmentMessage = "Tratament: Aplicați antivirale specifice și îmbunătățiți igiena stupului.";
            break;
        case "Loca americana":
            treatmentMessage = "Tratament: Folosiți antibiotice și distrugeți fagurii afectați. Consultați un specialist.";
            break;
        case "Loca europeana":
            treatmentMessage = "Tratament: Aplicați antibiotice și asigurați-vă că stupii sunt bine ventilați.";
            break;
        case "Nosemoza":
            treatmentMessage = "Tratament: Administrați fumagilină și reduceți umiditatea în stup.";
            break;
        case "Varrooza":
            treatmentMessage = "Tratament: Utilizați acaricide și monitorizați nivelul de infestare.";
            break;
        default:
            treatmentMessage = "";
    }

    if (treatmentMessage) {
        const diseaseMessageElement = document.getElementById("disease-message");
        diseaseMessageElement.textContent = treatmentMessage;

        const diseaseDialogOverlay = document.getElementById("disease-dialog-overlay");
        diseaseDialogOverlay.style.display = 'flex';

        const closeDiseaseDialogButton = document.getElementById("close-disease-dialog");
        closeDiseaseDialogButton.addEventListener("click", () => {
            diseaseDialogOverlay.style.display = 'none';
        });
    }
});

document.getElementById("add-inspection-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const Data_inspecției = document.getElementById("Data inspecției").value;
    const Regină_prezentă = document.getElementById("Regină prezentă").checked;
    const Puiet = document.getElementById("Puiet").checked;
    const Are_boli = document.getElementById("Are boli").checked;
    const Tipul_bolii = Are_boli ? document.getElementById("Tipul bolii").value : null;
    const Mâncare = document.getElementById("Mâncare").checked;
    const Tipul_mâncării = Mâncare ? document.getElementById("Tipul mâncării").value : null;
   
    const inspectionData = {
        date: Data_inspecției,
        Regină_prezentă: Regină_prezentă,
        Puiet: Puiet,
        Are_boli: Are_boli,
        Tipul_bolii: Tipul_bolii,
        Mâncare: Mâncare,
        Tipul_mâncării: Tipul_mâncării ? Tipul_mâncării : []
    };

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            const userId = user.uid;
            const stupinaId = getQueryParam("stupinaId");
            const stupId = getQueryParam("stupId");
            
            if (!stupinaId || !stupId) {
                alert("ID-ul stupinei sau al stupului lipsește din URL.");
                return;
            }

            const inspectiiRef = collection(db, "stupine", userId, "stupine", stupinaId, "stupi", stupId, "inspectii");
            
            try {
                await addDoc(inspectiiRef, inspectionData);
                alert("Inspecție adăugată cu succes!");
                window.location.href = `inspectii.html?stupinaId=${stupinaId}&stupId=${stupId}`;
            } catch (error) {
                console.error("Eroare la adăugarea inspecției:", error);
                alert("A apărut o eroare. Vă rugăm să încercați din nou.");
            }
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
