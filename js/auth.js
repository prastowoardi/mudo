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
            window.location.href = "#";
        } else {
            displayErrorMessage('Terjadi kesalahan saat melakukan login');
        }
    })
    .catch(error => {
        console.error('Fetch Error:', error);
        displayErrorMessage('Terjadi kesalahan saat melakukan login');
    });
}

function register() {
    clearErrorMessages();

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

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
                window.location.href = "#";
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
