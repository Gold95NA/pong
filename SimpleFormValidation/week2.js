// JavaScript Document

function validateForm() 
{
    let firstName = document.getElementById("first-name").value;
    let lastName = document.getElementById("last-name").value;
    let email = document.getElementById("email").value;
    let confirmEmail = document.getElementById("confirm-email").value;
    let phone = document.getElementById("phone").value;

    let nameRegex = /^[a-zA-Z]+([ -]?[a-zA-Z]+)*$/;
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    let phoneRegex = /^[0-9]{10}$/;
    let isValid = true;

    if (!firstName) 
    {
        displayError("first-name", "fn-error", "fn-label", "Please input a name.");
        isValid = false;
    } 
    else if (!nameRegex.test(firstName)) 
    {
        displayError("first-name", "fn-error", "fn-label", "Your name must not include special characters.");
        isValid = false;
    } 
    else 
    {
        clearError("first-name", "fn-error", "fn-label");
    }

    if (!lastName) 
    {
        displayError("last-name", "ln-error", "ln-label", "Please input a name.");
        isValid = false;
    } 
    else if (!nameRegex.test(lastName)) 
    {
        displayError("last-name", "ln-error", "ln-label", "Your name must not include special characters.");
        isValid = false;
    } 
    else 
    {
        clearError("last-name", "ln-error", "ln-label");
    }

    if (!email) 
    {
        displayError("email", "email-error", "email-label", "Please input an email address.");
        isValid = false;
    } 
    else if (!emailRegex.test(email)) 
    {
        displayError("email", "email-error", "email-label", "Please enter a valid email address.");
        isValid = false;
    } else 
    {
        clearError("email", "email-error", "email-label");
    }

    if (email !== confirmEmail) 
    {
        displayError("confirm-email", "confirm-email-error", "confirm-email-label", "Email addresses do not match.");
        isValid = false;
    } 
    else 
    {
        clearError("confirm-email", "confirm-email-error", "confirm-email-label");
    }

    if (!phone) 
    {
        displayError("phone", "phone-error", "phone-label", "Please input a phone number.");
        isValid = false;
    } 
    else if (!phoneRegex.test(phone)) 
    {
        displayError("phone", "phone-error", "phone-label", "Phone number must be in the format xxxxxxxxxx.");
        isValid = false;
    } 
    else 
    {
        clearError("phone", "phone-error", "phone-label");
    }

    if (isValid) 
    {
        document.getElementById("form").style.display = "none";
        document.getElementById("confirmation").style.display = "block";

        let person = 
        {
            fname: firstName,
            lname: lastName,
            email: email,
            phone: phone.substring(0, 3) + '-' + phone.substring(3, 6) + '-' + phone.substring(6)
        };

        document.getElementById("info").innerHTML = 
            `First Name: ${person.fname}<br>Last Name: ${person.lname}<br>Email: ${person.email}<br>Phone: ${person.phone}`;
    }
}

function displayError(inputId, errorId, labelId, message) 
{
    document.getElementById(labelId).style.color = "red";
    document.getElementById(errorId).innerHTML = "* " + message;
}

function clearError(inputId, errorId, labelId) 
{
    document.getElementById(labelId).style.color = "black";
    document.getElementById(errorId).innerHTML = "";
}