$(document).ready(function() {
  $("#tweet-text").on("input",function() {

    const curCount = $(this).val().length;
    
    let remain = _totalCharacters - curCount;

    // output counter
    const $counter = $(this).siblings(".button-container").children(".counter");
    $counter.text(remain);

    remain < 0 ? $counter.addClass("negativeCounter") : $counter.removeClass("negativeCounter");
  });
});
