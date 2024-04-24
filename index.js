// import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";

// const firebaseApp = initializeApp({
//   apiKey: "AIzaSyDY4OQCbazOZQ9EIFZR5iY1tfV5yQ2IJ4g",
//   authDomain: "bee-connected-2a01a.firebaseapp.com",
//   databaseURL: "https://bee-connected-2a01a-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId: "bee-connected-2a01a",
//   storageBucket: "bee-connected-2a01a.appspot.com",
//   messagingSenderId: "1037546953098",
//   appId: "1:1037546953098:web:66810ebfba86ff36111073",
//   measurementId: "G-00SQH47GGE"
// });

// const analytics = getAnalytics(app);
// const app = initializeApp(firebaseApp);


import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";

const appSettings = {
  databaseURL: "https://bee-connected-2a01a-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const utilizatoriInDB = ref(database, "utilizatori");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl =  document.getElementById("add-button");

addButtonEl.addEventListener("click", function(){
  let inputValue = inputFieldEl.value;

  push(utilizatoriInDB, inputValue);

  console.log(`${inputValue} added to database`);
  
});

