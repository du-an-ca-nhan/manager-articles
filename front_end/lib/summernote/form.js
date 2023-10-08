var Summernote = {};
Summernote.summer = function () {
  $("#summernote").summernote({
    placeholder: "What are you writing today?",
    tabsize: 10,
    height: 600,
    toolbar: [
      ["style", ["style"]],
      ["font", ["bold", "underline", "clear"]],
      ["fontname", ["fontname"]],
      ["color", ["color"]],
      ["para", ["ul", "ol", "paragraph"]],
      ["table", ["table"]],
      ["insert", ["link", "picture", "video"]],
      ["view", ["codeview", "help"]],
    ],
  });
};
