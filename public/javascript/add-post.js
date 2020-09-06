var myDropzone = new Dropzone(document.getElementById('dropzone-area'), {
  uploadMultiple: false,
  acceptedFiles: '.jpg,.png,.jpeg,.gif',
  parallelUploads: 6,
  url: 'https://api.cloudinary.com/v1_1/famspace/image/upload'
});


myDropzone.on('sending', function (file, xhr, formData) {
  alert("you added a post");
});


myDropzone.on('sending', function (file, xhr, formData) {
  console.log("Adding api key ", 615937344959933);
  formData.append('api_key', 615937344959933);
  formData.append('timestamp', Date.now() / 1000 | 0);
  formData.append('upload_preset', 'iftxut2f');
});


myDropzone.on('success', async function (file, response) {
  console.log('response: ', response);
  let cloudinaryURL = "https://res.cloudinary.com/famspace/image/upload/v" + response.version + "/" + response.public_id + ".jpg"
  console.log("cloudinaryURL: ", cloudinaryURL);
  if (cloudinaryURL) {
    const response = await fetch('/api/upload/newPost', {
      method: 'POST',
         body: JSON.stringify({
           cloudinaryURL
         }),
         headers: {
           'Content-Type': 'application/json'
         } 
    });
    console.log('This is the response: ', response)
    if (response.ok) {
      console.log('We should redirect here.')
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }

  console.log('response.version:', response.version)
  console.log('Success! uploading file to Cloudinary. public id - ' + response.public_id);
});



