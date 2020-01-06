$(document).ready(function() {

    $("#branch").change(function() {
        var branch = $(this).val();

        $.get("../routes/admin.routes.js")
    });

});