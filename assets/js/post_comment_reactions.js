
class HandleReaction {
  constructor(toggleElement) {
    this.toggler = toggleElement;
    this.handleReactions();
  }

  handleReactions() {
    $(this.toggler).click(function (e) {
      e.preventDefault();
      let self = this;

      $.ajax({
        type: "POST",
        url: $(self).attr("href"),
      })
        .done(function (data) {
         

        // Getting ID on which the user has reacted , it can be post/comment
        let postId = data.data.emojiData.post_id;

        // Getting the reaction on which user has clicked 
        let myPostReaction = data.data.reaction;
        let displayElement = $(`.reaction-count-${postId}`);

        // console.log(data.data.likeType);
        // checking the type 
        let postType = data.data.likeType === "Comment" ? 'comment' : 'post'

        // displayElement.attr("data-reactions", myPostReaction);
        // Dispalying count of all the reactions
        $(`.${postType}-reaction-Like-${postId}`).html(parseInt(data.data.emojiData.Like.length));
        $(`.${postType}-reaction-Sad-${postId}`).html(parseInt(data.data.emojiData.Sad.length));
        $(`.${postType}-reaction-Angry-${postId}`).html(parseInt(data.data.emojiData.Angry.length));
        $(`.${postType}-reaction-Love-${postId}`).html(parseInt(data.data.emojiData.Love.length));
        $(`.${postType}-reaction-Wow-${postId}`).html(parseInt(data.data.emojiData.Wow.length));
        
        // Setting data attribute values and dispalying the icon on which the loggedin user has clicked
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
