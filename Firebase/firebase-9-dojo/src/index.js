import { initializeApp } from 'firebase/app';
import { 
   getFirestore, collection, getDocs, addDoc, deleteDoc, doc, onSnapshot, query, where, orderBy
} from 'firebase/firestore';

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
const db = getFirestore();

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
         <br/>
      </div>`

      documentsDiv.innerHTML += element;
   })
})
   // .then((snapshot) => {
   //    // Print document
   //    const laptops = [];
   //    snapshot.docs.forEach(item => {
   //       laptops.push({ ...item.data(), id: item.id });
   //    })
   //    console.log(laptops);

   //    // Add document to DOM
   //    const documentsDiv = document.querySelector(".laptops_container");
   //    laptops.forEach(item => {
   //       const element = `<div>
   //          <div>
   //             <b>id: </b>
   //             <span>${item.id}</span>
   //          </div>
   //          <div>
   //             <b>Brand: </b>
   //             <span>${item.brand}</span>
   //          </div>
   //          <div>
   //             <b>Model: </b>
   //             <span>${item.model}</span>
   //          </div>
   //          <div>
   //             <b>Year: </b>
   //             <span>${item.year}</span>
   //          </div>
   //          <br/>
   //       </div>`

   //       documentsDiv.innerHTML += element;
   //    })
   // })
   // .catch(err => {
   //    console.log(err.message);
   // })


// Adding Documents
const addLaptopForm = document.querySelector('.add');

addLaptopForm.addEventListener("submit", (e) => {
   e.preventDefault();

   addDoc(laptopsColRef, {
      model: addLaptopForm.model.value,
      brand: addLaptopForm.brand.value,
      year:  addLaptopForm.year.value
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
