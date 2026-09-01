// ===============================
// GREETING BASED ON CURRENT TIME
// ===============================

function updateGreeting() {
    const greetingElement = document.getElementById("greeting");

    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
        greetingElement.textContent = "GOOD MORNING";
    } 
    else if (currentHour >= 12 && currentHour < 17) {
        greetingElement.textContent = "GOOD AFTERNOON";
    } 
    else {
        greetingElement.textContent = "GOOD EVENING";
    }
}

updateGreeting();


// ===============================
// CHATBOT
// ===============================

const chatButton = document.getElementById("chatButton");
const chatBox = document.getElementById("chatBox");
const closeChat = document.getElementById("closeChat");

chatButton.addEventListener("click", function () {
    chatBox.classList.toggle("active");
});

closeChat.addEventListener("click", function () {
    chatBox.classList.remove("active");
});


// ===============================
// CLOSE CHAT WHEN CLICKING OUTSIDE
// ===============================

document.addEventListener("click", function (event) {

    if (
        !chatBox.contains(event.target) &&
        !chatButton.contains(event.target)
    ) {
        chatBox.classList.remove("active");
    }

});


// ===============================
// CHAT OPTION INTERACTION
// ===============================

const chatOptions = document.querySelectorAll(".chat-body button");

chatOptions.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedOption = button.textContent;

        alert(
            "You selected: " +
            selectedOption +
            "\n\nOur assistant will help you choose the right consultation."
        );

    });

});


// ===============================
// PLAN BUTTONS
// ===============================

const planButtons = document.querySelectorAll(".plan-card button");

planButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        alert(
            "Booking system coming soon ✨\n\n" +
            "You will soon be able to select your date and time."
        );

    });

});


// ===============================
// FADE IN WEBSITE
// ===============================

window.addEventListener("load", function () {

    const website = document.getElementById("website");

    website.style.opacity = "0";

    setTimeout(function () {

        website.style.transition = "opacity 1.5s ease";
        website.style.opacity = "1";

    }, 500);

});
