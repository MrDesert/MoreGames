let range;
let number;
let numberAttempts;
let game;
let minNum;
let maxNum;
let result;
let rate;
const brain = 3;

simulateClick("#modeMan");
simulateClick("#modeB");

function gameMode(mode){

    DOM.elDisabled(mode.id, true);
    DOM.elHide(mode.value, false);
    game = mode.id;
    if(mode.id == "modePC"){
        DOM.elDisabled("modeMan", false);
        DOM.elHide("gameManID", true);
        newGamePC();
    } else{
        DOM.elDisabled("modePC", false);
        DOM.elHide("gamePCID", true);
        newGameMan();
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
    }
    game == "modePC" ? newGamePC() : newGameMan();

    document.getElementById("customRangeID").addEventListener('input', function(e) {
        range = this.value > 1 ? this.value : 2;
        game = "modePC" ? newGamePC() : newGameMan();
    })
}

function newGamePC(){
    number = Math.ceil(Math.random()*range);
    toChangeText("taskID", "Компьютер загадал число от 1 до " + range + ". Угадай его!")
    toChangeText("messageID", "");
    numberAttempts = Math.ceil(Math.log2(range));
    toChangeText("numberAttemptsID", "Количество попыток: " + numberAttempts);
    DOM.elDisabled("checkNumberBtnID", true);
    checkNumberPC.count = 0;
    tableClear();
    
    DOM.id("numberToCheckID").addEventListener('input', function(e) {
        DOM.elDisabled("checkNumberBtnID", this.value > 0 ? false : true);
    })
}

function checkNumberPC(){
    const numberCheck = Math.round(DOM.id("numberToCheckID").value);
    DOM.id("numberToCheckID").value = '';
    DOM.elDisabled("checkNumberBtnID", true)

    if(numberCheck <= range){
        checkNumberPC.count = (checkNumberPC.count || 0) + 1;
        toChangeText("numberAttemptsID", "");  
        numberAttempts--;
        if(numberAttempts > 0){
            if(numberCheck === number){
                result = "Угадал!";
                toChangeText("messageID", "Поздравляю вы угадали за: " + checkNumberPC.count + " попытки! загаданное число: " + number);
            } else {            
                result = numberCheck < number ? "Больше!" : "Меньше!";
                toChangeText("messageID", result);
                toChangeText("numberAttemptsID", "Количество попыток: " + numberAttempts);
            }
        } else{
            toChangeText("messageID", "К сожелению у вас закончились попытки. Вы не угадали число: " + number);       
        }
        tableAdd(checkNumberPC.count, checkNumberPC.count, numberCheck, result, "1%");
    } else{
        toChangeText("messageID", "Число должно быть в диапозоне от 1 до " + range + "!");
    }
}

function newGameMan(){
    toChangeText("taskID", "Вам необходимо загадать число от 1 до " + range + ". Компьютер будет угадывать!");
    toChangeText("messageID", "");
    numberAttempts = Math.ceil(Math.log2(range));
    toChangeText("numberAttemptsID", "Количество попыток: " + numberAttempts);
    gameManBtnsDis(true);
    newNum.count = 0;
    tableClear()
}

function newNum(result){
    if(newNum.count>0){tableAdd(newNum.count, "№"+newNum.count, number, result, rate+"%")};
    newNum.count = (newNum.count || 0) + 1;
    switch(result){
        case "Больше!": minNum = number > minNum ? number : minNum; break;
        case "Меньше!": maxNum = number < maxNum ? number : maxNum; break;
        default: minNum = 0; maxNum = range+1;
        gameManBtnsDis(false);
    }
    rate = Math.round(1/(maxNum-minNum-1)*100);
    if(maxNum-minNum > 1){
        //Интелект 2 уровня - берёт рандомное значение но сужающемся диапазоне
        if(brain == 2){
            do {number = Math.ceil(Math.random()*(maxNum-minNum))+minNum;
            } while(number == minNum || number == maxNum);
        }
        //Интелект 1 уровня - учитывает только поледнее направление
        else if(brain == 1){
            if (result == "Больше!"){
                number = Math.ceil(Math.random()*(range-number))+number;
            } else if (result == "Меньше!"){
                number = Math.ceil(Math.random()*number-1);
            } else{
                number = Math.ceil(Math.random()*range)
            }
        } 
        //Интелект 3 уровня - более очеловечен за чёт рандома но работает как 4, самый интересный вариант
        else if(brain == 3){
            const sum = maxNum+minNum-1;
            const per10 = Math.round((maxNum-minNum-1)/10);
            const randN = Math.round(Math.random()*per10)
            const znak = Math.round(Math.random()*1);
            if(sum%2 == 0){
                number = sum/2+ Math.round(Math.random()*1);
            } else{
                number = Math.round(sum/2);
            }
            number = znak == 1 ? number+randN : number-randN; 
        }
        //Интелект 4 уровня - 100% угадывает, принцип бинарного деления
        else if(brain == 4){
            const sum = maxNum+minNum-1;
            if(sum%2 == 0){
                number = sum/2+ Math.round(Math.random()*1);
            } else{
                number = Math.round(sum/2);
            }
        }
        toChangeText("messageID", "Число компьютера: " + number);
        if(numberAttempts <= 0){
            endGame("defeat");
        } else{
            toChangeText("numberAttemptsID", "Количество попыток: " + --numberAttempts);
        }
    } else{
        endGame("err")
    }
}

function endGame(status){
    if(status == "win"){
        toChangeText("messageID", "Компьютер угадал ваше число:" + number + "!" );
        tableAdd(newNum.count, "№"+newNum.count, number, "Угадал!", rate+"%")
    } else if(status == "defeat"){
        toChangeText("messageID", "Компьютер не смог угадать ваше число!");
    } else if(status == "err"){
        toChangeText("messageID", "Так не можыт быть вы где-то ошиблись!");
    }
    gameManBtnsDis(true);
    toChangeText("numberAttemptsID", "");
}

function gameManBtnsDis(bool){
    const gameManBtns = ["moreID", "lessID", "pcRightID"];
    for(let i = 0; i < gameManBtns.length; i++){
        DOM.elDisabled(gameManBtns[i], bool);
    } 
}

function tableAdd(att, ...other){
    document.querySelector("#tableID").prepend(
		Object.assign(document.createElement("tr"), {id: "strID"+att})
	);
    other.forEach((p) => {
        toCreateTag("#strID"+att, "td", "", "", p, "");
    });
}

function tableClear(){
    toChangeText("tableID", "");
}

