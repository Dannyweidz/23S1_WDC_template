let logincounter = 0;

function login(){

    let login_info = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    };

    let XHTTP = new XMLHttpRequest();

    XHTTP.open('POST', '/login');
    XHTTP.setRequestHeader('Content-Type', 'application/json');
    XHTTP.send(JSON.stringify(login_info));

    XHTTP.onload = function() {
        if (XHTTP.status === 200 && XHTTP.readyState === 4){
            window.location.href = '/homepage';
        } else if (XHTTP.status === 401 && logincounter === 0){
            var passfield = document.getElementById('password');
            var division = document.createElement('DIV');
            division.setAttribute('class', 'incorrect-pass');
            division.textContent = "INCORRECT USERNAME OR PASSWORD";
            division.style.color = 'red';
            var docbreak = document.createElement('br');
            passfield.insertAdjacentElement('afterend', division);
            division.insertAdjacentElement('afterend', docbreak);
            logincounter++;
        } else {

        }
    }

};

function login_with_google(response){

    let XHTTP = new XMLHttpRequest();

    XHTTP.onreadystatechange = function(){
        if (XHTTP.status === 200 && XHTTP.readyState === 4){
            window.location.href = '/homepage';
        }
    }

    XHTTP.open('POST', '/login');
    XHTTP.setRequestHeader('Content-Type', 'application/json');
    XHTTP.send(JSON.stringify(response));
}