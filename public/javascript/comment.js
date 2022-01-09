// This function takes the value of the single-post templates textarea field and submits it in a fetch request
async function commentSubmitHandler(event) {
   event.preventDefault();

const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();
const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length -1
];

if(comment_text) {
    const response = await fetch('/api/comments', {
        method: 'post',
        body: JSON.stringify({
            post_id,
            comment_text
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

        if(response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
}

};
document.querySelector('#comment-submit').addEventListener('click', commentSubmitHandler);