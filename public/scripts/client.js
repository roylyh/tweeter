/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// escape function
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

// function to create jQuery object tweetElement
// prevent XSS method 1 ${$("<p>").text(data.content.text).html()}
// method 2 using escape function
const createTweetElement = function(data) {
  return $(`<article class="tweet">
    <header>
      <div>
        <img src=${data.user.avatars} />
        <span>${data.user.name}</span>
      </div>
      <span>${data.user.handle}</span>
    </header>
    <p>${escape(data.content.text)}</p>
    <footer>
      <span><strong>${timeago.format(data.created_at)}</strong></span>
      <div>
        <i class="fa-solid fa-flag"></i><i class="fa-solid fa-retweet"></i><i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
};

// render the data
const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    // calls createTweetElement for each tweet
    const $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $("#tweets-container").prepend($tweet);
  }
};

// load the data
const loadtweets = () => {
  $.ajax({
    method: 'GET',
    url: "/tweets",
  }).then((tweets)=>{
    // console.log("tweets:", tweets);
    renderTweets(tweets);
  });
};

// load the tweets when ready
$(document).ready(()=>{
  loadtweets();
});

// listener of form submition
$('.new-tweet form').submit(function(event) {
  // prevent the default behaviour of browser
  event.preventDefault();

  // serialize the data
  const urlencoded = $(this).serialize();
  
  // check if the textarea is null or more than 140
  if (urlencoded.slice(5).length === 0) {
    // show the err message
    $("#errmsg1").slideDown("slow");
    return;
  }

  if (urlencoded.slice(5).replaceAll('%20',' ').length > 140) {
    // show the err message
    $("#errmsg2").slideDown("slow");
    return;
  }

  // hide the errmessage
  $("#errmsg1").slideUp("slow");
  $("#errmsg2").slideUp("slow");

  // ajx post request
  $.ajax({
    method: 'POST',
    url: "/tweets",
    data:urlencoded,
  }).then(()=>{
    $("#tweet-text").val("");
    loadtweets();
  });
});
