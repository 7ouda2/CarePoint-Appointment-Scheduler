const registerForm = document.getElementById("registerForm");
const message = document.getElementById("message");

registerForm.addEventListener("submit", function(event) {

    event.preventDefault();

    // Get Form Values

    const name = document.getElementById("fullName").value.trim();

    const email = document.getElementById("email")
        .value.trim().toLowerCase();

    const password = document.getElementById("password").value;

    const confirmPassword =
        document.getElementById("confirmPassword").value;

    // Validate Name

    if (name === "") {
        message.textContent = "Please enter your full name.";
        return;
    }

    // Check Password Length

    if (password.length < 6) {
        message.textContent = "Password must contain at least 6 characters.";
        return;
    }

    // Check Passwords

    if (password !== confirmPassword) {
        message.textContent = "Passwords do not match.";
        return;
    }

    // Get Existing Users

    let users =
        JSON.parse(localStorage.getItem("users")) || [];

    // Check Email

    const emailExists = users.some(function(user) {
        return user.email === email;
    });

    if (emailExists) {
        message.textContent = "Email is already registered.";
        return;
    }

    // Create New User

    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password,
        role: "patient"
    };

    users.push(newUser);

    // Save User

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");

    window.location.href = "login.html";

});