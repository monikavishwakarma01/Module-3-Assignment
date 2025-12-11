document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const email = document.getElementById("email").value;
    const pass = document.getElementById("password").value;

    if (!storedUser) {
        alert("No user found. Please signup first.");
        return;
    }

    if (email === storedUser.email && pass === storedUser.password) {
        localStorage.setItem("loggedIn", "true");
        alert("Login successful");
        window.location.href = "todos.html";
    } else {
        alert("Invalid Credentials");
    }
});
