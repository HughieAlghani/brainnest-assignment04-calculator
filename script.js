let calculate_data = {
    first_number : {
        value : '0',
        active : true,
    },
    operand : {
        value : '+',
        active : false,
    },
    second_number : {
        value : '0',
        active : false,
    },
    result : {
        value : '0',
        active : false,
    }
}

const showHelp = () => {
    let help_text = document.querySelector(".instruction").style;
    if (help_text.display == "block") {
        help_text.display = "none";
    } else {
        help_text.display = "block";
    }
}

const help_button = document.querySelector("button.help-button");
help_button.addEventListener('click', () => showHelp());

const changeDisplay = (text) => {
    let display_number = document.querySelector("#text-display");
    if (text.length >= 10) {
        if (isDecimal(text) && findDotLocation(text) == 10) {
            console.log('case1');
            text = text.slice(0, 10);
            text += 'd';
        } else if (isDecimal(text) && findDotLocation(text) < 10) {
            console.log('case2');
            dot_location = findDotLocation(text);
            behind_dot_remain = 9 - dot_location;
            text = (+text).toFixed(behind_dot_remain).toString();
            console.log(text);
            text = text.slice(0, 10);
        } else {
            console.log('case3');
            text = text.slice(0,9);
            text += '_';
        }
    }
    console.log(text);
    display_number.innerText = text;
}

const isDecimal = (text) => {
    let is_dot_found = false;
    text.split('').forEach((char) => {
        if (char == ".") {
            is_dot_found = true;
        }
    })
    return is_dot_found;
}

const findDotLocation = (text) => {
    let dot_location = -1;
    for (i = 0; i < text.length; i++) {
        if (text[i] == ".") {
            dot_location = i;
        }
    }
    return dot_location;
}

const number_button = document.querySelectorAll("button.number");
number_button.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (calculate_data.result.active === true) {
            calculate_data.result.active = false;
            calculate_data.first_number.active = true;
            calculate_data.first_number.value = e.target.innerText;
            changeDisplay(calculate_data.first_number.value);
        } else if (calculate_data.first_number.active === true) {
            if (e.target.innerText == '.') {
                if (!isDecimal(calculate_data.first_number.value)) {
                    calculate_data.first_number.value += e.target.innerText;
                }
            } else {
                if (calculate_data.first_number.value == '0') {
                    if (e.target.innerText != '00') {
                        calculate_data.first_number.value = e.target.innerText;
                    }
                } else {
                    calculate_data.first_number.value += e.target.innerText;
                }
            }
            changeDisplay(calculate_data.first_number.value);
        } else if (calculate_data.operand.active === true && e.target.innerText != '00') {
            calculate_data.operand.active = false;
            calculate_data.second_number.active = true;
            calculate_data.second_number.value = e.target.innerText;
            changeDisplay(calculate_data.second_number.value);
        } else if (calculate_data.second_number.active === true) {
            if (e.target.innerText == '.') {
                if (!isDecimal(calculate_data.second_number.value)) {
                    calculate_data.second_number.value += e.target.innerText;
                }
            } else {
                calculate_data.second_number.value += e.target.innerText;
            }
            changeDisplay(calculate_data.second_number.value);
        }
        console.log(calculate_data);
    });
});

const operand_button = document.querySelectorAll("button.operand");
operand_button.forEach((button) => {
    button.addEventListener('click', (e) => {
        let operand;
        switch (e.target.innerText) {
            case '+':
                operand = '+';
                break;
            case '-':
               operand = '-';
               break;
            case '×':
                operand = '*';
                break;
            case '÷':
                operand = '/';
                break;
            case '=':
                operand = '=';
                break;
        }

        if (operand == '+' || operand == '-' || operand == '*' || operand == '/') {
            if (calculate_data.first_number.active === true) {
                calculate_data.first_number.active = false;
                calculate_data.operand.active = true;
                calculate_data.operand.value = operand;
            } else if (calculate_data.operand.active === true) {
                calculate_data.operand.value = operand;
            } else if (calculate_data.second_number.active === true) {
                calculate_data.second_number.active = false;
                calculate_data.operand.active = true;
                calculate_data.result.value = operate(calculate_data.first_number.value, calculate_data.operand.value, calculate_data.second_number.value);
                calculate_data.first_number.value = calculate_data.result.value;
                changeDisplay(calculate_data.result.value);
            } else if (calculate_data.result.active === true) {
                calculate_data.result.active = false;
                calculate_data.operand.active = true;
                calculate_data.operand.value = operand;
            }
        } else if (operand == '=') {
            if (calculate_data.first_number.active === true) {
                calculate_data.first_number.active = false;
                calculate_data.result.active = true;
                calculate_data.result.value = calculate_data.first_number.value;
                changeDisplay(calculate_data.result.value);
            } else if (calculate_data.operand.active === true) {
                calculate_data.result.value = calculate_data.first_number.value;
                changeDisplay(calculate_data.result.value);
            } else if (calculate_data.second_number.active === true) {
                calculate_data.second_number.active = false;
                calculate_data.result.active = true;
                calculate_data.result.value = operate(calculate_data.first_number.value, calculate_data.operand.value, calculate_data.second_number.value);
                calculate_data.first_number.value = calculate_data.result.value;
                changeDisplay(calculate_data.result.value);
            } else if (calculate_data.result.active === true) {
                calculate_data.result.value = operate(calculate_data.first_number.value, calculate_data.operand.value, calculate_data.second_number.value);
                calculate_data.first_number.value = calculate_data.result.value;
                changeDisplay(calculate_data.result.value);
            }
        }
        console.log(calculate_data);
    })
})

const addition = (number1, number2) => {
    return number1 + number2;
}
const substract = (number1, number2) => {
    return number1 - number2;
}
const multiplication = (number1, number2) => {
    return number1 * number2;
}
const divide = (number1, number2) => {
    if (number2 == 0) {
        return 'Nice Try!';
    }
    return number1 / number2;
}

const operate = (number1, operand, number2) => {
    if (number1 == 'Nice Try!' || number1 == 'Nope') {
        return 'Nope';
    }
    number1 = +number1;
    number2 = +number2;
    switch (operand) {
        case '+':
            return addition(number1, number2).toString();
    
        case '-':
            return substract(number1, number2).toString();

        case '*':
            return multiplication(number1, number2).toString();

        case '/':
            return divide(number1, number2).toString();
    }
}

const deleteLastDigit = (text) => {
    return text.slice(0, text.length - 1);
}

const system_button = document.querySelectorAll("button.system");
system_button.forEach((button) => {
    button.addEventListener('click', (e) => {
        if (e.target.innerText == 'CLR') {
            if (calculate_data.first_number.active === true) {
                calculate_data.first_number.value = deleteLastDigit(calculate_data.first_number.value);
                changeDisplay(calculate_data.first_number.value);
            } else if (calculate_data.second_number.active === true) {
                calculate_data.second_number.value = deleteLastDigit(calculate_data.second_number.value);
                changeDisplay(calculate_data.second_number.value);
            }
        } else if (e.target.innerText == 'AC') {
            calculate_data = {
                first_number : {
                    value : '0',
                    active : true,
                },
                operand : {
                    value : '+',
                    active : false,
                },
                second_number : {
                    value : '0',
                    active : false,
                },
                result : {
                    value : '0',
                    active : false,
                }
            }
            changeDisplay(calculate_data.first_number.value);
        }
    })
})