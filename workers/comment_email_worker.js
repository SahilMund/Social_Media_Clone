const queue = require('../config/kue');

const commentsMailer = require('../mailers/comments_mailer');


//whenever a new task is added to the queue, process fucntion will tell the worker to run the code inside it[process]
queue.process('emails', function(job, done){
    console.log('emails worker is processing a job ', job.data);

    //operations to be perfromed
    commentsMailer.newComment(job.data);

    //on success completion of the process
    done();
});