// CHANGE :: create a class to toggle likes when a link is clicked, using AJAX
class ToggleLike {
  constructor(toggleElement) {
    this.toggler = toggleElement;
    this.handleReactions();
  }

  handleReactions() {
    $(this.toggler).click(function (e) {
      e.preventDefault();
      let self = this;

      // console.log(this.href.split("="))
      // let emoji = this.href.split("=")[3];
      // this is a new way of writing ajax which you might've studied, it looks like the same as promises
      $.ajax({
        type: "POST",
        url: $(self).attr("href"),
      })
        .done(function (data) {
         
         
        let postId = data.data.emojiData.post_id;

        let myPostReaction = data.data.reaction;
        let displayElement = $(`.reaction-count-${postId}`);
        // displayElement.attr("data-reactions", myPostReaction);
        $(`.post-reaction-Like-${postId}`).html(parseInt(data.data.emojiData.Like.length));
        $(`.post-reaction-Sad-${postId}`).html(parseInt(data.data.emojiData.Sad.length));
        $(`.post-reaction-Angry-${postId}`).html(parseInt(data.data.emojiData.Angry.length));
        $(`.post-reaction-Love-${postId}`).html(parseInt(data.data.emojiData.Love.length));
        $(`.post-reaction-Wow-${postId}`).html(parseInt(data.data.emojiData.Wow.length));
          switch (myPostReaction) {
            case "Like": {
              $(`.reaction-icon-${postId}`).html("👍");
              displayElement.attr(`data-${myPostReaction}`, parseInt(data.data.emojiData.Like.length));
              displayElement.html(`${parseInt(data.data.emojiData.Like.length)} ${myPostReaction}s`);
              
              break;
            }
            case "Sad": {
              $(`.reaction-icon-${postId}`).html("😞");
              displayElement.attr(`data-${myPostReaction}`, parseInt(data.data.emojiData.Sad.length));
              displayElement.html(`${parseInt(data.data.emojiData.Sad.length)} ${myPostReaction}s`);
             
              break;
            }
            case "Angry": {
              $(`.reaction-icon-${postId}`).html("😡");
              console.log(data.data.emojiData);

              displayElement.attr(`data-${myPostReaction}`, parseInt(data.data.emojiData.Angry.length));
              displayElement.html(`${parseInt(data.data.emojiData.Angry.length)} ${myPostReaction}s`);
             

              break;
            }
            case "Love": {
              $(`.reaction-icon-${postId}`).html("♥");
              displayElement.attr(`data-${myPostReaction}`, parseInt(data.data.emojiData.Love.length));
              displayElement.html(`${parseInt(data.data.emojiData.Love.length)} ${myPostReaction}s`);
              

              break;
            }
            case "Wow": {
              $(`.reaction-icon-${postId}`).html("😲");
              displayElement.attr(`data-${myPostReaction}`, parseInt(data.data.emojiData.Wow.length));
              displayElement.html(`${parseInt(data.data.emojiData.Wow.length)} ${myPostReaction}s`);
             

              break;
            }
          }
        })
        .fail(function (errData) {
          console.log("error in completing the request");
        });
    });
  }
}
