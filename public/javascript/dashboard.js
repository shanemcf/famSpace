async function phoneFormHandler(event) {
    event.preventDefault();

    const telephone = document.querySelector('#phone-number-dashboard').value.trim();

    if (telephone) {
        const response = await fetch(`/api/contacts/`, {
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


/*
async function emailFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-dashboard').value.trim();

    if (email) {
        const response = await fetch('/api/users/', {
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
*/


async function addressFormHandler(event) {
    event.preventDefault();

    const addressStreet = document.querySelector('#address-dashboard-street').value.trim();
    const addressStreetSub = document.querySelector('#address-dashboard-street-sub').value.trim();
    const addressCity = document.querySelector('#address-dashboard-city').value.trim();
    const addressState = document.querySelector('#address-dashboard-state').value.trim();
    const addressZip = document.querySelector('#address-dashboard-zip').value.trim();
    let address = "";

    if (addressStreetSub) {
        address = addressStreet + '|' + addressStreetSub + '|' + addressCity + '|' + addressState + '|' + addressZip;
    }
    else {
        address = addressStreet + '|NA|' + addressCity + '|' + addressState + '|' + addressZip;
    }

    if (address) {
        const response = await fetch(`/api/contacts/`, {
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

document.querySelector('#update-phone-number').addEventListener('click', phoneFormHandler);
//  document.querySelector('#update-email').addEventListener('click', emailFormHandler);
document.querySelector('#update-address').addEventListener('click', addressFormHandler);