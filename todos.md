## TODOS :-

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

  <% if(locals.user){ %>
            <% for(u of all_users){%>
    <% for(currentUser of locals.user.friendList){%>
    <% if (locals.user.id != u.id) {%> 
    <p>

        <% if (currentUser.userid != u.id) {%> 
            <a href="/users/profile/<%= u.id %>"><%= u.name %></a>
            &nbsp;
        <a href="/users/profile/friends/send-request/<%= u.id %>">Add Friend</a>

        <% } else if( currentUser.userid == u.id && currentUser.status == "Send"){ %>
            <a href="/users/profile/<%= u.id %>"><%= u.name %></a>
            &nbsp;  <h5>Friend Request Sent</h5>
    
            <% } else if( currentUser.userid == u.id && currentUser.status == "Receive"){ %>
                <a href="/users/profile/<%= u.id %>"><%= u.name %></a>
                &nbsp;
                <a href="/users/profile/friends/accept-request/<%= u.id %>"> Accept Request </a>
        
                <% } else if( currentUser.status == "Friends"){ %>
                    <a href="/users/profile/<%= u.id %>"><%= u.name %></a>
                    &nbsp;
                    <p>FRIENDS </p>
            
             <% } %>
    </p>
    <% } %>
    <% } %>
<% } %>