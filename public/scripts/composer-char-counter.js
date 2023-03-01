$(document).ready(function() {
  console.log("document.ready");
  $("#tweet-text").on("input",function() {
    const total = 140;
    const curCount = $(this).val().length;
    
    let remain = total - curCount;

    // output counter
    const $counter = $(this).siblings(".button-container").children(".counter");
    $counter.text(remain);

    remain < 0 ? $counter.addClass("negativeCounter") : $counter.removeClass("negativeCounter");
  });
});
