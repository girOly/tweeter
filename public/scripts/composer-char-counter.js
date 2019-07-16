let numCount = 140;
let counter = 140;

$(document).ready(function() {
  console.log("Document Loaded and Ready to Execute!");
// Updates Tweet length counter
  $("textarea").keyup(function() {
    console.log(this.value.length);
    let numCount = counter - this.value.length;
    $("span.counter").html(numCount);
  });
});
