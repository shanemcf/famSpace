async function commentFormHandler(event) {
  event.preventDefault();

  const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

  let post_id = document.getElementsByTagName("custom")[0].getAttribute("postId");
  
  console.log('post-id: ', post_id)

  // if (comment_text) {
  //   const response = await fetch('/api/comments', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       post_id,
  //       comment_text
  //     }),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   });
  
  //   if (response.ok) {
  //     document.location.reload();
  //   } else {
  //     alert(response.statusText);
  //   }
  // }
  
}

document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);