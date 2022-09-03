const express = require('express');
const cors = require('cors');
const monk = require('monk');
const rateLimit = require('express-rate-limit');


const app = express();

const db = monk('localhost/broTweetsDb');

const broTweets = db.get('broTweets'); //collection inside our database


app.use(cors());

app.use(express.json());


app.get('/',(req,res)=>{
    res.json({
        messsage:"hello",
    })
})

app.get('/brotweets',(req,res)=>{
    broTweets
    .find()
    .then(broTweets =>{
        res.json(broTweets);
    });
});

function isValidBroTweets (broTweets){
    return broTweets.name && broTweets.name.toString().trim() !== '' && 
    broTweets.content && broTweets.content.toString().trim() !== '';
}

app.use(rateLimit({
    windowMs:30*1000,
    max:1
}))

app.post('/brotweets',(req,res)=>{

    if(isValidBroTweets(req.body)){

        const broTweet = {
            name: req.body.name.toString(),
            content: req.body.content.toString(),
            createdAt: new Date(),
        };

        broTweets
        .insert(broTweet)
        .then(createdBroTweet =>{
           res.json(createdBroTweet); 
        });
    }
    else{
        res.status(422);
        res.json({
            message:'hay bro, name and message are required!'
        })
    }
})

app.listen(5000,()=>{
     console.log('server is listing on http://localhost:5000')
});