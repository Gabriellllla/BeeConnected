// Afișează dialogul de confirmare când utilizatorul apasă butonul de delogare
document.getElementById("logout-button").addEventListener("click", function(event) {
    // Opriți comportamentul implicit al legăturii
    event.preventDefault();

    // Afișează dialogul
    document.getElementById("dialog-overlay").style.display = "block";
});

// Ascunde dialogul când utilizatorul apasă butonul "Anulează"
document.getElementById("cancel-button").addEventListener("click", function() {
    document.getElementById("dialog-overlay").style.display = "none";
});

// Redirecționează utilizatorul către pagina de login când apasă butonul "Da"
document.getElementById("confirm-button").addEventListener("click", function() {
    window.location.href = "index.html"; // Schimbă "login.html" cu pagina de login corectă
});