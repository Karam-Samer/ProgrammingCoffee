ball();
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
    window.location.href = "Registration.html";
    return;
} else {
    InsideHtmlNavEditor();
}

const languages = {
    JavaScript: { color: "f7df1e", logo: "javascript" },
    Python: { color: "3776ab", logo: "python" },
    "C++": { color: "00599C", logo: "cplusplus" },
    Java: { color: "ED8B00", logo: "java" },
    HTML5: { color: "E34F26", logo: "html5" },
    CSS3: { color: "1572B6", logo: "css3" },
    React: { color: "61DAFB", logo: "react" },
    "Node.js": { color: "339933", logo: "nodedotjs" }
};

const skillsInput = document.getElementById("skills");

const languagesContainer = document.querySelector("#languagesContainer");

languagesContainer.innerHTML = `<label class="form-label d-block">Choose Languages</label>`;

Object.keys(languages).forEach(lang => {
    languagesContainer.innerHTML += `
        <input type="checkbox" id="chk-${lang}" value="${lang}" class="d-none">
        <label for="chk-${lang}" class="checkboxes me-2 mb-2 p-2">
            ${lang}
        </label>
    `;
});


// ===== Generate =====
const generateBtn = document.getElementById('generateBtn');
const outputMarkdown = document.getElementById('outputMarkdown');

generateBtn.addEventListener('click', () => {

    const name = document.getElementById('fullName').value.trim();
    const username = document.getElementById('username').value.trim();
    const title = document.getElementById('title').value.trim();
    const about = document.getElementById('about').value.trim();
    const skillsText = document.getElementById('skills').value.trim();
    const selectedLanguages = document.querySelectorAll('#languagesContainer input:checked');
    const email = document.getElementById('email').value.trim();

    let badges = '';

    selectedLanguages.forEach(lang => {
        const langName = lang.value;
        const langInfo = languages[langName];

        badges += `![${langName}](https://img.shields.io/badge/${encodeURIComponent(langName)}-${langInfo.color}?style=for-the-badge&logo=${langInfo.logo}&logoColor=white) `;
    });

    outputMarkdown.value = `# ${name || 'Your Name'}${title ? ` (${title})` : ''}

## About Me
${about || 'Write a short intro about yourself.'}

## 🚀 Languages & Tools
${badges || skillsText || 'Add your skills here'}

## Contact
- GitHub: [${username || 'your-username'}](https://github.com/${username || 'your-username'})
- Email: ${email || 'you@example.com'}
`;
});
