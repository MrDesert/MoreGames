let range = 10;
let number;
let numberAttempts;


function newNumber(){
    number = Math.ceil(Math.random()*range);
    document.getElementById("checkNumberBtnID").removeAttribute("disabled");
    toChangeText("taskID", "Компьютер загадал число от 1 до " + range + ". Угадай его!")
    numberAttempts = Math.ceil(Math.log2(range))
    toChangeText("numberAttemptsID", "Количество попыток: " + numberAttempts);
    toChangeText("messageID", "");
    document.getElementById("numberToCheckID").value = "";
    checkNumber.count = 0;
}

function gameMode(r){
    range = r;
    newNumber();
    toSeeable("gameID");
}

function checkNumber(){
    const numberToCheck  = document.getElementById("numberToCheckID").value;
    if(numberToCheck <= range){
        checkNumber.count = (checkNumber.count || 0) + 1;
        if(numberToCheck == number){
            toChangeText("messageID", "Поздравляю вы угадали за: " + checkNumber.count + " попытки! загаданное число: " + number);
            toChangeText("numberAttemptsID", "");
        } else if(numberToCheck < number){
            toChangeText("messageID", "Больше!");
        } else {
            toChangeText("messageID", "Меньше!");
        }
        if(numberToCheck != number){
            toChangeText("numberAttemptsID", "Количество попыток: " + (numberAttempts - checkNumber.count));
            if((numberAttempts - checkNumber.count) <= 0){
                toChangeText("messageID", "К сожелению у вас закончились попытки. Вы не угадали число: " + number);
                document.getElementById("checkNumberBtnID").disabled = "disabled";
            }
        }
    } else{
        toChangeText("messageID", "Число должно быть в диапозоне от 1 до " + range + "!");
    }
}