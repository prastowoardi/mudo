$(document).ready(function () {
    $("#tambah").on("click", function () {
        $("#modal-form").css("display", "block");
    });

    $(".close").on("click", function () {
        $("#modal-form").css("display", "none");
    });

    $("#submitForm").on("click", function () {
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
                console.log(response);

                $("#modal-form").css("display", "none");
                localStorage.setItem('successMessage', 'Berhasil menambahkan menu');
                location.reload();
            },
            error: function (error) {
                console.error(error);
                const errorMessageElement = document.getElementById('alert');
                if (errorMessageElement) {
                    errorMessageElement.textContent = error.message || 'Terjadi kesalahan saat menambah data.';
                }
            },
        });
    });
});

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
