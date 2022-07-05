//focus on first form
let cursorFocus = () => {
    let pointFocus = document.register.username.focus();
    return true;
};

//Check if firstname entered is 2 to 14 characters
let validateuserName = (min, max, inputField, helpText) => {

    let nameAplhabets = /^[A-Za-z]+$/;
    if (!inputField.value.match(nameAplhabets) || inputField.value.length < min | inputField.value.length > max) {
        //Show error message if it doesn't match
        helpText.innerHTML = 'Must be 3-14 characters';
        helpText.style.color = '#fc0f14';
        helpText.style.fontSize = '12px';
        inputField.focus();

        return false;

    }
    else {
        //Clear error message;
        helpText.innerHTML = '';

        return true;

    };

}


//validate branch

//validate email
let valEmail = (inputField, erroremail) => {
    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!inputField.value.match(emailFormat)) {
        //Show error message if it doesn't match
        erroremail.innerHTML = 'Enter valid email format';
        erroremail.style.color = '#fc0f14';
        erroremail.style.fontSize = '12px';
        inputField.focus();

        return false;

    }
    else {
        //Clear error message;
        erroremail.innerHTML = '';

        return true;

    };
}

//validate password
let valPassword = (min, max, passwordInput, errorpassword) => {
    let passwordLength = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (!passwordInput.value.match(passwordLength) || passwordInput.value.length < min || passwordInput.value.length > max) {
        errorpassword.innerHTML = 'Enter strong password 6-16 characters';
        errorpassword.style.color = 'red';
        errorpassword.style.fontSize = '12px';
        passwordInput.focus();

        return false;
    } else {
        errorpassword.innerHTML = '';

        return true;
    }

}

//Comfirm password
let comfirmPassword = (confirmField, errorpass) => {
    let password = document.querySelector('#password')
    if (password.value === confirmField.value) {
        errorpass.innerHTML = '';
        return true;

    } else {
        errorpass.innerHTML = 'Passwords do not match';
        errorpass.style.color = 'red';
        errorpass.style.fontSize = '12px';

        return false;
    }
}
   


