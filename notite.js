import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
    import { getFirestore, doc, getDocs, collection, addDoc } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";
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

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    const auth = getAuth();

    // Funcție pentru a obține ID-ul utilizatorului curent
    function getCurrentUserId() {
      if (auth.currentUser) {
        return auth.currentUser.uid;
      } else {
        console.error("Utilizatorul nu este autentificat.");
      }
    }

    // Funcție pentru a adăuga o nouă notiță
    async function addNote() {
      const userId = getCurrentUserId();
      const noteText = prompt('Introduceti textul notiței:');
      if (noteText && userId) {
        const note = {
          text: noteText,
          date: new Date().toISOString()
        };
        try {
          await addDoc(collection(db, "user", userId, "notite"), note);
          alert('Notiță adăugată cu succes!');
          loadNotes();
        } catch (error) {
          console.error('Eroare la adăugarea notiței: ', error);
        }
      }
    }

    // Funcție pentru a încărca notițele
    async function loadNotes() {
      const userId = getCurrentUserId();
      if (userId) {
        try {
          const querySnapshot = await getDocs(collection(db, "user", userId, "notite"));
          const noteList = document.getElementById('note-list');
          noteList.innerHTML = '';
          querySnapshot.forEach((doc) => {
            const note = doc.data();
            const listItem = document.createElement('li');
            listItem.className = 'note-item';
            listItem.textContent = `${note.date}: ${note.text}`;
            listItem.onclick = () => showNoteDialog(note.text);
            noteList.appendChild(listItem);
          });
        } catch (error) {
          console.error('Eroare la încărcarea notițelor: ', error);
        }
      }
    }

    // Funcție pentru a afișa dialogul cu notița
    function showNoteDialog(noteText) {
      const noteDialog = document.getElementById('note-dialog');
      const noteContent = document.getElementById('note-content');
      noteContent.textContent = noteText;
      noteDialog.style.display = 'block';
    }

    // Funcție pentru a închide dialogul cu notița
    function closeNoteDialog() {
      const noteDialog = document.getElementById('note-dialog');
      noteDialog.style.display = 'none';
    }

    document.getElementById('close-dialog').onclick = closeNoteDialog;
    document.querySelector('.add-note-button').onclick = addNote;

    // Inițializează aplicația
    onAuthStateChanged(auth, (user) => {
      if (user) {
        loadNotes();
      } else {
        // Redirect sau mesaj pentru a autentifica utilizatorul
        alert('Te rog să te autentifici pentru a vedea notițele.');
      }
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
