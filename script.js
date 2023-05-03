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

let first_number_value = calculate_data.first_number.value;
let first_number_active = calculate_data.first_number.active;
let operand_value = calculate_data.operand.value;
let operand_active = calculate_data.operand.active;
let second_number_value = calculate_data.second_number.value;
let second_number_active = calculate_data.second_number.active;
let result_value = calculate_data.result.value;
let result_active = calculate_data.result.active;

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
    console.log(text.length )
    if (text.length >= 18) {
        if (isDecimal(text) && findDotLocation(text) == 17) {
            text = text.slice(0, 17);
            text += 'd';
        } else if (isDecimal(text) && findDotLocation(text) < 17) {
            dot_location = findDotLocation(text);
            behind_dot_remain = 18 - dot_location;
            text = (+text).toFixed(behind_dot_remain).toString();
            text = text.slice(0, 18);
        } else {
            text = text.slice(0,17);
            text += '_';
        }
    }
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
        console.log(first_number_value);
        if (first_number_active === true) {
            if (e.target.innerText == '.') {
                if (!isDecimal(first_number_value)) {
                    first_number_value += e.target.innerText;
                }
            } else {
                if (first_number_value == '0') {
                    first_number_value = e.target.innerText;
                } else {
                    first_number_value += e.target.innerText;
                }
            }
            changeDisplay(first_number_value);
        } else if (operand_active === true) {
            operand_active = false;
            second_number_active = true;
            second_number_value = e.target.innerText;
            changeDisplay(second)
        } else {
            second_number_value 
        }
        console.log(e.target.innerText);
        console.log(first_number_value);
        console.log('');
    });
});