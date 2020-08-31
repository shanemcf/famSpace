async function signupFormHandler(event) {
    event.preventDefault();

    let first = document.querySelector('#first-name-signup').value.trim();
    let last = document.querySelector('#last-name-signup').value.trim();
    let birthmonth = document.querySelector('#birth-month-signup').value.trim();
    let birthday = document.querySelector('#birth-day-signup').value.trim();
    let birthyear = document.querySelector('#birth-year-signup').value.trim();
    let email = document.querySelector('#email-signup').value.trim();
    let username = document.querySelector('#username-signup').value.trim();
    let password = document.querySelector('#password-signup').value.trim();

    if (first && last && birthmonth && birthday && birthyear && email && username && password) {

        let birthdate = birthyear + '.' + birthmonth + '.' + birthday;
        //console.log("in if statement")
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                first,
                last,
                birthdate,
                email,
                username,
                password
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

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);