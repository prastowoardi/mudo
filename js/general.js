function showHidePassword(inputId, eyeContainerId, openEyeId, closedEyeId) {
    var passwordInput = document.getElementById(inputId);
    var eyeContainer = document.getElementById(eyeContainerId);
    var openEye = document.getElementById(openEyeId);
    var closedEye = document.getElementById(closedEyeId);

    if (passwordInput && eyeContainer && openEye && closedEye) {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            openEye.style.display = "none";
            closedEye.style.display = "block";
        } else {
            passwordInput.type = "password";
            openEye.style.display = "block";
            closedEye.style.display = "none";
        }
    } else {
        console.error("One or more elements not found.");
    }
}

function redirectToLogin() {
    window.location.href = "../../index.html";
}