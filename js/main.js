// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.backgroundColor = '#1a1a1a';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.backgroundColor = 'transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Function to toggle between the two images
const imageCard = document.querySelector('.hero-image-card');
const images = document.querySelectorAll('.hero-image');

// Toggle Image on Click
imageCard.addEventListener('click', () => {
    images.forEach(image => {
        image.classList.toggle('active');
    });
});

// Toggle Light/Dark Mode
const toggleBtn = document.querySelector('.mode-toggle');
toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    toggleBtn.innerHTML = document.body.classList.contains('light-mode') ? '🌞' : '🌙';
});
// Smooth Scroll for Internal Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// About Image Parallax Mouse Movement Effect
const aboutImage = document.getElementById('about-image');

aboutImage.addEventListener('mousemove', (e) => {
    const { offsetWidth: width, offsetHeight: height } = aboutImage;
    const { offsetX: x, offsetY: y } = e;

    // Get percentage of mouse position within the image
    const xPercent = (x / width) * 100;
    const yPercent = (y / height) * 100;

    // Move the image based on mouse position
    aboutImage.style.transform = `rotateX(${yPercent - 50}deg) rotateY(${xPercent - 50}deg)`;
});

aboutImage.addEventListener('mouseleave', () => {
    // Reset the image position when the mouse leaves
    aboutImage.style.transform = 'rotateX(0deg) rotateY(0deg)';
});
// Toggle chatbot visibility
function toggleChatbot() {
    const chatbot = document.getElementById("chatbot");
    chatbot.style.display = (chatbot.style.display === "none" || chatbot.style.display === "") ? "flex" : "none";
}

// Send message and add it to chat window
function sendMessage() {
    const messageInput = document.getElementById("chat-input");
    const messageText = messageInput.value.trim();
    
    if (messageText !== "") {
        const messageContainer = document.querySelector(".messages");
        
        // Create a new message element
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent = messageText;
        messageContainer.appendChild(messageElement);
        
        // Scroll to the bottom
        messageContainer.scrollTop = messageContainer.scrollHeight;
        
        // Clear the input field
        messageInput.value = "";
        
        // Example: Auto-reply (can be replaced with actual chatbot logic)
        setTimeout(() => {
            const replyElement = document.createElement("div");
            replyElement.classList.add("message");
            replyElement.textContent = "Thanks for your message! We'll get back to you soon.";
            messageContainer.appendChild(replyElement);
            messageContainer.scrollTop = messageContainer.scrollHeight;
        }, 1000);
    }
}

// Prevent form submission
document.getElementById("chat-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        sendMessage();
    }
});
// Send message to the server
async function sendMessage() {
    const messageInput = document.getElementById("chat-input");
    const messageText = messageInput.value.trim();

    if (messageText !== "") {
        const messageContainer = document.querySelector(".messages");

        // Create a new message element
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.textContent = messageText;
        messageContainer.appendChild(messageElement);

        // Scroll to the bottom
        messageContainer.scrollTop = messageContainer.scrollHeight;

        // Clear the input field
        messageInput.value = "";

        try {
            // Send the user's message to the backend (your Node.js server)
            const response = await fetch("http://localhost:3000/chat", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ message: messageText }),
            });

            const data = await response.json();

            // Display the chatbot's response
            const replyElement = document.createElement("div");
            replyElement.classList.add("message");
            replyElement.textContent = data.message;
            messageContainer.appendChild(replyElement);

            // Scroll to the bottom again
            messageContainer.scrollTop = messageContainer.scrollHeight;
        } catch (error) {
            console.error("Error sending message:", error);
        }
    }
}

