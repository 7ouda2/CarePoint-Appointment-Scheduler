// Check Current User

const bookingUser = JSON.parse(
    sessionStorage.getItem("currentUser")
);

if (!bookingUser || bookingUser.role !== "patient") {

    alert("Please login before booking an appointment.");

    window.location.replace("login.html");

} else {

    document.getElementById("patientName").value =
        bookingUser.name;

    document.getElementById("email").value =
        bookingUser.email;

    document.getElementById("phone").value =
        bookingUser.phone || "";

    document.getElementById("patientName").readOnly = true;

    document.getElementById("email").readOnly = true;

}

// Doctors Data

const doctors = [

    { id: 1, name: "Dr. Ahmed Hassan", specialty: "Cardiology", price: 500, image: "d1.png" },

    { id: 2, name: "Dr. Sara Mohamed", specialty: "Dentistry", price: 350, image: "d3.png" },

    { id: 3, name: "Dr. Omar Ali", specialty: "Dermatology", price: 400, image: "d2.png" },

    { id: 4, name: "Dr. Mariam Adel", specialty: "Neurology", price: 600, image: "d5.png" },

    { id: 5, name: "Dr. Mostafa Ibrahim", specialty: "Orthopedics", price: 450, image: "d4.png" },

    { id: 6, name: "Dr. Nour Khaled", specialty: "Pediatrics", price: 300, image: "d6.png" }

];

// Get Selected Doctor

const params = new URLSearchParams(window.location.search);

const doctorId = Number(params.get("doctor"));

const selectedDoctor = doctors.find(function(doctor) {

    return doctor.id === doctorId;

});

// Display Doctor Information

if (selectedDoctor) {

    document.getElementById("doctorName").textContent =
        selectedDoctor.name;

    document.getElementById("doctorSpecialty").textContent =
        selectedDoctor.specialty;

    document.getElementById("doctorPrice").textContent =
        selectedDoctor.price + " EGP";

    document.getElementById("doctorImage").src =
        selectedDoctor.image;

} else if (bookingUser && bookingUser.role === "patient") {

    window.location.replace("doctors.html");

}

// Prevent Past Dates

const today = new Date();

const year = today.getFullYear();

const month = String(today.getMonth() + 1).padStart(2, "0");

const day = String(today.getDate()).padStart(2, "0");

document.getElementById("date").min =
    year + "-" + month + "-" + day;

// Booking Form

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!selectedDoctor || !bookingUser ||
        bookingUser.role !== "patient") {

        return;

    }

    const phone = document.getElementById("phone").value.trim();

    const date = document.getElementById("date").value;

    const time = document.getElementById("time").value;

    // Validate Phone Number

    if (!/^[0-9]{11}$/.test(phone)) {

        alert("Please enter a valid 11-digit phone number.");

        return;

    }

    // Get Previous Appointments

    let appointments =
        JSON.parse(localStorage.getItem("appointments")) || [];

    // Check Appointment Date

    if (!date || !time ||
        new Date(date + "T" + time) <= new Date()) {

        alert("Please select a future appointment.");

        return;

    }

    // Check If Time Is Already Booked

    const alreadyBooked = appointments.some(function(item) {

        return item.doctorId === selectedDoctor.id &&
               item.date === date &&
               item.time === time &&
               item.status !== "Cancelled";

    });

    if (alreadyBooked) {

        alert("This appointment is already booked.");

        return;

    }

    // Create Appointment Object

    const appointment = {

        id: Date.now(),

        doctorId: selectedDoctor.id,

        doctorName: selectedDoctor.name,

        specialty: selectedDoctor.specialty,

        price: selectedDoctor.price,

        patientName: bookingUser.name,

        email: bookingUser.email,

        phone: phone,

        date: date,

        time: time,

        status: "Confirmed"

    };

    // Save Appointment

    appointments.push(appointment);

    localStorage.setItem(
        "appointments",
        JSON.stringify(appointments)
    );

    alert("Appointment booked successfully!");

    window.location.href = "appointments.html";

});