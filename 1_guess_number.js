let number;
let numberAttempts;
const gameRoles = {
    riddler: "NOT", //Тот кто загадывает число
    guesser: "NOT" //Тот кто отгаывает число
}
const difficulty = {
    beginner: {id: "beginner", range: 10},
    classic: {id: "classic", range: 100},
    pro: {id: "pro", range: 1000},
    expert: {id: "expert", range: 10000},
    custom: {id: "custom", range: 2}
}
const curDifficuty = {id: "NOT", range: "NOT"};
let minNum;
let maxNum;
let result;
let rate;
let brain;
let history;
const brainNames = ["Слабый", "Средний", "Сильный - Человеческий", "Беспащяный"];

simulateClick("#gameCustom");

brain = DOM.Id("AIRangeID").value;
toChangeText("AIRangeTextID", "Интелект компьютера: " + brain + " - " + brainNames[brain-1]);

function gamesBack(){
    DOM.Hide("escapeBtnID", true);
    DOM.Hide("theGameID", true);
    DOM.Hide("moreAndLessID", false);
    DOM.Hide("switchMode", true);
}
function games(who, abc, hint){
    DOM.Hide("escapeBtnID", false);
    DOM.Hide("theGameID", false);
    DOM.Hide("moreAndLessID", true);
    DOM.Hide("switchMode", true);
    
    if(who == "All"){
        who = "PC";
        abc = "classic";
        hint = "Direct";
        DOM.Hide("switchMode", false);
    }
    
    setRoles(who);

    history = abc == "beginner" ? false : true;
    setDifficulty(abc)
    switchHints(hint)

    DOM.Hide("gameSettingsID", !history);
    brain = 3;
}

function switchHints(hint){

}

function hideElements(){

}

function setRoles(entity){
    gameRoles.riddler = entity;
    gameRoles.guesser = entity == "PC" ? "Man" : "PC";
    DOM.Disable(gameRoles.riddler, true);
    DOM.Disable(gameRoles.guesser, false);
    DOM.Hide("game"+gameRoles.riddler+"ID", false);
    DOM.Hide("game"+gameRoles.guesser+"ID", true);
    startNewGame();
}

function setDifficulty(select){
    curDifficuty.id = select;
    curDifficuty.range = difficulty[select].range;
    for(const key in difficulty){DOM.Disable(difficulty[key].id, false)}
    DOM.Disable(curDifficuty.id, true);
    DOM.Hide("customRangeID", curDifficuty.id == "custom" ? false : true);
    DOM.Id("customRangeID").addEventListener('input', function(e) {
        curDifficuty.range = this.value > 1 ? this.value : difficulty["custom"].range;
        startNewGame();
    })
    startNewGame();
}

function startNewGame(){
    gameRoles.riddler == "PC" ? newGamePC() : newGameMan();
}

function newGamePC(){
    number = Math.ceil(Math.random()*curDifficuty.range);
    toChangeText("taskID", "Компьютер загадал число от 1 до " + curDifficuty.range + ". Угадай его!")
    toChangeText("messageID", "");
    numberAttempts = Math.ceil(Math.log2(curDifficuty.range));
    toChangeText("numberAttemptsID", "Количество попыток: " + numberAttempts);
    DOM.Disable("checkNumberBtnID", true);
    DOM.Disable("numberToCheckID", false);
    checkNumberPC.count = 0;
    tableClear();
    maxNum ="";
    minNum ="";
    
    DOM.Id("numberToCheckID").addEventListener('input', function(e) {
        DOM.Disable("checkNumberBtnID", this.value > 0 ? false : true);
    })
}

function checkNumberPC(){
    const numberCheck = Math.round(DOM.Id("numberToCheckID").value);
    DOM.Id("numberToCheckID").value = '';
    DOM.Disable("checkNumberBtnID", true)

    if(numberCheck <= curDifficuty.range){
        checkNumberPC.count = (checkNumberPC.count || 0) + 1;
        toChangeText("numberAttemptsID", "");  
 
            if(numberCheck === number){
                result = "Угадал!";
                const attempts = checkNumberPC.count === 1 ? "попытку" : checkNumberPC.count < 5 && checkNumberPC.count > 1 ? "попытки" : "попыток";
                toChangeText("messageID", "Поздравляю вы угадали за: " + checkNumberPC.count + " " + attempts + "! загаданное число: " + number);
                DOM.Disable("numberToCheckID", true);
            } else { 
                if(--numberAttempts > 0){           
                    result = numberCheck < number ? "Больше!" : "Меньше!";
                    toChangeText("messageID", result);
                    toChangeText("numberAttemptsID", "Количество попыток: " + numberAttempts);
                }else{
                    toChangeText("messageID", "К сожелению у вас закончились попытки. Вы не угадали число: " + number);       
                    DOM.Disable("numberToCheckID", true);
                }
            }
            maxNum = maxNum || curDifficuty.range+1;
            minNum = minNum || 0;
            rate = Math.round(1/(maxNum-minNum-1)*10000)/100;
            myLog(minNum+"min")
            myLog(maxNum+"max")
            myLog(rate+"rate")
            rate = numberCheck < maxNum && numberCheck > minNum ? rate : 0;
            tableAdd(checkNumberPC.count, checkNumberPC.count, numberCheck, result, "~"+rate+"%");
        switch(result){
            case "Больше!": minNum = numberCheck > minNum ? numberCheck : minNum; break;
            case "Меньше!": maxNum = numberCheck < maxNum ? numberCheck : maxNum; break;
        }
    } else{
        toChangeText("messageID", "Число должно быть в диапозоне от 1 до " + curDifficuty.range + "!");
    }
}

function newGameMan(){
    toChangeText("taskID", "Вам необходимо загадать число от 1 до " + curDifficuty.range + ". Компьютер будет угадывать!");
    toChangeText("messageID", "");
    numberAttempts = Math.ceil(Math.log2(curDifficuty.range));
    toChangeText("numberAttemptsID", "Количество попыток: " + numberAttempts);
    gameManBtnsDis(true);
    newNum.count = 0;
    tableClear()
    DOM.Disable("AIRangeID", false)
    DOM.Id("AIRangeID").oninput = function(){
        brain = this.value;
        toChangeText("AIRangeTextID", "Интелект компьютера: " + brain + " - " + brainNames[brain-1])
    };
}

function newNum(result){
    DOM.Disable("AIRangeID", true);
    if(newNum.count>0){tableAdd(newNum.count, "№"+newNum.count, number, result, "~"+rate+"%")};
    newNum.count = (newNum.count || 0) + 1;
    switch(result){
        case "Больше!": minNum = number > minNum ? number : minNum; break;
        case "Меньше!": maxNum = number < maxNum ? number : maxNum; break;
        default: minNum = 0; maxNum = curDifficuty.range+1;
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
            const per20 = Math.round((maxNum-minNum) / 10)
            const min = (minNum - per20) > 0 ? minNum - per20 : 0;
            const max = (maxNum + per20) < curDifficuty.range ? maxNum + per20 : curDifficuty.range;
            myLog(Math.round(Math.random()*1000))
            do {number = Math.ceil(Math.random()*(max-min))+min;
            } while(number == minNum || number == maxNum);
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
    DOM.Disable("AIRangeID", false);
    toChangeText("numberAttemptsID", "");
}

function gameManBtnsDis(bool){
    const gameManBtns = ["moreID", "lessID", "pcRightID"];
    for(let i = 0; i < gameManBtns.length; i++){
        DOM.Disable(gameManBtns[i], bool);
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

