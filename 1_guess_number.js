let range;
let number;
let numberAttempts;
let game;
let minNumber;
let maxNumber;

simulateClick("#modePC");
simulateClick("#modeB");


document.getElementById("customRangeID").addEventListener('input', function(e) {
    range = this.value > 1 ? this.value : 2;
    infoChange();
    newNumber()
})

function newNumber(znak){
    toChangeText("messageID", game);
    if(game == "pc"){
        number = Math.ceil(Math.random()*range);
        document.getElementById("checkNumberBtnID").removeAttribute("disabled");
        toChangeText("messageID", "");
        document.getElementById("numberToCheckID").value = "";
        numberAttempts = Math.ceil(Math.log2(range))
        checkNumber.count = 0;
        toChangeText("numberAttemptsID", "Количество попыток: " + numberAttempts);
    } else if(game == "man"){
        if(znak == "more"){
            minNumber = number;
        }else if(znak == "less"){
            maxNumber = number;
        }else{
            minNumber = 1;
            maxNumber = range;
            number = Math.ceil(Math.random()*range);
        }
        while(number <= minNumber || number >= maxNumber){
            number = Math.ceil(Math.random()*range);
        }
        toChangeText("messageID", "Число компьютера: " + number);
        numberAttempts--
        toChangeText("numberAttemptsID", "Количество попыток: " + numberAttempts);
        if(numberAttempts < 0){
            toChangeText("messageID", "Компьютер не смог угадать ваше число!");
            toChangeText("numberAttemptsID", "");
        }
    }
}

function gameMode(mode){

    const modes = ["modePC", "modeMan"];

    for(let i = 0; i < modes.length; i++){
        document.getElementById(modes[i]).removeAttribute("disabled");
    } 
    document.getElementById(mode.id).disabled = "disabled";
    if(mode.id == "modePC"){
        game = "pc";
        toHide("gameManID");
        toSeeable("gamePCID");
    } else if(mode.id == "modeMan"){
        game = "man";
        toHide("gamePCID");
        toSeeable("gameManID");
    }
    infoChange();
}

function infoChange(){
    if(game == "pc"){
        toChangeText("taskID", "Компьютер загадал число от 1 до " + range + ". Угадай его!")
    } else if(game == "man"){
        toChangeText("taskID", "Вам необходимо загадать число от 1 до " + range + ". Компьютер будет угадывать!")
    }
}

function difficulty(mode){
    const modes = ["modeA", "modeB", "modeC", "modeD", "modeE"];
    for(let i = 0; i < modes.length; i++){
        document.getElementById(modes[i]).removeAttribute("disabled");
    } 
    document.getElementById(mode.id).disabled = "disabled";
    
    
    if(mode.id == "modeE"){
        toSeeable("customRangeID");
    }else {
        range = Number(mode.value);
        newNumber();
    }
    infoChange();
}

function checkNumber(mode){
    if(mode == "gamePC"){
    const numberToCheck  = Math.round(document.getElementById("numberToCheckID").value);
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
                toChangeText("numberAttemptsID", "");
                document.getElementById("checkNumberBtnID").disabled = "disabled";
            }
        }
    } else{
        toChangeText("messageID", "Число должно быть в диапозоне от 1 до " + range + "!");
    }
    } else if(mode == "gameMan"){
        const gameManBtns = ["moreID", "lessID", "pcRightID"];
        for(let i = 0; i < gameManBtns.length; i++){
            document.getElementById(gameManBtns[i]).removeAttribute("disabled");
        }
            numberAttempts = Math.ceil(Math.log2(range))+2
        newNumber();
    }
}

function pcRightNumber(){
    const gameManBtns = ["moreID", "lessID", "pcRightID"];
        for(let i = 0; i < gameManBtns.length; i++){
            document.getElementById(gameManBtns[i]).disabled = "disabled";
        } 
    toChangeText("messageID", "Компьютер угадал ваше число:" + number + "!" );
}

