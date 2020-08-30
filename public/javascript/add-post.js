async function newPostHandler(event) {
  event.preventDefault();

  const caption = document.querySelector('textarea[name="caption"]').value;
  const imageURL = document.querySelector('textarea[name="image"]').value;

  const response = await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      caption,
      imageURL
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.ok) {
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
}

document.querySelector('.new-post-form').addEventListener('submit', newPostHandler);