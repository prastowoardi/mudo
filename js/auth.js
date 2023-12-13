function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    clearErrorMessages();

    if (!username && !password) {
        displayErrorMessage("Username dan Password harus diisi");
        return;
    }

    if (!username) {
        displayFieldMessage("username", "Username harus diisi");
        return;
    }

    if (!password) {
        displayFieldMessage("password", "Password harus diisi");
        return;
    }

    const data = {
        username: username,
        password: password
    };

    fetch('https://api.mudoapi.tech/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        return response.json();
    })
    .then(body => {
        console.log('Body:', body);
        if (body.success) {
            console.log('Selamat anda berhasil login');
            window.location.href = "../pages/menu/menu.html";
        } else {
            displayErrorMessage(body.message);
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
        displayErrorMessage('Terjadi kesalahan saat melakukan login');
    });
}

function register() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const name = document.getElementById('name').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    clearErrorMessages();

    const fields = [
        { field: 'name', value: name, message: 'Nama harus diisi' },
        { field: 'username', value: username, message: 'Username harus diisi' },
        { field: 'password', value: password, message: 'Password harus diisi' },
        { field: 'confirm-password', value: confirmPassword, message: 'Konfirmasi Password harus diisi' }
    ];

    fields.forEach(field => {
        if (!field.value) {
            displayFieldMessage(field.field, field.message);
        }
    });

    if (!password) {
        displayFieldMessage('password', 'Password harus diisi');
        return;
    } 
    
    if (password.length < 8) {
        displayFieldMessage('password', 'Password minimal 8 karakter');
        return;
    } 

    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/;
    if (!passwordRegex.test(password)) {
        displayErrorMessage('Password harus memiliki angka dan spesial karakter')
        return;
    }

    if (password !== confirmPassword) {
        displayFieldMessage('confirm-password', 'Konfirmasi Password tidak cocok');
        return;
    }

    const data = {
        name: name,
        username: username,
        password: password,
        roleId: 1,
    };

    fetch('https://api.mudoapi.tech/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(response => {
            return response.json();
        })
        .then(body => {
            console.log('Body:', body);
            if (body.success) {
                console.log('Selamat anda berhasil Mendaftar');
                successRegistration();
            } else {
                console.log(body.message);
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            displayErrorMessage(body.message);
        });
}

function clearErrorMessages() {
    const errorFields = ["name", "username", "password", "confirm-password"];

    errorFields.forEach(fieldName => {
        const element = document.getElementById(fieldName + "-message");
        if (element) {
            element.innerHTML = "";
        }
    });
}

function displayErrorMessage(message) {
    document.getElementById("error-message").innerHTML = message;
}

function displayFieldMessage(fieldName, message) {
    const element = document.getElementById(fieldName + "-message");
    if (element) {
        element.innerHTML = message;
    }
}

function successRegistration() {
    console.log("successRegistration function called");

    const registrationSuccessMessage = document.getElementById("registration-success-message");
    const loginButtonContainer = document.getElementById("login-button-container");
    const signupButtonContainer = document.getElementById("signup-button-container");
    const registrationForm = document.querySelector('.signin .content .form');
    const h2Element = document.querySelector('.signin .content h2');

    if (h2Element) {
        h2Element.textContent = "Berhasil"; // Use textContent to set the text
    }

    registrationForm.style.display = 'none';
    registrationSuccessMessage.style.display = "block";
    loginButtonContainer.style.display = "block";
    signupButtonContainer.style.display = "none";
}
