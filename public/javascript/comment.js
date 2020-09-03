async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

  // const post_id = document.getElementById("post-id").innerHTML;
  const post_id = $(this).attr("data-id");
  console.log('this is post_id: ', post_id)

  if (comment_text) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
  
}

document.querySelector('.cmt-btn').addEventListener('click', commentFormHandler);