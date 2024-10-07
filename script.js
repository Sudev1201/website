let imageShown = false;
let textShown = false;

window.addEventListener('scroll', function() {
    const textContent = document.querySelector('.text-content');
    const imageContent = document.querySelector('.image-content img');

    const imagePosition = imageContent.getBoundingClientRect().top;
    const textPosition = textContent.getBoundingClientRect().top;

    const screenPosition = window.innerHeight / 1.2; // Adjust for when to trigger

    // Show image on first scroll
    if (!imageShown && imagePosition < screenPosition) {
        imageContent.classList.add('show');
        imageShown = true; // Prevent further triggering
    }

    // Show text on second scroll
    if (imageShown && !textShown && textPosition < screenPosition) {
        textContent.classList.add('show-text');
        textShown = true; // Prevent further triggering
    }
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section
    }
}

function scrollToFooter() {
    const footer = document.querySelector('footer');
    footer.scrollIntoView({ behavior: 'smooth' });
}

function submitForm(event) {
    console.log('into the submit form');
    // Prevent the default form submission
    event.preventDefault();

    // Create a JSON object from the form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value || null, // Optional field
        comments: document.getElementById('comments').value || null // Optional field
    };

    // Send the JSON object to your Google Apps Script web app
    fetch('https://script.google.com/macros/s/AKfycbwMWVlMBN4ZoRGVxM--3ZsgoAYn6dIZ5f7JhWrUULQ7KpcRnFdU24dvXQvYI8Vthp_U/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify(formData) // Convert the object to a JSON string
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Optionally, you can show a success message or reset the form
        document.getElementById('customForm').reset();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
