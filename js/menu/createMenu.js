$(document).ready(function () {
    $("#tambah").on("click", function () {
        $("#modal-form").css("display", "block");
        $(".error-message").text("");
    });

    $(".close").on("click", function () {
        $("#modal-form").css("display", "none");
        $(".error-message").text("");
    });

    $("#submitForm").on("click", function () {
        $(".error-message").text("");

        var formData = {
            name: $("#name").val(),
            description: $("#description").val(),
            price: parseInt($("#price").val()),
            type: $("#type").val(),
            imageURL: $("#imageURL").val(),
        };
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
                $("#modal-form").css("display", "none");
                localStorage.setItem('successMessage', 'Berhasil menambahkan menu');
                location.reload();
            },
        });

        Object.keys(formData).forEach(function (key) {
            var field = $("#" + key);
            var label = $('label[for="' + key + '"]');
            var errorMessage = label.text().replace(':', '').replace('*', '').trim();
        
            if (typeof formData[key] === 'string' && formData[key].trim() === "") {
                displayErrorMessage(field, errorMessage + " wajib diisi");
            } else if (key === "price" && isNaN(formData[key])) {
                displayErrorMessage(field, errorMessage + " wajib diisi");
            } else if (key === "type" && formData[key] === "#") {
                displayErrorMessage(field, errorMessage + " harus dipilih");
            }
        });
    });
});

function displayErrorMessage(field, message) {
    $("<div>")
        .addClass("error-message")
        .text(message)
        .insertAfter(field);
}

document.addEventListener("DOMContentLoaded", function() {
    const successMessage = localStorage.getItem('successMessage');

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
