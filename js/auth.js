function login() {
    clearErrorMessages();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

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
        } else {
            displayErrorMessage('Terjadi kesalahan saat melakukan login');
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
        displayErrorMessage('Terjadi kesalahan saat melakukan login');
    });
}

function clearErrorMessages() {
    document.getElementById("error-message").innerHTML = "";
    document.getElementById("username-message").innerHTML = "";
    document.getElementById("password-message").innerHTML = "";
}

function displayErrorMessage(message) {
    document.getElementById("error-message").innerHTML = message;
}

function displayFieldMessage(fieldName, message) {
    document.getElementById(fieldName + "-message").innerHTML = message;
}
