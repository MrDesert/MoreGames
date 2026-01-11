let range;
let number;
let numberAttempts;
let game;
let minNumber;
let maxNumber;
let result;

simulateClick("#modePC");
simulateClick("#modeB");

document.getElementById("customRangeID").addEventListener('input', function(e) {
    range = this.value > 1 ? this.value : 2;
    infoChange();
    newNumber()
})

function sign(s){
    result = s;
    if(game == "pc"){
        toChangeText("messageID", result);
    } else if(game == "man") {
        newNumber()
    }
}

function newGame(bool){
    toChangeText("messageID", "");
    attempts.count;
    result="";
    if(game == "pc"){
        DOM.elDisabled("checkNumberBtnID", false);
        newNumber();
    }else if(game == "man"){
        gameManBtnsDis(true);
        if(bool){newNumber();}
    }
    numberAttempts = Math.ceil(Math.log2(range));
    toChangeText("numberAttemptsID", "Количество попыток: " + numberAttempts);
    checkNumber.count = 0;
    tableClear()
}

function newNumber(){
    if(game == "pc"){
        number = Math.ceil(Math.random()*range);
        document.getElementById("numberToCheckID").value = "";
    } else if(game == "man"){
        if(result == "Больше!"){
            minNumber = number;
        }else if(result == "Меньше!"){
            maxNumber = number;
        }else{
            minNumber = 1;
            maxNumber = range;
            gameManBtnsDis(false)
        }
        myLog(minNumber);
        myLog(maxNumber) 
        if(minNumber < maxNumber){
            myLog(minNumber < maxNumber) 
            if(attempts.count>0){tableAdd(attempts.count, attempts.count, number, result, "1%")};
            do {
                number = Math.ceil(Math.random()*(maxNumber-minNumber))+minNumber;
            } while(number == minNumber || number == maxNumber);
            toChangeText("messageID", "Число компьютера: " + number);
            attempts();
        } else{
            toChangeText("messageID", "Так не можыт быть вы где-то ошиблись!");
        }

    }
}

function gameMode(mode){

    const modes = ["modePC", "modeMan"];

    for(let i = 0; i < modes.length; i++){
        DOM.elDisabled(modes[i], false);
    } 
    DOM.elDisabled(mode.id, true);
    if(mode.id == "modePC"){
        game = "pc";
        DOM.elHide("gameManID", true);
        DOM.elHide("gamePCID", false);
    } else if(mode.id == "modeMan"){
        game = "man";
        DOM.elHide("gamePCID", true);
        DOM.elHide("gameManID", false);
    }
    newGame()
    infoChange();
}

function endGame(status){
    if(game == "man"){
        if(status == "win"){
            toChangeText("messageID", "Компьютер угадал ваше число:" + number + "!" );
        } else if(status == "defeat"){
            toChangeText("messageID", "Компьютер не смог угадать ваше число!");
        }
        gameManBtnsDis(true);
    } else if(game == "pc"){
        if(status == "win"){
            toChangeText("messageID", "Поздравляю вы угадали за: " + checkNumber.count + " попытки! загаданное число: " + number);
        }else if(status == "defeat"){
            toChangeText("messageID", "К сожелению у вас закончились попытки. Вы не угадали число: " + number);            
        }
        DOM.elDisabled("checkNumberBtnID", true);
    }
    toChangeText("numberAttemptsID", "");
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
        DOM.elDisabled(modes[i], false)
        DOM.elHide("customRangeID", true);
    }
    DOM.elDisabled(mode.id, true);
    
    if(mode.id == "modeE"){
        DOM.elHide("customRangeID", false);
    }else {
        range = Number(mode.value);
        newNumber();
    }
    newGame()
    infoChange();
}

function attempts(){
    attempts.count = (attempts.count || 0) + 1;
    numberAttempts--;
    toChangeText("numberAttemptsID", "Количество попыток: " + numberAttempts);
    if(game == "pc"){
        if(numberAttempts <= 0){
            endGame("defeat");
        }
    } else {
        if(numberAttempts <= -1){
            endGame("defeat");
        }
    }
}

function checkNumber(mode){
    if(mode == "gamePC"){
    const numberToCheck  = Math.round(document.getElementById("numberToCheckID").value);
    if(numberToCheck <= range){
        checkNumber.count = (checkNumber.count || 0) + 1;
        if(numberToCheck == number){
            endGame("win");
        } else {            
            numberToCheck < number ? sign("Больше!") : sign("Меньше!");
            attempts();
        }
        tableAdd(checkNumber.count, checkNumber.count, numberToCheck, result, "1%");
    } else{
        toChangeText("messageID", "Число должно быть в диапозоне от 1 до " + range + "!");
    }
    }
}

function gameManBtnsDis(bool){
    const gameManBtns = ["moreID", "lessID", "pcRightID"];
    for(let i = 0; i < gameManBtns.length; i++){
        DOM.elDisabled(gameManBtns[i], bool);
    } 
}

function tableAdd(att, ...other){
    other.forEach((p, i) => {
        toChangeText("cellID"+att+"x"+(i+1), p);
    });
}

function tableClear(){
    for(let i = 0; i < 7; i++){
        for(let j = 0; j < 4; j++){
            toChangeText("cellID"+(i+1)+"x"+(j+1), "");
        }
    }
}

