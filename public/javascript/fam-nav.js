function navigateToFam(){
  event.preventDefault();
  console.log("We've been clicked!")
  document.location.replace('/fam-up/');
}


document.querySelector('#fam-nav').addEventListener('click', navigateToFam);