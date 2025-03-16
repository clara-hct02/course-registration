async function login(event) {
  event.preventDefault();

  var user = document.getElementById("name").value;
  var password = document.getElementById("password").value;

  const response = await fetch("http://localhost:3000/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: user, password: password }),
  });
  const data = await response.json();
  console.log(data);
  if (response.status == 201) {
    window.location.href = "/";
    sessionStorage.setItem("id", data["_id"]);
    sessionStorage.setItem("username", data["username"]);
    sessionStorage.setItem("email", data["email"]);
    sessionStorage.setItem(
      "registrations",
      JSON.stringify(data["registrations"])
    );
    sessionStorage.setItem("worklists", JSON.stringify(data["worklists"]));
    window.location.href = "http://127.0.0.1:3001/frontend/public/index.html";
  } else {
    // do nothing
  }
  //   window.location.href = "/";
}

window.onload = function () {
  document.getElementById("login").addEventListener("submit", login);
};
