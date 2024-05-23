// Afișează dialogul de confirmare când utilizatorul apasă butonul de delogare
document.getElementById("logout-button").addEventListener("click", function(event) {
    // Opriți comportamentul implicit al legăturii
    event.preventDefault();

    // Afiseaza dialogul de confirmare
    var confirmLogout = confirm("Ești sigur că vrei să ieși?");
    
    // Dacă utilizatorul apasă OK în dialogul de confirmare, atunci redirecționează-l către pagina de login
    if (confirmLogout) {
        window.location.href = "index.html"; // Schimbă "login.html" cu pagina de login corectă
    }
});
