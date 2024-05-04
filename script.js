jQuery(($) => {
  $.noConflict();

  const handleSubmit = () => {
    console.log("Hello world");
  };

  $("#youtubeLinkInput").on("paste", function (event) {
    event.preventDefault();

    const pastedText = (event.originalEvent || event).clipboardData.getData(
      "text"
    );

    console.log("Pasted text:", pastedText);
    handleSubmit();
  });

  $("#submitButton").on("click", function () {
    const inputValue = $("#youtubeLinkInput").val();

    console.log("Submitted value:", inputValue);

    handleSubmit();
  });
});
