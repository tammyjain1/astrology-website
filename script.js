/* =========================================
   ASTROLOGY WEBSITE
   AI BOOKING ASSISTANT
========================================= */

const chatButton = document.querySelector(".chat-button");
const chatBox = document.querySelector(".chat-box");
const closeChat = document.querySelector("#closeChat");
const chatBody = document.querySelector(".chat-body");


/* Open chatbot */

if (chatButton) {
    chatButton.addEventListener("click", () => {
        chatBox.classList.add("active");
    });
}


/* Close chatbot */

if (closeChat) {
    closeChat.addEventListener("click", () => {
        chatBox.classList.remove("active");
    });
}


/* Add message */

function addMessage(text, type = "bot") {

    const message = document.createElement("div");

    message.className = `chat-message ${type}`;

    message.innerHTML = text;

    chatBody.appendChild(message);

    chatBody.scrollTop = chatBody.scrollHeight;
}


/* Add options */

function addOptions(options) {

    const container = document.createElement("div");

    container.className = "chat-options";

    options.forEach(option => {

        const button = document.createElement("button");

        button.textContent = option.text;

        button.addEventListener("click", () => {

            addMessage(option.text, "user");

            container.remove();

            setTimeout(() => {
                option.action();
            }, 500);

        });

        container.appendChild(button);

    });

    chatBody.appendChild(container);

    chatBody.scrollTop = chatBody.scrollHeight;
}


/* Start consultation */

function startConsultation() {

    addMessage(
        "I'd love to help you book a consultation. ✨<br><br>What would you like guidance on?"
    );

    addOptions([

        {
            text: "❤️ Love & Relationships",
            action: () => choosePlan("Love & Relationships")
        },

        {
            text: "💼 Career & Business",
            action: () => choosePlan("Career & Business")
        },

        {
            text: "💰 Finance & Growth",
            action: () => choosePlan("Finance & Growth")
        },

        {
            text: "🔮 Complete Life Reading",
            action: () => choosePlan("Complete Life Reading")
        }

    ]);
}


/* Choose plan */

function choosePlan(topic) {

    addMessage(
        `Perfect. I'll help you with <strong>${topic}</strong>.<br><br>Which consultation would you prefer?`
    );

    addOptions([

        {
            text: "✨ Quick Guidance — ₹999",
            action: () => chooseDate("Quick Guidance")
        },

        {
            text: "🌙 Detailed Reading — ₹1,999",
            action: () => chooseDate("Detailed Reading")
        },

        {
            text: "🌟 Complete Consultation — ₹3,499",
            action: () => chooseDate("Complete Consultation")
        }

    ]);
}


/* Choose date */

function chooseDate(plan) {

    addMessage(
        `You've selected <strong>${plan}</strong>.<br><br>When would you like to speak with the astrologer?`
    );

    addOptions([

        {
            text: "Tomorrow",
            action: () => chooseTime("Tomorrow")
        },

        {
            text: "Day After Tomorrow",
            action: () => chooseTime("Day After Tomorrow")
        },

        {
            text: "Choose another date",
            action: () => customDate()
        }

    ]);
}


/* Custom date */

function customDate() {

    addMessage(
        "No problem. Please enter your preferred date in the format:<br><br><strong>DD / MM / YYYY</strong>"
    );

    showInput("Enter date", (value) => {

        if (!value) return;

        addMessage(value, "user");

        setTimeout(() => {
            chooseTime(value);
        }, 500);

    });
}


/* Choose time */

function chooseTime(date) {

    addMessage(
        `Great. <strong>${date}</strong> works.<br><br>Choose a convenient time:`
    );

    addOptions([

        {
            text: "10:00 AM",
            action: () => confirmBooking(date, "10:00 AM")
        },

        {
            text: "1:00 PM",
            action: () => confirmBooking(date, "1:00 PM")
        },

        {
            text: "5:00 PM",
            action: () => confirmBooking(date, "5:00 PM")
        },

        {
            text: "7:00 PM",
            action: () => confirmBooking(date, "7:00 PM")
        }

    ]);
}


/* Confirmation */

function confirmBooking(date, time) {

    addMessage(
        `Excellent. ✨<br><br>
        Your preferred consultation time is:<br>
        <strong>${date} at ${time}</strong><br><br>
        May I have your name to complete the request?`
    );

    showInput("Your name", (name) => {

        if (!name) return;

        addMessage(name, "user");

        setTimeout(() => {

            addMessage(
                `Thank you, <strong>${name}</strong>. 🌙<br><br>
                Your consultation request has been prepared successfully.<br><br>
                <span class="booking-success">
                ✦ Booking Request Ready
                </span><br><br>
                Our astrologer will contact you to confirm the appointment.`
            );

        }, 700);

    });
}


/* Input */

function showInput(placeholder, callback) {

    const inputArea = document.createElement("div");

    inputArea.className = "chat-input-area";

    inputArea.innerHTML = `
        <input
            type="text"
            placeholder="${placeholder}"
            autocomplete="off"
        >
        <button>Send</button>
    `;

    chatBody.appendChild(inputArea);

    const input = inputArea.querySelector("input");
    const button = inputArea.querySelector("button");

    input.focus();

    function submit() {

        const value = input.value.trim();

        if (!value) return;

        inputArea.remove();

        callback(value);

    }

    button.addEventListener("click", submit);

    input.addEventListener("keydown", (event) => {

        if (event.key === "Enter") {
            submit();
        }

    });

}


/* Initial chatbot */

window.addEventListener("load", () => {

    if (!chatBody) return;

    setTimeout(() => {

        addMessage(
            "Hello ✨ I'm your astrology assistant.<br><br>I can help you explore consultations and book a session with our astrologer."
        );

        addOptions([

            {
                text: "🔮 Book a Consultation",
                action: startConsultation
            },

            {
                text: "🌙 Explore Astrology Plans",
                action: () => {

                    addMessage(
                        "We offer personalised astrology consultations designed around your questions and goals."
                    );

                    addOptions([

                        {
                            text: "View Plans",
                            action: () => {

                                document
                                    .querySelector("#plans")
                                    ?.scrollIntoView({
                                        behavior: "smooth"
                                    });

                            }
                        },

                        {
                            text: "Book a Consultation",
                            action: startConsultation
                        }

                    ]);

                }
            }

        ]);

    }, 3500);

});
