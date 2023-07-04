const passwordLengthSelector = document.getElementById("password-length-selector");
const symbolsCheckbox = document.getElementById("symbols-checkbox");
const numbersCheckbox = document.getElementById("numbers-checkbox");
const lowercaseCharactersCheckbox = document.getElementById("lowercase-checkbox");
const uppercaseCharactersCheckbox = document.getElementById("uppercase-checkbox");
const generatePasswordButton = document.getElementById("generate-password-button");
const generatedPasswordField = document.getElementById("generated-password-field");
const copyButton = document.getElementById("copy-button");

const symbolPool = "!@#$%^&*()";
const numberPool = "0123456789";
const lowercaseCharacterPool = "abcdefghijklmnopqrstuvwxyz";
const uppercaseCharacterPool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

generatePasswordButton.addEventListener("click", generatePasswordButtonListener);
copyButton.addEventListener("click", copyButtonListener);

function generatePasswordButtonListener() {
    const passwordLength = parseInt(passwordLengthSelector.options[passwordLengthSelector.selectedIndex].text, 10);
    const options = {
        symbol: symbolsCheckbox.checked,
        number: numbersCheckbox.checked,
        lowercase: lowercaseCharactersCheckbox.checked,
        uppercase: uppercaseCharactersCheckbox.checked
    };
    if (!options.symbol && !options.number && !options.lowercase && !options.uppercase) {
        console.log("no options")
        return;
    }
    const password = generatePassword(passwordLength, options);
    generatedPasswordField.textContent = "";
    generatedPasswordField.insertAdjacentText("beforeend", password);
}

function copyButtonListener() {
    navigator.clipboard.writeText(generatedPasswordField.textContent).then(
        () => console.log("text copied")
    ).catch(
        () => console.log("failed to copy text")
    );
}

function generatePassword(passwordLength, options) {
    const passwordPool = passwordPoolCreator(options);
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * passwordPool.length);
        password += passwordPool.substring(randomNumber, randomNumber + 1)
    }
    return password;
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