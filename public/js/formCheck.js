$("#reg-password, #reg-re-password").on("keyup", function () {
  if ($("#reg-password").val() == $("#reg-re-password").val()) {
    $("#message").html("Matched !").css("color", "green");
    $(".reg-button").prop("disabled", false);
  } else {
    $("#message").html("Password and Confirm Password do NOT match").css("color", "red");
  }
});
