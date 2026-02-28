function ball(){
    const ball = document.querySelector(".ball");
    setTimeout(() => {
        ball.style.display = "block";
    }, 1000);
    document.addEventListener("mousemove", function (e) {
        ball.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    });
}

function signin() {
    formBtn = myForm.querySelector("button");
    formH2.textContent = "Sign In";
    formBtn.textContent = "Sign In";
    questionH4.textContent = "Welcome Back!";
    questionP.innerHTML = "Don't have an account?";
    questionBtn.textContent = "Sign Up";
    if (mobileQuestionH4) {
        mobileQuestionH4.textContent = "Don't have an account?";
    }
    if (mobileQuestionBtn) {
        mobileQuestionBtn.textContent = "Sign Up";
    }
    myForm.querySelectorAll(".extra-field").forEach(function (item) {
        item.classList.add("d-none");
        let input = item.querySelector("input");
        input.removeAttribute("required");
    });
}

function signup() {
    formBtn = myForm.querySelector("button");
    formH2.textContent = "Sign Up";
    questionH4.textContent = "Hello, Friend!";
    formBtn.textContent = "Sign Up";
    questionP.innerHTML = "Already have an account?";
    questionBtn.textContent = "Sign In";
    if (mobileQuestionH4) {
        mobileQuestionH4.textContent = "Already have an account?";
    }
    if (mobileQuestionBtn) {
        mobileQuestionBtn.textContent = "Sign In";
    }
    myForm.querySelectorAll(".extra-field").forEach(function (item) {
        item.classList.remove("d-none");
        let input = item.querySelector("input");
        input.setAttribute("required", "true");
    });
}

function validateSignUp(firstName, lastName, email, age, phone, password, confirmPassword) {
    if (!firstName || !lastName || !email || !age || !phone || !password || !confirmPassword) {
        clearErrors();
        if (!firstName) {
            myForm.querySelector("input[name='firstName']").classList.add("is-invalid");
        }
        if (!lastName) {
            myForm.querySelector("input[name='lastName']").classList.add("is-invalid");
        }
        if (!email) {
            myForm.querySelector("input[name='email']").classList.add("is-invalid");
        }
        if (!phone) {
            myForm.querySelector("input[name='phone']").classList.add("is-invalid");
        }
        if (!age) {
            myForm.querySelector("input[name='age']").classList.add("is-invalid");
        }
        if (!password) {
            myForm.querySelector("input[name='password']").classList.add("is-invalid");
        }
        if (!confirmPassword) {
            myForm.querySelector("input[name='confirmPassword']").classList.add("is-invalid");
        }
        return false;
    }
    if (password !== confirmPassword) {
        myForm.querySelector("input[name='confirmPassword']").classList.add("is-invalid");
        return false;
    }
    return true;
}

function validateSignIn(email, password) {
    if (!email || !password) {
        clearErrors();
        if (!email) {
            myForm.querySelector("input[name='email']").classList.add("is-invalid");
        }
        if (!password) {
            myForm.querySelector("input[name='password']").classList.add("is-invalid");
        }
        return false;
    }
    return true;
}

function addUser(user) {
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
}

function clearErrors() {

    myForm.querySelectorAll("input").forEach(function (input) {
        input.classList.remove("is-valid", "is-invalid");
    });
}

function checkInput(input) {
    let inputName = input.name,
        inputValue = input.value,
        regex;

    if (inputName === "firstName" || inputName === "lastName") {
        regex = /^[A-Za-z]{3,}$/;
    }
    else if (inputName === "email") {
        regex = /^[a-zA-Z]+[a-zA-z0-9\.\-_]+@(gmail|yahoo)\.(com|org)$/;
    }
    else if (inputName === "age") {
        regex = /^[0-9]{1,2}$/;
    }
    else if (inputName === "phone") {
        regex = /^(\+02)?01(0|1|2|5)[0-9]{8}$/;
    }
    else {
        regex = /.{6,}/;
    }

    if (inputValue == '') {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }
    else if (!regex.test(inputValue)) {
        input.classList.remove("is-valid");
        input.classList.add("is-invalid");
    }
    else {
        input.classList.remove("is-invalid");
        input.classList.add("is-valid");
    }
}

function indexNavEditor() {
    let navEle = document.querySelector(".navbar-nav"),
        cuurentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (cuurentUser) {
        navEle.querySelectorAll("li").forEach(function (li) {
            let ancorText = li.querySelector("a").textContent.trim();
            if (ancorText === "Sign In" || ancorText === "Sign Up") {
                li.remove();
            }
        });
        let userLi = document.createElement("li");
        userLi.className = "nav-item dropdown rounded-5 me-4";
        userLi.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-user"></i> 
              </a>
              <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="HTML/user.html">Profile</a></li>
                <li><a class="dropdown-item" href="#" id="logoutBtn">Logout</a></li>
              </ul>
        `;
        navEle.appendChild(userLi);
        document.getElementById("logoutBtn").addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("currentUser");
            window.location.href = "HTML/Registration.html";
        });
    }
}

function InsideHtmlNavEditor() {
    let navEle = document.querySelector(".navbar-nav"),
        cuurentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (cuurentUser) {
        navEle.querySelectorAll("li").forEach(function (li) {
            let ancorText = li.querySelector("a").textContent.trim();
            if (ancorText === "Sign In" || ancorText === "Sign Up") {
                li.remove();
            }
        });
        let userLi = document.createElement("li");
        userLi.className = "nav-item dropdown rounded-5 me-4";
        userLi.innerHTML = `
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-user"></i>
                </a>
                <ul class="dropdown-menu">
                <li><a class="dropdown-item" href="user.html">Profile</a></li>
                <li><a class="dropdown-item" href="#" id="logoutBtn">Logout</a></li>
                </ul>
        `;
        navEle.appendChild(userLi);
        document.getElementById("logoutBtn").addEventListener("click", function (e) {
            e.preventDefault();
            localStorage.removeItem("currentUser");
            window.location.href = "Registration.html";
        });
    }
}


function saveUser(updatedUser) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userIndex = users.findIndex(user => user.email === updatedUser.email);

    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(updatedUser));
        alert("Profile updated successfully!");
        location.reload();
    }
    else {
        alert("Error updating profile. User not found.");
    }
}


function setFormEdit(myForm) {
    myForm.dataset.type = "update";
    myBtn.textContent = "Save Changes";
    myBtn.classList.remove("btn-primary");
    myBtn.classList.add("btn-success");
    inputs.forEach(input => {
        input.removeAttribute("readonly");
    });
    document.getElementById("email").setAttribute("readonly", true);
    document.getElementById("ImageDiv").classList.remove("d-none");
    document.getElementById("ProfileImgContainer").classList.add("d-none");
}


function setFormShow(myForm) {
    myForm.dataset.type = "show";
    myBtn.textContent = "Update Profile";
    myBtn.classList.remove("btn-success");
    myBtn.classList.add("btn-primary");
    inputs.forEach(input => {
        input.setAttribute("readonly", true);
    });
    document.getElementById("email").setAttribute("readonly", true);
    document.getElementById("ImageDiv").classList.add("d-none");
    document.getElementById("ProfileImgContainer").classList.remove("d-none");
}
