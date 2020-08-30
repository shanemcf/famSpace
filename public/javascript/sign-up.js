async function signupFormHandler(event) {
    event.preventDefault();

    const first = document.querySelector('#first-name-signup').value.trim();
    const last = document.querySelector('#last-name-signup').value.trim();
    const birthday = document.querySelector('#birthday-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (first && last && birthday  && email && username && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                first,
                last,
                birthday,
                email,
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            document.location.replace('/fam-up/');
        } else {
            alert(response.statusText);
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);