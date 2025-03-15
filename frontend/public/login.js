async function login(event) {
    event.preventDefault();

    var user = document.getElementById('name').value;
    var password = document.getElementById('password').value;

    const response = await fetch("http://localhost:3000/users/login", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: user, password: password }),
    });
    const data = await response.json();
    window.location.href = "/";
}

window.onload = function() {
    document.getElementById("login").addEventListener("submit", login);
}