async function signupFormHandler(event) {
    event.preventDefault();

    let first_name = document.querySelector('#first-name-signup').value.trim();
    let last_name = document.querySelector('#last-name-signup').value.trim();
    let birthmonth = document.querySelector('#birth-month-signup').value.trim();
    let birthday = document.querySelector('#birth-day-signup').value.trim();
    let birthyear = document.querySelector('#birth-year-signup').value.trim();
    let email = document.querySelector('#email-signup').value.trim();
    let username = document.querySelector('#username-signup').value.trim();
    let user_password = document.querySelector('#password-signup').value.trim();

    if (first_name && last_name && birthmonth && birthday && birthyear && email && username && user_password) {

        let birthdate = birthyear + '.' + birthmonth + '.' + birthday;
        //console.log("in if statement")
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                first_name,
                last_name,
                birthdate,
                email,
                username,
                user_password
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