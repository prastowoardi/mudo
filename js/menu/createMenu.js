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

                location.reload();
            },
            error: function (error) {
                console.error(error);
            },
        });
    });
});
