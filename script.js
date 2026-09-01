/* =========================================
   ASTROLOGY WEBSITE
   AI BOOKING ASSISTANT
========================================= */

const chatButton = document.querySelector(".chat-button");
const chatBox = document.querySelector(".chat-box");
const closeChat = document.querySelector("#closeChat");
const chatBody = document.querySelector(".chat-body");


/* =========================================
   OPEN CHATBOT
========================================= */

if (chatButton && chatBox) {
    chatButton.addEventListener("click", () => {
        chatBox.classList.add("active");

        if (chatBody && chatBody.children.length === 0) {
            startChat();
        }
    });
}


/* =========================================
   CLOSE CHATBOT
========================================= */

if (closeChat && chatBox) {
    closeChat.addEventListener("click", () => {
        chatBox.classList.remove("active");
    });
}


/* =========================================
   ADD MESSAGE
========================================= */

function addMessage(text, type = "bot") {

    if (!chatBody) return;

    const message = document.createElement("div");

    message.className = `chat-message ${type}`;

    message.innerHTML = text;

    chatBody.appendChild(message);

    chatBody.scrollTop = chatBody.scrollHeight;
}


/* =========================================
   ADD BUTTON OPTIONS
========================================= */

function addOptions(options) {

    if (!chatBody) return;

    const container = document.createElement("div");

    container.className = "chat-options";

    options.forEach(option => {

        const button = document.createElement("button");

        button.type = "button";

        button.textContent = option.text;

        button.addEventListener("click", () => {

            addMessage(option.text, "user");

            container.remove();

            setTimeout(() => {
                option.action();
            }, 400);

        });

        container.appendChild(button);

    });

    chatBody.appendChild(container);

    chatBody.scrollTop = chatBody.scrollHeight;
}


/* =========================================
   START CHAT
========================================= */

function startChat() {

    addMessage(
        "Hello ✨ I'm your astrology assistant.<br><br>" +
        "I can help you explore our astrology plans or book a personal consultation with our astrologer."
    );

    addOptions([

        {
            text: "🔮 Book a Consultation",
            action: startConsultation
        },

        {
            text: "🌙 Explore Astrology Plans",
            action: explorePlans
        },

        {
            text: "✨ Tell Me About Astrology",
            action: aboutAstrology
        }

    ]);
}


/* =========================================
   CONSULTATION
========================================= */

function startConsultation() {

    addMessage(
        "I'd love to help you book a consultation. ✨<br><br>" +
        "What would you like guidance on?"
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


/* =========================================
   CHOOSE PLAN
========================================= */

function choosePlan(topic) {

    addMessage(
        `Perfect. I'll help you with <strong>${topic}</strong>.<br><br>` +
        "Which consultation would you prefer?"
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


/* =========================================
   CHOOSE DATE
========================================= */

function chooseDate(plan) {

    addMessage(
        `You've selected <strong>${plan}</strong>.<br><br>` +
        "When would you like to speak with the astrologer?"
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
            text: "Choose Another Date",
            action: customDate
        }

    ]);
}


/* =========================================
   CUSTOM DATE
========================================= */

function customDate() {

    addMessage(
        "No problem ✨<br><br>" +
        "Please enter your preferred date.<br><br>" +
        "<strong>DD / MM / YYYY</strong>"
    );

    showInput("Enter date", (value) => {

        addMessage(value, "user");

        setTimeout(() => {
            chooseTime(value);
        }, 500);

    });
}


/* =========================================
   CHOOSE TIME
========================================= */

function chooseTime(date) {

    addMessage(
        `Great. <strong>${date}</strong> works. ✨<br><br>` +
        "Choose a convenient time:"
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


/* =========================================
   CONFIRM BOOKING
========================================= */

function confirmBooking(date, time) {

    addMessage(
        `Excellent. ✨<br><br>` +
        `Your preferred consultation time is:<br>` +
        `<strong>${date} at ${time}</strong><br><br>` +
        "May I have your name to complete the request?"
    );

    showInput("Your name", (name) => {

        addMessage(name, "user");

        setTimeout(() => {

            addMessage(
                `Thank you, <strong>${name}</strong>. 🌙<br><br>` +
                "Your consultation request has been prepared successfully.<br><br>" +
                `<span class="booking-success">✦ Booking Request Ready</span><br><br>` +
                "Our astrologer will contact you to confirm the appointment."
            );

            addOptions([

                {
                    text: "📅 Explore Plans",
                    action: explorePlans
                },

                {
                    text: "🔮 Start Again",
                    action: restartChat
                }

            ]);

        }, 700);

    });
}


/* =========================================
   ASTROLOGY INFORMATION
========================================= */

function aboutAstrology() {

    addMessage(
        "Astrology is a traditional system that explores the relationship " +
        "between celestial movements and different areas of life. ✨<br><br>" +
        "Our consultations are designed to provide personalised guidance " +
        "around relationships, career, finance and life decisions."
    );

    addOptions([

        {
            text: "🔮 Book a Consultation",
            action: startConsultation
        },

        {
            text: "🌙 Explore Plans",
            action: explorePlans
        }

    ]);
}


/* =========================================
   EXPLORE PLANS
========================================= */

function explorePlans() {

    addMessage(
        "We offer personalised astrology consultations designed around " +
        "your questions, concerns and goals. ✨"
    );

    addOptions([

        {
            text: "View Plans",
            action: () => {

                const plansSection = document.querySelector("#plans");

                if (plansSection) {

                    plansSection.scrollIntoView({
                        behavior: "smooth"
                    });

                }

            }
        },

        {
            text: "🔮 Book a Consultation",
            action: startConsultation
        }

    ]);
}


/* =========================================
   INPUT BOX
========================================= */

function showInput(placeholder, callback) {

    if (!chatBody) return;

    const inputArea = document.createElement("div");

    inputArea.className = "chat-input-area";

    inputArea.innerHTML = `
        <input
            type="text"
            placeholder="${placeholder}"
            autocomplete="off"
        >
        <button type="button">Send</button>
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


/* =========================================
   RESTART CHAT
========================================= */

function restartChat() {

    if (!chatBody) return;

    chatBody.innerHTML = "";

    setTimeout(() => {
        startChat();
    }, 300);
}


/* =========================================
   NO AUTOMATIC POPUP
========================================= */

/*
   Chatbot does NOT open automatically.
   User opens it by clicking the ✦ button.
*/
