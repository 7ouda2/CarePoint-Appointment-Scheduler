// Doctors Accounts

const doctorAccounts = [

    { doctorId: 1, name: "Dr. Ahmed Hassan", email: "ahmed@carepoint.com", password: "123456" },

    { doctorId: 2, name: "Dr. Sara Mohamed", email: "sara@carepoint.com", password: "123456" },

    { doctorId: 3, name: "Dr. Omar Ali", email: "omar@carepoint.com", password: "123456" },

    { doctorId: 4, name: "Dr. Mariam Adel", email: "mariam@carepoint.com", password: "123456" },

    { doctorId: 5, name: "Dr. Mostafa Ibrahim", email: "mostafa@carepoint.com", password: "123456" },

    { doctorId: 6, name: "Dr. Nour Khaled", email: "nour@carepoint.com", password: "123456" }

];

const loginForm = document.getElementById("loginForm");

const message = document.getElementById("message");

loginForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const email = document.getElementById("email")
        .value.trim().toLowerCase();

    const password = document.getElementById("password").value;

    // Check Doctor Account

    const doctor = doctorAccounts.find(function(item) {

        return item.email === email &&
               item.password === password;

    });

    if (doctor) {

        const currentDoctor = {

            doctorId: doctor.doctorId,
            name: doctor.name,
            email: doctor.email,
            role: "doctor"

        };

        sessionStorage.setItem(
            "currentUser",
            JSON.stringify(currentDoctor)
        );

        window.location.href = "dashboard.html";

        return;

    }

    // Get Patient Accounts

    const users =
        JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(function(item) {

        return item.email === email &&
               item.password === password;

    });

    if (!user) {

        message.textContent = "Invalid email or password.";

        return;

    }

    // Save Patient Session

    const currentUser = {

        name: user.name,
        email: user.email,
        role: "patient"

    };

    sessionStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
    );

    alert("Login successful!");

    window.location.href = "home.html";

});