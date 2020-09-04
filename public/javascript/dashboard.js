async function phoneFormHandler(event) {
    event.preventDefault();

    const telephone = document.querySelector('#phone-dashboard').value.trim();
    const id = session.user_id;

    if (telephone) {
        const response = await fetch(`/api/contact/${id}`, {
            method: 'put',
            body: JSON.stringify({
                telephone
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {

        } else {
            alert(response.statusText);
        }
    }
}

async function emailFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-dashboard').value.trim();

    if (email) {
        const response = await fetch('/api/users', {
            method: 'put',
            body: JSON.stringify({
                email,
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {

        } else {
            alert(response.statusText);
        }
    }
}

async function addressFormHandler(event) {
    event.preventDefault();

    const addressStreet = document.querySelector('#address-dashboard-street').value.trim();
    const addressStreetSub = document.querySelector('#address-dashboard-street').value.trim();
    const addressCity = document.querySelector('#address-dashboard-street').value.trim();
    const addressState = document.querySelector('#address-dashboard-street').value.trim();
    const addressZip = document.querySelector('#address-dashboard-street').value.trim();
    const id = session.user_id;
    let address = "";

    if(addressStreetSub){
        address = addressStreet + '|' + addressStreetSub + '|' + addressCity +'|' + addressState + '|' + addressZip;
    }
    else{
        address = addressStreet + '|NA|' + addressCity +'|' + addressState + '|' + addressZip;
    }  

    if (address) {
        const response = await fetch(`/api/contact/${id}`, {
            method: 'put',
            body: JSON.stringify({
                address
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {

        } else {
            alert(response.statusText);
        }
    }
}

 document.querySelector('#update-phone-number').addEventListener('submit', phoneFormHandler);
 document.querySelector('#update-email').addEventListener('submit', emailFormHandler);
 document.querySelector('#update-address').addEventListener('submit', addressFormHandler);