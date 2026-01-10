const range = 10;
let number;
const numberAttempts = Math.round(Math.log2(range))

newNumber();

function newNumber(){
    number = Math.ceil(Math.random()*range);
    document.getElementById("checkNumberBtnID").removeAttribute("disabled");
    toChangeText("numberAttemptsID", "Количество попыток: " + numberAttempts);
    toChangeText("messageID", "");
    document.getElementById("numberToCheckID").value = "";
    checkNumber.count = 0;
}

function checkNumber(){
    checkNumber.count = (checkNumber.count || 0) + 1;
    const numberToCheck  = document.getElementById("numberToCheckID").value;
    if(numberToCheck == number){
        toChangeText("messageID", "Поздравляю вы угадали за: " + checkNumber.count + " попытки! загаданное число: " + number);
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
}