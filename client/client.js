const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const broTweetElement = document.querySelector('.bro-tweets')

const API_URL = 'http://localhost:5000/brotweets';

loadingElement.style.display = '';

listAllBroTweets();

form.addEventListener('submit',(event)=>{
    event.preventDefault();

    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');

    const broTweet = {
        name,
        content
    }

    form.style.display = 'none';
    loadingElement.style.display = '';

    fetch(API_URL,{
        method:'POST',
        body: JSON.stringify(broTweet),
        headers:{
            'content-type':'application/json'
        }
    }).then(response => response.json()).then(createdBroTweets=>{
        console.log('data on client',createdBroTweets)
        form.reset();
        form.style.display = '';
        loadingElement.style.display = 'none';
    })
});


function listAllBroTweets(){
    fetch(API_URL,{
        method:'get', //you dont need to specify this but its ok
    })
    .then(response=>response.json())
    .then(broTweets => {

        broTweets.reverse();
        broTweets.forEach(broTweet =>{
            const div = document.createElement('div');
            
            const header = document.createElement('h3');
            header.textContent = broTweet.name;

            const contents = document.createElement('p');
            contents.textContent = broTweet.content;

            const date = document.createElement('small');
            date.textContent = new Date(broTweet.createdAt);


            div.appendChild(header)
            div.appendChild(contents)
            div.appendChild(date)

            broTweetElement.appendChild(div);
        })
        loadingElement.style.display = 'none';
    });
}