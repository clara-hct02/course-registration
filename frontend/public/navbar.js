class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <style>
        /* Add a black background color to the top navigation */
        .topnav {
          background-color: white;
          overflow: hidden;
          font: large sans-serif;
          // position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          display: flex;
          align-items: center;
        }
  
        /* Style the links inside the navigation bar */
        .topnav a {
          float: left;
          color: black;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
          margin: 10px;
        }
  
        /* Change the color of links on hover */
        .topnav a:hover {
          background-color: #ddd;
          color: black;
        }
  
  
        /* Dropdown container - needed to position the dropdown content */
        .dropdown {
          float: left;
          overflow: hidden;
        }
  
        /* Style the dropdown button to fit inside the topnav */
        .dropdown .dropbtn {
          font-size: large;
          border: none;
          outline: none;
          color: black;
          padding: 14px 16px;
          background-color: inherit;
          font-family: inherit;
          margin: 10px;
          z-index: 1;
        }
  
        /* Style the dropdown content (hidden by default) */
        .dropdown-content {
          display: none;
          position: absolute;
          background-color: #f9f9f9;
          min-width: 160px;
          box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
          z-index: 1;
        }
  
        /* Style the links inside the dropdown */
        .dropdown-content a {
          float: none;
          color: black;
          padding: 12px 16px;
          text-decoration: none;
          display: block;
          text-align: left;
        }
  
        /* Add a dark background on topnav links and the dropdown button on hover */
        .topnav a:hover, .dropdown:hover .dropbtn {
          background-color: #555;
          color: white;
        }
  
        /* Show the dropdown menu when the user moves the mouse over the dropdown button */
        .dropdown:hover .dropdown-content {
          display: block;
        }
  
        /* Add a grey background to dropdown links on hover */
        .dropdown-content a:hover {
          background-color: #ddd;
          color: black;
        }
  
        </style>
  
        <div class="topnav">
          <a class="active" href="index.html">Home</a>
          <a href="saved.html">Saved Schedules</a>
          <a href="browse.html">Find Courses</a>
          <a href="navigator.html">Degree Navigator</a>
          <a href="#" id="logoutLink">Logout</a>
        </div>

      `;
    setTimeout(() => {
      // access deny if nothing in session storage
      const cachedId = sessionStorage.getItem("id");
      if (!cachedId) {
        sessionStorage.clear();
        window.location.href =
          "http://127.0.0.1:3001/frontend/public/access-denied.html";
      }
      this.attachEventListeners();
    }, 0);
  }

  attachEventListeners() {
    const logoutLink = this.querySelector("#logoutLink");
    if (logoutLink) {
      logoutLink.addEventListener("click", this.logout.bind(this));
    }
  }

  logout() {
    window.location.href = "login.html";
    sessionStorage.clear();
  }
}

customElements.define("navbar-component", Navbar);
