function Validate() {
    var password = document.getElementById("reg-password").value;
    var confirmPassword = document.getElementById("txtConfirmPassword").value;
    if (password != confirmPassword) {
        alert("Passwords do not match.");
        return false;
    } else {
        const userData = {
            email: document.getElementById("reg-email").value,
            password: document.getElementById("reg-password").value
        }
        fetch('http://localhost:5000/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message);
            sessionStorage.setItem('token', data.userDetails.token);
            sessionStorage.setItem('email', data.userDetails.email);
            window.location.href = "verify.html";
        })
    }
}

function verifyOtp() {
    const otp = document.getElementById("otp").value;
    const data = {
        otp: otp,
        email: sessionStorage.getItem('email')
    }
    fetch(`http://localhost:5000/signup/${sessionStorage.getItem('token')}`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        sessionStorage.setItem('verified', data.verified);
        if(data.verified) {
            window.location.href = "login.html";
        }
    })
}

function loginUser() {
    const user = {
        email: document.getElementById("email").value,
        password: document.getElementById("pass").value
    }
    fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(data => {
        if(data.verified) {
            alert(data.message);
            window.location.href = "main.html";
        } else{
            alert(data.message)
        }});
}

function Logout(){
    sessionStorage.clear();
    window.location.href = "index_signup.html";
}

