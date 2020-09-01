async function phoneFormHandler(event) {
    event.preventDefault();

    const phone = document.querySelector('#phone-dashboard').value.trim();

    if (phone) {
        const response = await fetch('/api/users', {
            method: 'put',
            body: JSON.stringify({
                phone
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

    const address = document.querySelector('#address-dashboard').value.trim();

    if (firstName && lastName && birthday && username && email && password) {
        const response = await fetch('/api/users', {
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