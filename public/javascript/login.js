
async function signupFormHandler(event) {
    console.log('reached');
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    console.log(password);

    if (username && email && password) {

        console.log(username, email, password);

       const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok) {
            console.log('User created.');
            const response = await fetch('/api/users/login',{
                method: 'post',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });
    
            if (response.ok) {
                document.location.replace('/');
              } else {
                alert(response.statusText);
              }
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }

    }
};

document.querySelector('#signup').addEventListener('submit', signupFormHandler);

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(email && password) {
        const response = await fetch('/api/users/login',{
            method: 'post',
            body: JSON.stringify({
                email,
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

document.querySelector('#login').addEventListener('submit', loginFormHandler);