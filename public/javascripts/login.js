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
        if (XHTTP.status === 200){
            window.location.href = '/homepage.html';
        } else {
            console.log("authentication failed");
            //SHOW FAILED LOGIN MESSAGE
        }
    }

};