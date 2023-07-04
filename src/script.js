const passwordLength = document.getElementById("password-length");
const symbols = document.getElementById("symbols");
const numbers = document.getElementById("numbers");
const lowercaseCharacters = document.getElementById("lowercase");
const uppercaseCharacters = document.getElementById("uppercase");
const generatePasswordButton = document.getElementById("generate-password");
const generatedPasswordField = document.getElementById("generated-password-field");
const copyButton = document.getElementById("copy-button");

const symbolPool = "!@#$%^&*()";
const numberPool = "0123456789";
const lowercaseCharacterPool = "abcdefghijklmnopqrstuvwxyz";
const uppercaseCharacterPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

generatePasswordButton.addEventListener("click", generatePassword);
copyButton.addEventListener("click", copy);

function generatePassword() {
    const options = {
        length: parseInt(passwordLength.options[passwordLength.selectedIndex].text, 10),
        symbol: symbols.checked,
        number: numbers.checked,
        lowercase: lowercaseCharacters.checked,
        uppercase: uppercaseCharacters.checked
    };

    generatedPasswordField.textContent = "";

    const passwordPool = passwordPoolCreator(options);
    let password = "";

    for (let i = 0; i < options.length; i++) {
        let randomNumber = Math.floor(Math.random() * passwordPool.length);
        password += passwordPool.substring(randomNumber, randomNumber + 1)
    }

    generatedPasswordField.insertAdjacentText("beforeend", password);
}

function passwordPoolCreator(options) {
    let pool = "";

    if (options.symbol) {
        pool += symbolPool;
    }

    if (options.number) {
        pool += numberPool;
    }

    if (options.lowercase) {
        pool += lowercaseCharacterPool;
    }

    if (options.uppercase) {
        pool += uppercaseCharacterPool;
    }
    return pool;
}

function copy() {
    const copyText = async () => {
        try {
            await navigator.clipboard.writeText(generatedPasswordField.textContent);
            console.log("text copied");
        } catch (err) {
            console.log("failed to copy text");
        }
    }
}