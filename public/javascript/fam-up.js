//const sequelize = require("../../config/connection");

let displayKeyEl = document.querySelector('#generated-key');

//let { famKey } = require ('./famKey');

const adj = ['adaptable', 'adventurous', 'affectionate', 'ambitious', 'amiable',
  'compassionate', 'considerate', 'courageous', 'courteous', 'diligent',
  'empathetic', 'exuberant', 'frank', 'generous', 'gregarious',
  'impartial', 'intuitive', 'inventive', 'passionate', 'persistent',
  'philosophical', 'practical', 'rational', 'reliable', 'resoureful',
  'sensible', 'sincere', 'sympathetic', 'unassuming', 'witty'];

function randInt(){

  let randNum = (Math.floor(Math.random() * 100)).toString();

  if (randNum.length < 2) { randNum = '0' + randNum }

  return randNum;

}

function randAdj(){

  let x = Math.floor(Math.random() * 30);

  return adj[x];

}

function famKey(surname) {

  if(surname.slice(-1) != 's'){
    surname += 's'
  }

  let uId = randAdj() + surname + randInt();

  return uId;

}

async function joinFamFormHandler(event) {
    event.preventDefault();

    const famId = document.querySelector('#fam-key').value.trim();

    if (famId) {
        const response = await fetch('/api/fams/join', {
            method: 'post',
            body: JSON.stringify({
                famId
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}

function famKeyPPopulator(event){
    event.preventDefault();

    let familyName = document.querySelector('#fam-name').value.trim();

    if (familyName){
        displayKeyEl.textContent = famKey(familyName);
    }

}

async function createFamFormHandler(event) {
    event.preventDefault();
    console.log('Arrived at createFamFormHandler')
    const generatedFamKey = document.querySelector('#generated-key').textContent;
    console.log('This is the generatedFamKey: ', generatedFamKey)
    if (generatedFamKey) {
        const famResponse = await fetch('/api/fams', {
            method: 'post',
            body: JSON.stringify({
                generatedFamKey
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('fam_id: ', fam_id)


        /*const userResponse = await fetch(`api/users/${session.user_id}`, {
            method: 'put',
            body:JSON.stringify({

                
            })
        })*/


        console.log('This is the response: ', famResponse)
        if (famResponse.ok) {
            console.log('We should redirect here.')
            document.location.replace('/');
        } else {
            alert(fam-response.statusText);
        }
    }
}

function navigateToFam(){
    document.location.replace('/fam-up/');
}

document.querySelector('#join-fam').addEventListener('click', joinFamFormHandler);

document.querySelector('#generate-key').addEventListener('click', famKeyPPopulator)

document.querySelector('#create-fam').addEventListener('click', createFamFormHandler);

