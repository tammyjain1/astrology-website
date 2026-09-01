document.addEventListener("DOMContentLoaded", function () {

    const chatButton = document.querySelector(".chat-button");
    const chatBox = document.querySelector(".chat-box");
    const closeChat = document.querySelector("#closeChat");
    const chatBody = document.querySelector(".chat-body");

    console.log("Astrology chatbot loaded");
    console.log("Chat button:", chatButton);
    console.log("Chat box:", chatBox);


    /* OPEN CHAT */

    if (chatButton && chatBox) {

        chatButton.onclick = function () {
            chatBox.classList.add("active");
        };

    }


    /* CLOSE CHAT */

    if (closeChat && chatBox) {

        closeChat.onclick = function () {
            chatBox.classList.remove("active");
        };

    }


    /* MESSAGE */

    function addMessage(text, type = "bot") {

        if (!chatBody) return;

        const message = document.createElement("div");

        message.className = "chat-message " + type;

        message.innerHTML = text;

        chatBody.appendChild(message);

        chatBody.scrollTop = chatBody.scrollHeight;
    }


    /* OPTIONS */

    function addOptions(options) {

        const container = document.createElement("div");

        container.className = "chat-options";

        options.forEach(function (option) {

            const button = document.createElement("button");

            button.type = "button";

            button.textContent = option.text;

            button.onclick = function () {

                addMessage(option.text, "user");

                container.remove();

                setTimeout(function () {
                    option.action();
                }, 400);

            };

            container.appendChild(button);

        });

        chatBody.appendChild(container);

        chatBody.scrollTop = chatBody.scrollHeight;
    }


    /* START CONSULTATION */

    function startConsultation() {

        addMessage(
            "I'd love to help you book a consultation. ✨<br><br>" +
            "What would you like guidance on?"
        );

        addOptions([

            {
                text: "❤️ Love & Relationships",
                action: function () {
                    choosePlan("Love & Relationships");
                }
            },

            {
                text: "💼 Career & Business",
                action: function () {
                    choosePlan("Career & Business");
                }
            },

            {
                text: "💰 Finance & Growth",
                action: function () {
                    choosePlan("Finance & Growth");
                }
            },

            {
                text: "🔮 Complete Life Reading",
                action: function () {
                    choosePlan("Complete Life Reading");
                }
            }

        ]);
    }


    /* CHOOSE PLAN */

    function choosePlan(topic) {

        addMessage(
            "Perfect. I'll help you with <strong>" +
            topic +
            "</strong>.<br><br>" +
            "Which consultation would you prefer?"
        );

        addOptions([

            {
                text: "✨ Quick Guidance — ₹999",
                action: function () {
                    chooseDate("Quick Guidance");
                }
            },

            {
                text: "🌙 Detailed Reading — ₹1,999",
                action: function () {
                    chooseDate("Detailed Reading");
                }
            },

            {
                text: "🌟 Complete Consultation — ₹3,499",
                action: function () {
                    chooseDate("Complete Consultation");
                }
            }

        ]);
    }


    /* CHOOSE DATE */

    function chooseDate(plan) {

        addMessage(
            "You've selected <strong>" +
            plan +
            "</strong>.<br><br>" +
            "When would you like to speak with the astrologer?"
        );

        addOptions([

            {
                text: "Tomorrow",
                action: function () {
                    chooseTime("Tomorrow");
                }
            },

            {
                text: "Day After Tomorrow",
                action: function () {
                    chooseTime("Day After Tomorrow");
                }
            },

            {
                text: "Choose Another Date",
                action: customDate
            }

        ]);
    }


    /* CUSTOM DATE */

    function customDate() {

        addMessage(
            "No problem ✨<br><br>" +
            "Please enter your preferred date."
        );

        showInput("DD / MM / YYYY", function (date) {

            addMessage(date, "user");

            setTimeout(function () {
                chooseTime(date);
            }, 400);

        });
    }


    /* CHOOSE TIME */

    function chooseTime(date) {

        addMessage(
            "Great. <strong>" +
            date +
            "</strong> works.<br><br>" +
            "Choose a convenient time:"
        );

        addOptions([

            {
                text: "10:00 AM",
                action: function () {
                    confirmBooking(date, "10:00 AM");
                }
            },

            {
                text: "1:00 PM",
                action: function () {
                    confirmBooking(date, "1:00 PM");
                }
            },

            {
                text: "5:00 PM",
                action: function () {
                    confirmBooking(date, "5:00 PM");
                }
            },

            {
                text: "7:00 PM",
                action: function () {
                    confirmBooking(date, "7:00 PM");
                }
            }

        ]);
    }


    /* BOOKING */

    function confirmBooking(date, time) {

        addMessage(
            "Excellent. ✨<br><br>" +
            "Your preferred consultation time is:<br>" +
            "<strong>" +
            date +
            " at " +
            time +
            "</strong><br><br>" +
            "May I have your name?"
        );

        showInput("Your name", function (name) {

            addMessage(name, "user");

            setTimeout(function () {

                addMessage(
                    "Thank you, <strong>" +
                    name +
                    "</strong>. 🌙<br><br>" +
                    "Your consultation request has been prepared successfully.<br><br>" +
                    "<span class='booking-success'>" +
                    "✦ Booking Request Ready" +
                    "</span><br><br>" +
                    "Our astrologer will contact you to confirm the appointment."
                );

            }, 600);

        });
    }


    /* INPUT */

    function showInput(placeholder, callback) {

        const area = document.createElement("div");

        area.className = "chat-input-area";

        area.innerHTML = `
            <input type="text" placeholder="${placeholder}">
            <button type="button">Send</button>
        `;

        chatBody.appendChild(area);

        const input = area.querySelector("input");
        const button = area.querySelector("button");

        input.focus();

        function submit() {

            const value = input.value.trim();

            if (!value) return;

            area.remove();

            callback(value);
        }

        button.onclick = submit;

        input.onkeydown = function (event) {

            if (event.key === "Enter") {
                submit();
            }

        };

    }


    /* FIRST CHAT MESSAGE */

    function firstMessage() {

        if (!chatBody) return;

        chatBody.innerHTML = "";

        addMessage(
            "Hello ✨ I'm your astrology assistant.<br><br>" +
            "I can help you explore astrology plans or book a personal consultation."
        );

        addOptions([

            {
                text: "🔮 Book a Consultation",
                action: startConsultation
            },

            {
                text: "🌙 Explore Astrology Plans",
                action: function () {

                    addMessage(
                        "We offer personalised astrology consultations designed around your questions and goals. ✨"
                    );

                    addOptions([

                        {
                            text: "View Plans",
                            action: function () {

                                const plans = document.querySelector("#plans");

                                if (plans) {
                                    plans.scrollIntoView({
                                        behavior: "smooth"
                                    });
                                }

                            }
                        },

                        {
                            text: "🔮 Book Consultation",
                            action: startConsultation
                        }

                    ]);

                }
            }

        ]);

    }


    /* OPEN CHAT WITH FIRST MESSAGE */

    if (chatButton) {

        chatButton.onclick = function () {

            chatBox.classList.add("active");

            if (chatBody.children.length === 0) {
                firstMessage();
            }

        };

    }

});
