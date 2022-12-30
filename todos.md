## TODOS :-

linux :- qwerty123, sahil032
(Inspired from Facebook, You can use some code from Codeial too!)
Required features :- 

1. Implementing Friendship   ---  DONE
    a. Sending and accepting friend requests

2. Chatting
    a. Chatting between friends
    b. Storing messages in database.


3. Pages for Celebrities/Organizations

4. Posts              --- DONE
    a. Images
    b. Videos (Optional)

5. User wall            ---DONE
    a. Recent posts by user

6. Adding more social authentication strategy (Github)    --DONE

7. Reactions to Posts and Comments (such as Love, Haha, Wow, Sad, Angry)

-----------------------------------------------------------------

----------------------
   <!-- 
   else { %>

            <div class="emoji-drawer hidden">
                <a class="toggle-like-button" data-likes="<%= post.likes.length %>" href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Like"> 👍   </a>
                <a class="toggle-like-button" data-likes="<%= post.likes.length %>" href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Love"> ❤ </a>
                <a class="toggle-like-button" data-likes="<%= post.likes.length %>" href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Sad"> 😞</a>
                <a class="toggle-like-button" data-likes="<%= post.likes.length %>" href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Angry">😡</a>
                <a class="toggle-like-button" data-likes="<%= post.likes.length %>" href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Wow">😲</a>
              </div> --> 
            <!-- <% } %> --> 
<!-- 
            <div class="emoji-drawer">
                <a class="toggle-like-button" data-likes="<%= post.likes.length %>" href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Like"> 👍   </a>
                <a class="toggle-like-button" data-likes="<%= post.likes.length %>" href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Love"> ❤ </a>
                <a class="toggle-like-button" data-likes="<%= post.likes.length %>" href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Sad"> 😞</a>
                <a class="toggle-like-button" data-likes="<%= post.likes.length %>" href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Angry">😡</a>
                <a class="toggle-like-button" data-likes="<%= post.likes.length %>" href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Wow">😲</a>
              </div> -->

              <!-- <div>

                <a class="reaction-count-<%=post._id%>" data-likes="<%= post.likes.length %>" data-reactions="" disabled></a>
                <a class="toggle-like-button"  href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Like"> 👍   </a>
                <a class="toggle-like-button"  href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Love"> ❤ </a>
                <a class="toggle-like-button"  href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Sad"> 😞</a>
                <a class="toggle-like-button"  href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Angry">😡</a>
                <a class="toggle-like-button"  href="/likes/toggle/?id=<%=post._id%>&type=Post&reaction=Wow">😲</a>
              </div> -->

      <!-- END emoji part -->