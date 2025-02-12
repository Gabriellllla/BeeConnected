var nameError =  document.getElementById('name-error');
var phoneError =  document.getElementById('phone-error');
var emailError =  document.getElementById('email-error');
var messageError =  document.getElementById('message-error');
var submitError =  document.getElementById('submit-error');

function validateName(){
    var name = document.getElementById('contact-name').value;
    if(name.length == 0){
        nameError.innerHTML = 'Câmp necesar.';
        return false;
    }
    if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameError.innerHTML ='Scrie numele complet.';
        return false;
    }
    nameError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; 
    return true;
}

function validatePhone(){
    var phone = document.getElementById('contact-phone').value;

    if(phone.length == 0)
    {
        phoneError.innerHTML='Câmp necesar.';
        return false;

    }
    if(phone.length !== 10)
    {
        phoneError.innerHTML='Telefon invalid.';
        return false;

    }
    if(!phone.match(/^[0-9]{10}$/))
    {
        phoneError.innerHTML='Doar cifre, te rugăm.';
        return false;

    }
    phoneError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; 
    return true;

}

function validateEmail(){
    var email = document.getElementById('contact-email').value;

    if(email.length == 0)
    {
        emailError.innerHTML='Câmp necesar.';
        return false;

    }
    
    if(!email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/))
    {
        emailError.innerHTML='Email invalid.';
        return false;

    }
    emailError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; 
    return true;

}

function validateMessage(){
    var message =document.getElementById('contact-message').value;
    var required = 30;
    var left = required - message.length;

    if(left > 0){
    messageError.innerHTML=left + 'caractere necesare';
    return false;}

    messageError.innerHTML = '<i class="fa-solid fa-circle-check"></i>'; 
    return true;
}
function validateForm(){
    if(!validateName() || !validatePhone() || !validateEmail() || !validateMessage()){
        submitError.style.display='block';
        submitError.innerHTML = 'Corectează eroarea pentru a trimite';
        setTimeout(function(){submitError.style.display='none';}, 3000);
        return false;
    }
}


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
