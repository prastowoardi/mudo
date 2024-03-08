$(document).ready(function () {    
    $("#tambah").on("click", function () {
        $("#modal-form").css("display", "block");
        $(".error-message").text("");
    });

    $(".close").on("click", function () {
        closeModal();
    });

    $("#price").on("input", function() {
        this.value = this.value.replace(/\D/g, '');
    });

    $("#submitForm").on("click", function () {
        $(".error-message").text("");

        var formData = {
            name: $("#name").val(),
            description: $("#description").val(),
            price: $("#price").val(),
            type: $("#type").val(),
            imageURL: $("#imageURL").val(),
        };

        var isValid = validateForm(formData);
        if (isValid) {
            submitForm(formData);
        }
    });
});

function closeModal() {
    $("#modal-form").css("display", "none");
    $(".error-message").text("");
}

function submitForm(formData) {
    const authToken = localStorage.getItem('authToken');

    $.ajax({
        type: "POST",
        url: "https://api.mudoapi.tech/menu",
        data: JSON.stringify(formData),
        contentType: "application/json",
        headers: {
            'Authorization': `Bearer ${authToken}`
        },
        success: function (response) {
            closeModal();
            localStorage.setItem('successMessage', 'Menu Created Successfully');
            location.reload();
        },
    });
}

function validateForm(formData) {
    var isValid = true;
    Object.keys(formData).forEach(function (key) {
        var field = $("#" + key);
        var label = $('label[for="' + key + '"]');
        var errorMessage = label.text().replace(':', '').replace('*', '').trim();

        if (typeof formData[key] === 'string' && formData[key].trim() === "") {
            displayErrorMessage(field, errorMessage + " is required");
            isValid = false;
        } else if (key === "price") {
            if (formData[key] === '') {
                displayErrorMessage(field, errorMessage + " must be a number");
                isValid = false;
            }
        } else if (key === "type" && formData[key] === "#") {
            displayErrorMessage(field, errorMessage + " must be chosen");
            isValid = false;
        }
    });
    return isValid;
}

function displayErrorMessage(field, message) {
    $("<div>")
        .addClass("error-message")
        .text(message)
        .insertAfter(field)
        .css("font-size", "13px")
}

document.addEventListener("DOMContentLoaded", function() {
    const successMessage = localStorage.getItem('successMessage');
    const authToken = localStorage.getItem('authToken');

    if (!authToken) {
        window.location.href = '../../index.html';
    }

    if (successMessage) {
        const errorMessageElement = document.getElementById('alert');
        if (errorMessageElement) {
            errorMessageElement.textContent = successMessage;
        }
        localStorage.removeItem('successMessage');
    }
    const pageId = urlParams.get('page');

    getList(pageId);
});
