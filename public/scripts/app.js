/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const data = [];

const loadTweets = function() {
  $("textarea").val('');

  $.get("/tweets").done(function(tweets) {
    renderTweets(tweets);
  });
};

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
    $(".tweets").prepend(createTweetElement(tweet));
  }
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
};

const createTweetElement = function(tweet) {
  let $article = $("<article>").addClass("tweetArticle");
  let $tweet = $("<p>").addClass("tweet");
  let $post_header = $("<header>").addClass("tweetHeader");
  let $post_author = $("<h5>");
  let $post_handle = $("<h5>");
  let $post_footer = $("<footer>");
  let $post_timestamp = $("<p>").addClass("timestamp");
  let $post_icon = $("<img>").addClass("icons");
  let $post_face = $("<img>");

  // Adding content to my elements
  $tweet.text(tweet.content.text);
  $post_author.html(tweet.user.avatars[0]);
  $post_author.text(tweet.user.name);
  $post_handle.text(tweet.user.handle);
  $post_timestamp.text(new Date(tweet.created_at));
  $post_face.attr("src", tweet["user"].avatars);
  $post_icon.attr("src", "images/icons.png");

  // event.preventDefault();

  //Build my element
  $post_header.append($post_author).append($post_handle);
  $post_footer.append($post_timestamp).append($post_icon);
  $post_author.prepend($post_face);

  $article
    .append($post_header)
    .append($tweet)
    .append($post_footer);

  // Return the built element

  return $article;
};

$(document).ready(() => {
  loadTweets();

  $(".tweetForm").on("submit", event => {
    event.preventDefault();
    let textForm = $(event.target).serialize();
    let postReq = {
      url: "/tweets",
      type: "POST",
      data: textForm
    };
    let formLength = $(event.target)
      .find("textarea")
      .val().length;
    if (formLength < 140 && formLength > 0) {
      $(".errorText")
        .empty()
        .hide();
      $.ajax(postReq).done(loadTweets);
    }
    if (formLength > 140) {
      $(".error").show("slow", function() {
        $(".errorText").text("Why you no respect the 140 Charecter Rule?!");
      });
    }
    if (formLength <= 0) {
      $(".error").show("slow", function() {
        $(".errorText").text("Why you no Type anything?!");
      });
    }
  });
  $(".new-tweet").hide();
  $("#clickhere").click(function() {
    $(".new-tweet").slideToggle("slow", function() {});
  });
});
