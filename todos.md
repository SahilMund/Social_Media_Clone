## TODOS :-

linux :- qwerty123, sahil032
(Inspired from Facebook, You can use some code from Codeial too!)
Required features :- 

1. Implementing Friendship   ---  DONE
    a. Sending and accepting friend requests

2. Chatting   --DONE
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

```
 let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            model: 'Comment',
            populate: {
                path: 'user',
                model:'User'
            },
            populate: {
                path: 'likes',
                model:'Like' // for comment likes
            },
            
         options:{
            sort:{
                'createdAt':-1
            }},
         
            populate: {
                path: 'user',
                model:'User' // for comment user
            }
        }).populate('likes').deepPopulate('comments.user comments.likes');
```