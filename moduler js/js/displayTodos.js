export function displayTodos(data) {
    const container = document.getElementById("todos-container");
    container.innerHTML = "";

    data.forEach(todo => {
        const div = document.createElement("div");
        div.style.border = "1px solid gray";
        div.style.padding = "10px";
        div.style.margin = "10px 0";

        div.innerHTML = `
            <h4>Todo ID: ${todo.id}</h4>
            <p>${todo.title}</p>
            <p>Status: ${todo.completed ? "✔ Completed" : "❌ Not Completed"}</p>
        `;

        container.appendChild(div);
    });
}
