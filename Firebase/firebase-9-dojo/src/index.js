import { initializeApp } from 'firebase/app';
import { 
   getFirestore, collection, getDoc, addDoc, deleteDoc, doc, onSnapshot, query, where, orderBy, serverTimestamp, updateDoc
} from 'firebase/firestore';
import {
   getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut
} from 'firebase/auth';

console.log("Hello World! It works😁");

const firebaseConfig = {
   apiKey: "AIzaSyCCCKR8fkbMuRAM7Q_1oUVyy9_9_qhUAyw",
   authDomain: "fir-9-dojo-part-2.firebaseapp.com",
   projectId: "fir-9-dojo-part-2",
   storageBucket: "fir-9-dojo-part-2.appspot.com",
   messagingSenderId: "132192639549",
   appId: "1:132192639549:web:9bba1c12e9fa82d9266854"
};


// init firebase app
initializeApp(firebaseConfig);

// connect to database
const db = getFirestore();    // Database connection
const auth = getAuth();       // Auth service initialization

// collection ref
const laptopsColRef = collection(db, 'laptops');


// display all docs
onSnapshot(query(laptopsColRef, orderBy('year', 'desc')), (snapshot) => {
   // Print document
   const laptops = [];
   snapshot.docs.forEach(item => {
      laptops.push({ ...item.data(), id: item.id });
   })
   console.log(laptops);

   // Add document to DOM
   const documentsDiv = document.querySelector(".laptops_container");

   documentsDiv.innerHTML = `<h3>Available Laptops</h3>`;
   laptops.forEach(item => {
      const element = `<div>
         <div>
            <b>id: </b>
            <span>${item.id}</span>
         </div>
         <div>
            <b>Brand: </b>
            <span>${item.brand}</span>
         </div>
         <div>
            <b>Model: </b>
            <span>${item.model}</span>
         </div>
         <div>
            <b>Year: </b>
            <span>${item.year}</span>
         </div>
         <div>
            <b>CreatedAt: </b>
            <span>${item.createdAt}</span>
         </div>
         <br/>
      </div>`

      documentsDiv.innerHTML += element;
   })
})


// Adding Documents
const addLaptopForm = document.querySelector('.add');

addLaptopForm.addEventListener("submit", (e) => {
   e.preventDefault();

   addDoc(laptopsColRef, {
      model: addLaptopForm.model.value,
      brand: addLaptopForm.brand.value,
      year:  addLaptopForm.year.value,
      createdAt: serverTimestamp()
   })
      .then(data => {
         console.log(`Successful: ${data}`);
         // Clear form fields
         addLaptopForm.reset();
      })
      .catch(err => {
         console.log(err.message);
      })
})


// Deleting Documents
const deleteLaptopForm = document.querySelector('.delete');

deleteLaptopForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const docRef = doc(db, "laptops", deleteLaptopForm.id.value);
   console.log(docRef);

   deleteDoc(docRef)
      .then((data) => {
         console.log(`Successful Deletion: ${data}`);
         // Clear form fields
         deleteLaptopForm.reset();
      })
      .catch(err => {
         console.log(err.message);
      })
})


// Updating document
const updateLaptopForm = document.querySelector('.update');

updateLaptopForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const updatedFields = [updateLaptopForm.brand.value, updateLaptopForm.model.value, updateLaptopForm.year.value];
   const changes = {};
   
   for(let i=0; i < updatedFields.length; i++) {
      console.log(changes);
      if (updatedFields[i].length > 0) {
         switch(i){
            case 0:
               changes['brand'] = updatedFields[0];
               break;
            case 1:
               changes['model'] = updatedFields[1];
               break;
            case 2:
               changes['year'] = updatedFields[2];
         }
      }
   }

   // Send to Firestore
   const docRef = doc(db, 'laptops', updateLaptopForm.id.value);

   updateDoc(docRef, changes)
   .then(() => updateLaptopForm.reset());
});


// AUTHENTICATION(Signing users up)

// Sign up
const signUpForm = document.querySelector('.sign-up');

signUpForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const email = signUpForm.email.value;
   const password = signUpForm.password.value;
   
   createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
         console.log('user created: ', cred.user);
         signUpForm.reset();
      })
      .catch((err) => {
         console.log(err.message);
      });
});


// Login
const loginForm = document.querySelector('.login');

loginForm.addEventListener('submit', (e) => {
   e.preventDefault();

   const email = loginForm.email.value;
   const password = loginForm.password.value;

   signInWithEmailAndPassword(auth, email, password)
   .then(() => {
      console.log('Signed in...');
   })
   .catch(err => {
      console.log(err.message);
   })
});


// Sign out
const logoutBtn = document.querySelector('.logout');

logoutBtn.addEventListener('click', (e) => {
   signOut(auth)
   .then(() => {
      console.log('Successful Logout!');
   })
   .catch((err) => { console.log(err.message) })
});
