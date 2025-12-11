// index.js

// 1. Zaroori Modular Functions Import Karein (Firebase v9+)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    addDoc, 
    doc, 
    updateDoc, 
    deleteDoc, 
    onSnapshot 
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD-6r8iRl2KXyTjhSBk5h6pNU3PZiGpE0I",
    authDomain: "bookapp-24a48.firebaseapp.com",
    projectId: "bookapp-24a48",
    storageBucket: "bookapp-24a48.firebasestorage.app",
    messagingSenderId: "567821273972",
    appId: "1:567821273972:web:ca9e687a34baaf89803a21"
};

// 2. Firebase Initialize Karein
const app = initializeApp(firebaseConfig);

// 3. Firestore Database Instance Get Karein (getFirestore function se)
const db = getFirestore(app);

// Inputs (DOM Elements)
let title = document.getElementById("title");
let author = document.getElementById("author");
let price = document.getElementById("price");
let image = document.getElementById("image");
let addBtn = document.getElementById("addBtn");
// Ensure that an element with ID "books" exists in your HTML
let booksDiv = document.getElementById("books"); 

// Add book
addBtn.onclick = () => {
    if (!title.value || !author.value || !price.value || !image.value) {
        alert("Fill all fields!");
        return;
    }

    // 4. Add data using addDoc(collection(db, "collectionName"), data)
    addDoc(collection(db, "books"), {
        title: title.value,
        author: author.value,
        price: Number(price.value),
        image: image.value
    });

    // Clear inputs
    title.value = "";
    author.value = "";
    price.value = "";
    image.value = "";
};

// Real-time display
// 5. Real-time changes ke liye onSnapshot(collection(db, "collectionName"), callback)
onSnapshot(collection(db, "books"), (snapshot) => {
    // Check if booksDiv exists before accessing its innerHTML (safety check)
    if (!booksDiv) {
        console.error("HTML element with ID 'books' not found.");
        return;
    }
    
    booksDiv.innerHTML = "";
    snapshot.forEach(docData => {
        let b = docData.data();

        // Template literal to display book card
        booksDiv.innerHTML += `
            <div class="card">
                <img src="${b.image}">
                <h3>${b.title}</h3>
                <p>${b.author}</p>
                <p>₹${b.price}</p>

                <button class="update" onclick="updateAuthor('${docData.id}', '${b.author}')">Update</button>
                <button class="delete" onclick="deleteBook('${docData.id}')">Delete</button>
                <button class="details" onclick="alert('${b.title}\\nAuthor: ${b.author}\\nPrice: ₹${b.price}')">Details</button>
            </div>
        `;
    });
});

// Update
// 6. Update data using updateDoc(doc(db, "collectionName", id), data)
function updateAuthor(id, oldAuthor) {
    let newAuthor = prompt("Enter new author:", oldAuthor);
    if (newAuthor)
        updateDoc(doc(db, "books", id), { author: newAuthor });
}

// Delete
// 7. Delete data using deleteDoc(doc(db, "collectionName", id))
function deleteBook(id) {
    deleteDoc(doc(db, "books", id));
}
// ... (Saara code) ...

// FIX: In functions ko Global Window object par attach karein
window.updateAuthor = updateAuthor;
window.deleteBook = deleteBook;
