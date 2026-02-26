let myForm = document.querySelector("#Registration form"),
    formH2 = document.querySelector(".Register h2"),
    formBtn,
    question = document.querySelector("#Registration .question"),
    questionH4 = question.querySelector("h4"),
    questionP = question.querySelector("p"),
    questionBtn = question.querySelector("button"),
    mobileQuestionForm = document.querySelector("#Registration .questionForm"),
    mobileQuestionH4 = mobileQuestionForm.querySelector("h4"),
    mobileQuestionBtn = mobileQuestionForm.querySelector("button"),
    users = JSON.parse(localStorage.getItem("users")) || [],
    box = document.querySelector(".box"),
    formCol = document.querySelector(".formCol"),
    questionCol = document.querySelector(".questionCol");

let modeFromUrl = new URLSearchParams(window.location.search).get("mode");
if (modeFromUrl === "signIn" || modeFromUrl === "signUp") {
    myForm.dataset.type = modeFromUrl;
    questionCol.classList.remove("rounded-start-5", "rounded-end-5");
    myForm.dataset.type === "signIn" ? questionCol.classList.add("rounded-start-5") : questionCol.classList.add("rounded-end-5");

}

InsideHtmlNavEditor();
box.classList.remove("signIn", "signUp");
box.classList.add(myForm.dataset.type);

if (myForm.dataset.type === "signIn") {
    signin();
} else {
    signup();
}

if (localStorage.getItem("currentUser")) {
    window.location.href = "../index.html";
}


myForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = this.email.value.trim(),
        password = this.password.value.trim();

    if (myForm.dataset.type === "signUp") {
        let firstName = this.firstName.value.trim(),
            lastName = this.lastName.value.trim(),
            age = this.age.value.trim(),
            phone = this.phone.value.trim(),
            password = this.password.value.trim(),
            confirmPassword = this.confirmPassword.value.trim();
        if (validateSignUp(firstName, lastName, email, age, phone, password, confirmPassword)) {
            let existingUser = users.find(user => user.email === email || user.phone === phone);
            if (existingUser) {
                alert("Email or Phone already exists. Please use a different email or phone.");
                return;
            }
            let user = {
                firstName: firstName,
                lastName: lastName,
                age: age,
                email: email,
                phone: phone,
                password: password
            };
            addUser(user);
            localStorage.setItem("currentUser", JSON.stringify(user));

            alert("Registration successful!");
            this.reset();
            window.location.href = "../index.html";
        }
    }
    else if (myForm.dataset.type === "signIn") {
        if (validateSignIn(email, password)) {
            let foundUser = users.find(user => user.email === email && user.password === password);
            if (!foundUser) {
                alert("Invalid email or password.");
                return;
            }
            localStorage.setItem("currentUser", JSON.stringify(foundUser));
            alert("Sign In successful!");
            this.reset();
            window.location.href = "../index.html";
        }
    }
});

questionBtn.addEventListener("click", function () {

    formCol.removeAttribute("style");

    box.classList.add("expand");
    questionCol.children[0].classList.add("d-none");
    setTimeout(() => {
        myForm.dataset.type = myForm.dataset.type === "signIn" ? "signUp" : "signIn";

        box.classList.remove("signIn", "signUp");
        box.classList.add(myForm.dataset.type);

        questionCol.classList.remove("rounded-start-5", "rounded-end-5");
        myForm.dataset.type === "signIn" ? questionCol.classList.add("rounded-start-5") : questionCol.classList.add("rounded-end-5");
        myForm.dataset.type === "signIn" ? signin() : signup();

        setTimeout(() => {
            box.classList.remove("expand");
            questionCol.children[0].classList.remove("d-none");
        }, 300);
    }, 500);


    clearErrors();
});

mobileQuestionBtn.addEventListener("click", function () {
    myForm.dataset.type = myForm.dataset.type === "signIn" ? "signUp" : "signIn";
    box.classList.remove("signIn", "signUp");
    formCol.setAttribute("style", "transform: translateX(0); ");
    box.classList.add(myForm.dataset.type);

    myForm.dataset.type === "signIn" ? signin() : signup();
    clearErrors();
});

myForm.querySelectorAll("input").forEach(input => {
    input.addEventListener("blur", function () {
        checkInput(input);
    });
});

