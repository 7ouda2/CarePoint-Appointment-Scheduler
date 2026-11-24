// Get Current Doctor

const dashboardUser = JSON.parse(
    sessionStorage.getItem("currentUser")
);

// Check Doctor Login

if (!dashboardUser || dashboardUser.role !== "doctor") {

    alert("Please login as a doctor.");

    window.location.replace("login.html");

}

// Display Dashboard

function displayDashboard() {

    document.getElementById("doctorName").textContent =
        "Welcome, " + dashboardUser.name;

    // Get Saved Appointments

    const appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    // Filter Doctor Appointments

    const doctorAppointments = appointments.filter(function(item) {

        return item.doctorId === dashboardUser.doctorId;

    });

    // Calculate Statistics

    const confirmedAppointments = doctorAppointments.filter(function(item) {

        return item.status === "Confirmed";

    });

    const cancelledAppointments = doctorAppointments.filter(function(item) {

        return item.status === "Cancelled";

    });

    document.getElementById("totalCount").textContent =
        doctorAppointments.length;

    document.getElementById("confirmedCount").textContent =
        confirmedAppointments.length;

    document.getElementById("cancelledCount").textContent =
        cancelledAppointments.length;

    // Display Appointments Table

    const table = document.getElementById("appointmentsTable");

    table.innerHTML = "";

    document.getElementById("emptyMessage").style.display =
        doctorAppointments.length === 0 ? "block" : "none";

    doctorAppointments.forEach(function(item) {

        const row = document.createElement("tr");

        const values = [
            item.patientName,
            item.email,
            item.phone,
            item.date,
            item.time,
            item.status
        ];

        values.forEach(function(value, index) {

            const cell = document.createElement("td");

            if (index === 5) {

                const status = document.createElement("span");

                status.textContent = value;

                status.className = value === "Cancelled"
                    ? "status-cancelled"
                    : "status-confirmed";

                cell.appendChild(status);

            } else {

                cell.textContent = value;

            }

            row.appendChild(cell);

        });

        table.appendChild(row);

    });

}

// Logout

document.getElementById("logoutBtn")
.addEventListener("click", function() {

    sessionStorage.removeItem("currentUser");

    window.location.href = "login.html";

});

// Load Dashboard

if (dashboardUser && dashboardUser.role === "doctor") {

    displayDashboard();

}