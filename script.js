// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
function toggleSkills() {
    let skillsList = document.getElementById("skills-list");
    
    if (skillsList.classList.contains("show")) {
        skillsList.classList.remove("show"); // Hide skills
        setTimeout(() => { skillsList.style.display = "none"; }, 500);
    } else {
        skillsList.style.display = "block"; // Show skills
        setTimeout(() => { skillsList.classList.add("show"); }, 10);
    }
}

let skillsSection = document.getElementById("skills");
let skillsList = document.getElementById("skills-list");

skillsSection.addEventListener("mouseenter", function() {
    skillsList.style.display = "block";
    setTimeout(() => {
        skillsList.style.opacity = "1";
        skillsList.style.transform = "translateY(0)";
    }, 50);
});

skillsSection.addEventListener("mouseleave", function() {
    skillsList.style.opacity = "0";
    skillsList.style.transform = "translateY(10px)";
    setTimeout(() => {
        skillsList.style.display = "none";
    }, 500);
});


// Basic form validation
document.getElementById('contact-form').addEventListener('submit', function (e) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        e.preventDefault();
        alert('Please fill out all fields.');
    }
});