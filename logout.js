document.getElementById("logout-button").addEventListener("click", function(event) {
    event.preventDefault(); // Previne comportamentul implicit al link-ului

    // Afișează dialogul personalizat
    document.getElementById("dialog-overlay").style.display = "block";

    // Dacă utilizatorul apasă butonul "Da"
    document.getElementById("confirm-button").addEventListener("click", function() {
        window.location.href = "index.html"; // Redirecționează către pagina de logare
    });

    // Dacă utilizatorul apasă butonul "Anulează" sau închide dialogul
    document.getElementById("cancel-button").addEventListener("click", function() {
        document.getElementById("dialog-overlay").style.display = "none"; // Ascunde dialogul
    });
});