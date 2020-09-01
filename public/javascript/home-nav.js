function navigateToAddPost(){
  event.preventDefault();
  //console.log("We've been clicked!")
  document.location.replace('/add-post/');
}

function navigateToFam(){
  event.preventDefault();
  //console.log("We've been clicked!")
  document.location.replace('/fam-up/');
}

function navigateToEvents(){
  event.preventDefault();
  //console.log("We've been clicked!")
  document.location.replace('/events/');
}

document.querySelector('#add-post-nav').addEventListener('click', navigateToAddPost);

document.querySelector('#fam-nav').addEventListener('click', navigateToFam);

document.querySelector('#events-nav').addEventListener('click', navigateToEvents);