let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
    window.location.href = "Registration.html";
} else {
    InsideHtmlNavEditor();
}


document.getElementById("firstName").value = currentUser.firstName;
document.getElementById("lastName").value = currentUser.lastName;
document.getElementById("email").value = currentUser.email;
document.getElementById("age").value = currentUser.age;
document.getElementById("phone").value = currentUser.phone;
document.getElementById("password").value = currentUser.password;
document.getElementById("welcomeMsg").textContent = `Welcome, ${currentUser.firstName}!`;
document.getElementById("profileImage").src = currentUser.image ? currentUser.image : "../images/default-profile.png";
let myForm = document.getElementById("ProfileForm"),
    myBtn = myForm.querySelector("button"),
    inputs = myForm.querySelectorAll("input");

if (myForm.dataset.type === "show") {
    setFormShow(myForm);
}
else {
    setFormEdit(myForm);
}

document.getElementById("ProfileForm").addEventListener("submit", function (e) {
    e.preventDefault();

    if (myForm.dataset.type === "show") {
        setFormEdit(myForm);
        return;
    }

    let updatedUser = {
        firstName: this.firstName.value.trim(),
        lastName: this.lastName.value.trim(),
        email: currentUser.email,
        age: this.age.value.trim(),
        phone: this.phone.value.trim(),
        password: this.password.value.trim(),
        image: currentUser.image

    };

    let file = this.image.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function (e) {
            updatedUser.image = e.target.result;
            saveUser(updatedUser);
        };
        reader.readAsDataURL(file);
    } else {
        saveUser(updatedUser);
    }
    setFormShow(myForm);
});

document.querySelectorAll("#ProfileForm input").forEach(input => {
    input.addEventListener("blur", function () {
        checkInput(input);
    });
});