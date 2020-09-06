async function newFormHandler(event) {
  event.preventDefault();

  const caption = document.querySelector('textarea[name="caption"]').value;
  const imageURL = 'www.url.com'

  console.log('Here are the caption and img_path: ', caption, imageURL)
  
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

document.querySelector('#add-post').addEventListener('click', newFormHandler);