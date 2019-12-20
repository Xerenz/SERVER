$(document).ready(function() {
    console.log("DOCUMENT READY");
    $("#branch").on("change", function() {
        console.log("BRANCH SELECTED " + this.value);
        $.get("/"+this.value, function(data) {
            
            for (let i=0; i < length; i++) {
                $("#event").contents().remove();
                let opt = $("<option/>");
                opt.attr("text", data[i].name);
                opt.attr("val", data[i].name.trim());
                $("#event").append(opt);
            }
        });
    });
});