// Get users from localStorage
let users = JSON.parse(localStorage.getItem("users")) || [];

// ===== LOGIN FORM =====
const loginForm = document.getElementById("login-form");
if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", username);
            alert("Login successful!");
            window.location.href = "dashboard.html";
        } else {
            alert("Invalid username or password!");
        }
    });
}

// ===== SIGNUP FORM =====
const signupForm = document.getElementById("signup-form");
if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("new-username").value.trim();
        const password = document.getElementById("new-password").value.trim();
        const confirmPassword = document.getElementById("confirm-password").value.trim();

        if (!username || !password || !confirmPassword) {
            alert("Please fill all fields");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        users = JSON.parse(localStorage.getItem("users")) || [];

        if (users.find(u => u.username === username)) {
            alert("Username already exists!");
            return;
        }

        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));

        // Auto-login after signup
        localStorage.setItem("loggedInUser", username);
        alert("Signup successful! Redirecting to dashboard...");
        window.location.href = "dashboard.html";
    });
}
