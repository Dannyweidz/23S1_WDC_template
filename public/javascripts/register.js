    // Function to handle form submission
    function handleFormSubmit(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get the entered values from the form fields
        const name = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Perform your registration logic here (e.g., make an API request, validate inputs)

        // Example registration logic
        if (password === confirmPassword) {
          // Password complexity requirements
          var passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
          if (!passwordRegex.test(password)) {
            alert('Password must be at least 8 characters long and contain at least one capital letter and one number');
            return;
          }

          // Password strength evaluation
          var passwordStrength = evaluatePasswordStrength(password);
          alert('Registration successful! Welcome, ' + name + '!');

          // Redirect to another page or perform any other desired action
        } else {
          // Passwords do not match
          alert('Passwords do not match. Please try again.');
        }
      }

      // Add event listener to the form
      const registerForm = document.querySelector('#registration-form');
      registerForm.addEventListener('submit', handleFormSubmit);

      // Evaluate password strength on input change
      const passwordInput = document.getElementById('password');
      passwordInput.addEventListener('input', function() {
        const password = passwordInput.value;
        const passwordStrengthElement = document.getElementById('password-strength');
        const passwordStrength = evaluatePasswordStrength(password);
        passwordStrengthElement.textContent = 'Password strength: ' + passwordStrength;
      });

      // Evaluate password strength
      function evaluatePasswordStrength(password) {
        if (password.length < 8) {
          return 'Weak';
        }

        if (/[A-Z]/.test(password) && /\d/.test(password)) {
          return 'Strong';
        }

        return 'Moderate';
      }

let counter = 0;

function register() {

    let registration_info = {
        username:document.getElementById('username').value,
        email:document.getElementById('email').value,
        password:document.getElementById('password').value
    };

    if (document.getElementById('confirm-password').value !== document.getElementById('password').value && counter === 0){
        console.log(document.getElementById('confirm-password').value);
        console.log(registration_info[password]);
        let pass = document.getElementById('confirm-password');
        let mess = document.createElement('DIV')
        mess.setAttribute('class', 'non-matching-pass');
        mess.textContent = "PASSWORDS DO NOT MATCH";
        mess.style.color = 'red';
        var docbreak = document.createElement('br');
        pass.insertAdjacentElement('afterend', docbreak);
        pass.insertAdjacentElement('afterend', mess);
        pass.insertAdjacentElement('afterend', docbreak);
        counter++;
        return;
    } else if (document.getElementById('confirm-password').value !== document.getElementById('password').value){
        return;
    }

    let XHTTP = new XMLHttpRequest();

    XHTTP.onreadystatechange = function() {
        if (XHTTP.readyState === 4 && XHTTP.status === 200){
            window.location.href = '/homepage';
        }
    };

    XHTTP.open('POST', '/registered', true);
    XHTTP.setRequestHeader('Content-Type', 'application/json');
    XHTTP.send(JSON.stringify(registration_info));
}