const range = 10;
const number = Math.ceil(Math.random()*range);

// toChangeText("numberID", number)

function checkNumber(){
    checkNumber.count = (checkNumber.count || 0) + 1;
    const numberToCheck  = document.getElementById("numberToCheckID").value;
    if(numberToCheck == number){
        toChangeText("messageID", "Поздравляю вы угадали за: " + checkNumber.count + " попыток! загаданное число: " + number);
    } else if(numberToCheck < number){
        toChangeText("messageID", "Больше!");
    } else {
        toChangeText("messageID", "Меньше!");
    }
}