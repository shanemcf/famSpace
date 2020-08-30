const {famKey} = require('./famKey.js');

const displayKeyEl = document.querySelector('#generated-key');

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
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
}

function famKeyPPopulator(event){
    event.preventDefault();

    let familyName = document.querySelector('#fam-name').value.trim();
    
    displayKeyEl = famKey(familyName)

}

async function createFamFormHandler(event) {
    event.preventDefault();

    const generatedFamKey = document.querySelector('#generated-key').value;

    if (generatedFamKey) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                generatedFamKey
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/dashboard/');
        } else {
            alert(response.statusText);
        }
    }
}


document.querySelector('.is-fam-form').addEventListener('submit', joinFamFormHandler);

document.getElementById('.generate-key').addEventListener('click', famKeyPPopulator)

document.querySelector('.new-fam-form').addEventListener('submit', createFamFormHandler);