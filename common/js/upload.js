$(document).ready(function () {
    $('#uploadForm').on('submit', function (e) {
        e.preventDefault();
        var formData = new FormData(this);

        $.ajax({
            url: 'upload.php',
            type: 'POST',
            data: formData,
            contentType: false,
            processData: false,
            success: function (response) {
                $('#message').html(response);
            },
            error: function () {
                $('#message').html('An error occurred while uploading the image.');
            }
        });
    });
});
