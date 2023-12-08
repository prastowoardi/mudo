function showHidePassword() {
    var passwordInput = document.getElementById("password");
    var openEye = document.getElementById("open-eye");
    var closedEye = document.getElementById("closed-eye");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        openEye.style.display = "none";
        closedEye.style.display = "block";
    } else {
        passwordInput.type = "password";
        openEye.style.display = "block";
        closedEye.style.display = "none";
    }
}
