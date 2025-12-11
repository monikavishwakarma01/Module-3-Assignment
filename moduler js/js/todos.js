import { displayTodos } from "./displayTodos.js";

if (localStorage.getItem("loggedIn") !== "true") {
    alert("You must login first!");
    window.location.href = "login.html";
}

// Fetch Todos From API
async function loadTodos() {
    try {
        let res = await fetch("https://jsonplaceholder.typicode.com/todos");
        let data = await res.json();
        displayTodos(data);
    } catch (error) {
        console.error("Error loading todos:", error);
    }
}

loadTodos();
