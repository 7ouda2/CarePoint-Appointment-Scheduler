
const searchInput = document.getElementById("searchInput");
const specialtyFilter = document.getElementById("specialtyFilter");
const doctors = document.querySelectorAll(".doctor-card");
const noResults = document.getElementById("noResults");

function filterDoctors() {

    const search = searchInput.value.toLowerCase();
    const specialty = specialtyFilter.value;

    let count = 0;

    doctors.forEach(function(doctor) {

        const name = doctor.querySelector("h2").textContent.toLowerCase();
        const doctorSpecialty = doctor.dataset.specialty;

        const matchesName = name.includes(search);

        const matchesSpecialty =
            specialty === "all" || doctorSpecialty === specialty;

        if (matchesName && matchesSpecialty) {

            doctor.style.display = "block";
            count++;

        } else {

            doctor.style.display = "none";

        }

    });

    if (count === 0) {
        noResults.style.display = "block";
    } else {
        noResults.style.display = "none";
    }
}

searchInput.addEventListener("input", filterDoctors);

specialtyFilter.addEventListener("change", filterDoctors);
