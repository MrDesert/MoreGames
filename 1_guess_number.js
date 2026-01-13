let range;
let number;
let numberAttempts;
let game;
let minNum;
let maxNum;
let result;
let rate;
let brain;
let history;
const brainNames = ["Слабый", "Средний", "Сильный - Человеческий", "Беспащяный"];

simulateClick("#gameCustom");

brain = DOM.id("AIRangeID").value;
toChangeText("AIRangeTextID", "Интелект компьютера: " + brain + " - " + brainNames[brain-1]);

function gamesBack(){
    DOM.elHide("escapeBtnID", true);
    DOM.elHide("theGameID", true);
    DOM.elHide("moreAndLessID", false);
    DOM.elHide("switchMode", true);
}
function games(who, abc, hint){
    DOM.elHide("escapeBtnID", false);
    DOM.elHide("theGameID", false);
    DOM.elHide("moreAndLessID", true);
    DOM.elHide("switchMode", true);
    
    if(who == "All"){
        who = "PC";
        abc = "B";
        hint = "Direct";
        DOM.elHide("switchMode", false);
    }
    
    gameMode(who);

    history = abc == "A" ? false : true;
    simulateClick("#"+abc);


    DOM.elHide("gameSettingsID", !history);
    brain = 3;
}

function switchHints(hint){

}

function gameMode(mode){

    DOM.elDisabled(mode, true);
    DOM.elHide("game"+mode+"ID", false);
    game = mode;
    if(mode == "PC"){
        DOM.elDisabled("Man", false);
        DOM.elHide("gameManID", true);
        newGamePC();
    } else{
        DOM.elDisabled("PC", false);
        DOM.elHide("gamePCID", true);
        newGameMan();
    }
}

function difficulty(mode){
    const modes = ["A", "B", "C", "D", "E"];
    for(let i = 0; i < modes.length; i++){
        DOM.elDisabled(modes[i], false)
        DOM.elHide("customRangeID", true);
    }
    DOM.elDisabled(mode.id, true);
    
    if(mode.id == "E"){
        DOM.elHide("customRangeID", false);
        range = 2;
    }else {
        range = Number(mode.value);
    }
    game == "PC" ? newGamePC() : newGameMan();

    document.getElementById("customRangeID").addEventListener('input', function(e) {
        range = this.value > 1 ? this.value : 2;
        game = "PC" ? newGamePC() : newGameMan();
    })
}

function newGamePC(){
    number = Math.ceil(Math.random()*range);
    toChangeText("taskID", "Компьютер загадал число от 1 до " + range + ". Угадай его!")
    toChangeText("messageID", "");
    numberAttempts = Math.ceil(Math.log2(range));
    toChangeText("numberAttemptsID", "Количество попыток: " + numberAttempts);
    DOM.elDisabled("checkNumberBtnID", true);
    DOM.elDisabled("numberToCheckID", false);
    checkNumberPC.count = 0;
    tableClear();
    maxNum ="";
    minNum ="";
    
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
 
            if(numberCheck === number){
                result = "Угадал!";
                const attempts = checkNumberPC.count === 1 ? "попытку" : checkNumberPC.count < 5 && checkNumberPC.count > 1 ? "попытки" : "попыток";
                toChangeText("messageID", "Поздравляю вы угадали за: " + checkNumberPC.count + " " + attempts + "! загаданное число: " + number);
                DOM.elDisabled("numberToCheckID", true);
            } else { 
                if(--numberAttempts > 0){           
                    result = numberCheck < number ? "Больше!" : "Меньше!";
                    toChangeText("messageID", result);
                    toChangeText("numberAttemptsID", "Количество попыток: " + numberAttempts);
                }else{
                    toChangeText("messageID", "К сожелению у вас закончились попытки. Вы не угадали число: " + number);       
                    DOM.elDisabled("numberToCheckID", true);
                }
            }
            maxNum = maxNum || range+1;
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
    DOM.elDisabled("AIRangeID", false)
    DOM.id("AIRangeID").oninput = function(){
        brain = this.value;
        toChangeText("AIRangeTextID", "Интелект компьютера: " + brain + " - " + brainNames[brain-1])
    };
}

function newNum(result){
    DOM.elDisabled("AIRangeID", true);
    if(newNum.count>0){tableAdd(newNum.count, "№"+newNum.count, number, result, "~"+rate+"%")};
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
            const per20 = Math.round((maxNum-minNum) / 10)
            const min = (minNum - per20) > 0 ? minNum - per20 : 0;
            const max = (maxNum + per20) < range ? maxNum + per20 : range;
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
    DOM.elDisabled("AIRangeID", false);
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

