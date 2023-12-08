function login() {
    clearErrorMessages();

    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

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

    var data = {
        username: username,
        password: password
    };

    var request = new XMLHttpRequest();

    request.open('POST', 'https://api.mudoapi.tech/login', true);
    request.setRequestHeader('Content-Type', 'application/json');

    request.onreadystatechange = function () {
        if (this.readyState === 4) {
            console.log(this.responseText);

            if (this.status === 200) {
                console.log('Selamat anda berhasil login');
            } else {
                displayErrorMessage(this.statusText);
            }
        }
    };

    var body = JSON.stringify(data);
    request.send(body);
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
