// Check Current User

const appointmentUser = JSON.parse(
    sessionStorage.getItem("currentUser")
);

if (!appointmentUser || appointmentUser.role !== "patient") {

    alert("Please login to view your appointments.");

    window.location.replace("login.html");

}

// Doctor Images

const doctorImages = {
    1: "d1.png",
    2: "d3.png",
    3: "d2.png",
    4: "d5.png",
    5: "d4.png",
    6: "d6.png"
};

// Get Saved Appointments

let appointments =
    JSON.parse(localStorage.getItem("appointments")) || [];

const appointmentsList =
    document.getElementById("appointmentsList");

const emptyMessage =
    document.getElementById("emptyMessage");

const modal =
    document.getElementById("rescheduleModal");

let selectedId = null;

// Check Appointment Ownership

function ownsAppointment(item) {

    return appointmentUser &&
           appointmentUser.role === "patient" &&
           item.email === appointmentUser.email;

}

// Display Appointments

function displayAppointments() {

    appointmentsList.innerHTML = "";

    // Get Current Patient Appointments Only

    const myAppointments = appointments.filter(function(item) {

        return ownsAppointment(item);

    });

    if (myAppointments.length === 0) {

        emptyMessage.style.display = "block";
        return;

    }

    emptyMessage.style.display = "none";

    myAppointments.forEach(function(item) {

        const card = document.createElement("div");

        card.className = "appointment-card";

        const cancelled = item.status === "Cancelled";

        card.innerHTML = `
            <div class="doctor-details">

                <img src="${doctorImages[item.doctorId] || '8815112.png'}"
                     alt="Doctor">

                <div>
                    <h3 class="doctor-name"></h3>
                    <p class="specialty"></p>
                    <p class="price"></p>
                </div>

            </div>

            <div class="appointment-details">

                <p><strong>Patient:</strong> <span class="patient"></span></p>
                <p><strong>Date:</strong> <span class="date"></span></p>
                <p><strong>Time:</strong> <span class="time"></span></p>

            </div>

            <div>

                <span class="status ${cancelled ? 'cancelled' : 'confirmed'}">
                </span>

                <div class="actions">

                    ${cancelled ? "" : `
                        <button class="reschedule-btn">
                            Reschedule
                        </button>

                        <button class="cancel-btn">
                            Cancel
                        </button>
                    `}

                </div>

            </div>
        `;

        card.querySelector(".doctor-name").textContent = item.doctorName;
        card.querySelector(".specialty").textContent = item.specialty;
        card.querySelector(".price").textContent = item.price + " EGP";
        card.querySelector(".patient").textContent = item.patientName;
        card.querySelector(".date").textContent = item.date;
        card.querySelector(".time").textContent = item.time;
        card.querySelector(".status").textContent = item.status;

        if (!cancelled) {

            card.querySelector(".cancel-btn").onclick = function() {
                cancelAppointment(item.id);
            };

            card.querySelector(".reschedule-btn").onclick = function() {
                openReschedule(item.id);
            };

        }

        appointmentsList.appendChild(card);

    });

}

// Save Appointments

function saveAppointments() {

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    displayAppointments();

}

// Cancel Appointment

function cancelAppointment(id) {

    const appointment = appointments.find(function(item) {

        return item.id === id && ownsAppointment(item);

    });

    if (!appointment || appointment.status === "Cancelled") {
        return;
    }

    const confirmed = confirm(
        "Are you sure you want to cancel this appointment?"
    );

    if (!confirmed) {
        return;
    }

    appointment.status = "Cancelled";

    saveAppointments();

}

// Open Reschedule Window

function openReschedule(id) {

    const appointment = appointments.find(function(item) {

        return item.id === id && ownsAppointment(item);

    });

    if (!appointment || appointment.status === "Cancelled") {
        return;
    }

    selectedId = id;

    document.getElementById("newDate").value =
        appointment.date;

    document.getElementById("newTime").value =
        appointment.time;

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    document.getElementById("newDate").min =
        year + "-" + month + "-" + day;

    modal.style.display = "flex";

}

// Close Reschedule Window

document.getElementById("closeModal").onclick = function() {

    modal.style.display = "none";

    selectedId = null;

};

// Reschedule Appointment

document.getElementById("rescheduleForm")
.addEventListener("submit", function(event) {

    event.preventDefault();

    const newDate =
        document.getElementById("newDate").value;

    const newTime =
        document.getElementById("newTime").value;

    const appointment = appointments.find(function(item) {

        return item.id === selectedId && ownsAppointment(item);

    });

    if (!appointment || appointment.status === "Cancelled") {
        return;
    }

    // Prevent Past Appointments

    if (new Date(newDate + "T" + newTime) <= new Date()) {

        alert("Please select a future appointment.");

        return;

    }

    // Check Availability

    const alreadyBooked = appointments.some(function(item) {

        return item.id !== selectedId &&
               item.doctorId === appointment.doctorId &&
               item.date === newDate &&
               item.time === newTime &&
               item.status !== "Cancelled";

    });

    if (alreadyBooked) {

        alert("This appointment is already booked.");

        return;

    }

    // Update Appointment

    appointment.date = newDate;

    appointment.time = newTime;

    saveAppointments();

    modal.style.display = "none";

    selectedId = null;

    alert("Appointment rescheduled successfully!");

});

// Display When Page Loads

if (appointmentUser && appointmentUser.role === "patient") {

    displayAppointments();

}