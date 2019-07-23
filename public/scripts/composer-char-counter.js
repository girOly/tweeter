// Handles the Tweet length Counter

let numCount = 140;
let counter = 140;

$(document).ready(function() {
  $("textarea").keyup(function() {
    let numCount = counter - this.value.length;
    if (numCount < 0) {
      $("span.counter").addClass("red");
      $("span.counter").html(numCount);
    } else {
      $("span.counter")
        .html(numCount)
        .addClass("counter")
        .removeClass("red");
    }
  });
});
