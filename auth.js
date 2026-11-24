const currentUser = JSON.parse(
    sessionStorage.getItem("currentUser")
);

const loginButton = document.querySelector(".login-btn");

// Check Login Status

if (currentUser && loginButton) {

    loginButton.textContent = "Logout";
    loginButton.href = "#";

    // Display User Name

    const userName = document.createElement("span");

    userName.textContent = "Hi, " + currentUser.name;
    userName.className = "user-name";

    loginButton.before(userName);

    // Logout

    loginButton.addEventListener("click", function(event) {

        event.preventDefault();

        sessionStorage.removeItem("currentUser");

        window.location.href = "home.html";

    });

}