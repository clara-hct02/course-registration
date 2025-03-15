async function login(event) {
    event.preventDefault();

    var user = document.getElementById('name').value;
    var password = document.getElementById('password').value;

    console.log(user);
    console.log(password);

    const response = await fetch("/login", {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: password }),
    });
    const data = await response.json();
    window.location.href = "/";
}

window.onload = function() {
    document.getElementById("login").addEventListener("submit", login);
}