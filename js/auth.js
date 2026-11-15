
const SCHOOL_DOMAIN = "@school.ac.kr";

const form = document.getElementById("login-form");
const message = document.getElementById("login-message");
const actionButtons = document.getElementById("action-buttons");

function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

function showActionButtons() {
    actionButtons.style.display = "block";
}

// Check existing session
supabaseClient.auth.getSession().then(({ data, error }) => {
    if (error) {
        showMessage("Could not check login status.", "error");
        return;
    }

    if (data.session) {
        showMessage("You are already logged in.", "success");
        showActionButtons();
    }
});

// Login
form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!email.toLowerCase().endsWith(SCHOOL_DOMAIN)) {
        showMessage(
            "Only school email addresses can be used to log in.",
            "error"
        );
        return;
    }

    const { error } = await supabaseClient.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        showMessage(
            "Login failed. Please check your email and password.",
            "error"
        );
        return;
    }

    showMessage("Login successful!", "success");
    showActionButtons();
});
