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

function goBack() {
    window.history.back();
}

document.addEventListener("DOMContentLoaded", function() {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", function(event) {
        const searchTerm = event.target.value.toLowerCase(); // Mendapatkan nilai dari input dan mengubahnya ke huruf kecil

        const menuItems = document.querySelectorAll("#data-menu tr");

        menuItems.forEach(item => {
            const itemContent = item.textContent.toLowerCase();
            if (itemContent.includes(searchTerm)) {
                item.style.display = "table-row"; // Menampilkan item jika cocok dengan kata kunci
            } else {
                item.style.display = "none"; // Menyembunyikan item jika tidak cocok dengan kata kunci
            }
        });
    });
});
