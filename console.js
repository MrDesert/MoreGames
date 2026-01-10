//Для подключения данной консоли в html стоит указть следующий код: 
//<script src="console.js" onload="createConsole(true)"></script>
//Если поменять true на false она не Будет подключена
//Так же при подключение скрипта можно указать клавишу на которую 
//будет открыватся консоль - (true, "KeyQ"), по умолчанию используеться F1

const myConsole = {
    created: false,
    shown: false,
    showBtn: "F1",
    btnsNames: []
}

function createConsole(isOn, key){

    function createElement({parent, id, style, innerHTML=""}){
        document.querySelector(parent).append(
	        Object.assign(document.createElement("div"), {id: id, style: style, innerHTML: innerHTML})
        );
    }

    if(isOn && !myConsole.created){
        createElement({parent: "body", id: "myConsoleID", style: "z-index: 1000; overflow: auto; position: fixed; right: 0; top: 0; background-color: black; color: white; height: 100%; width: 40%; min-width: 10%; max-width: 100% font-family: 'Courier New', Courier, monospace; resize: horizontal;"});
            document.querySelector("#myConsoleID").hidden = "hidden";
            createElement({parent: "#myConsoleID", id: "myConsoleInfoPanelID", style: "height: auto; width: 100%;"});
                createElement({parent: "#myConsoleInfoPanelID", id: "myConsoleInfoFPSID", style: "height: 25px; width: 130px; font-size: 25px; margin: 10px; display: inline-block;"});
            createElement({parent: "#myConsoleID", id: "myConsoleControlPanel", style: "height: auto; width: 100%; font-size: 20px; padding: 5px;"});
            createElement({parent: "#myConsoleID", id: "myConsoleLines", style: "height: 100%; width: 100%; font-size: 20px; padding: 10px;"});
        myConsole.created = true;
        if(key){myConsole.showBtn = key;}
        FPS(performance.now());
        myLog("Консоль создана!")
    }
    return createElement;

    function FPS(currentTime){
        if(myConsole.created){
            if(currentTime - (FPS.lastTime || 0) >= 1000){
                document.getElementById("myConsoleInfoFPSID").innerHTML = "FPS: " + FPS.count;
                FPS.count = 0;
                FPS.lastTime = currentTime;
            }
            FPS.count = (FPS.count || 0) + 1;
            requestAnimationFrame(FPS);
        }
    }
} 

function consoleCreateBtnsCP(btns){

    function  update(){
        for(let i = 0; i < myConsole.btnsNames.length; i++){
            document.getElementById("myConsoleCPBtnID"+i).innerHTML = myConsole.btnsNames[i] + " - " + 10** document.getElementById("myConsoleCPRangeID").value;
        }
    }

    if(myConsole.created){
        myConsole.btnsNames = [...btns];
        document.querySelector("#myConsoleControlPanel").append(
	        Object.assign(document.createElement("input"), {id: "myConsoleCPRangeID", style: "height: 25px; font-size: 20px; margin: 5px; display: inline-block;", type: "range", min: 0, value: 1, max: 15,})
        );
        document.getElementById("myConsoleCPRangeID").addEventListener('input', ()=> {
            update();
        })
        for(let i = 0; i < myConsole.btnsNames.length; i++){
            document.querySelector("#myConsoleControlPanel").append(
	            Object.assign(document.createElement("button"), {id: "myConsoleCPBtnID"+i, value: myConsole.btnsNames[i], style: "height: 25px; font-size: 20px; margin: 5px; display: inline-block;", onclick: function(){consBtnReturn(10**document.getElementById("myConsoleCPRangeID").value, this.value);}})
            );
        }
        document.querySelector("#myConsoleControlPanel").append(
            Object.assign(document.createElement("button"), {id: "myConsoleCPClearStorageID", style: "height: 25px; font-size: 20px; margin: 5px; display: inline-block;", innerHTML:"очистить локальное хранилище", onclick: function(){localStorage.clear(); startingValues(); hit.count = 0; expBonus.count = 0; bossLevel = 1;}})
        );
        update();
    }
}

document.addEventListener('keydown', (e)=> {
    if(myConsole.created){
        let myConsoleID = document.getElementById("myConsoleID");
        if(e.code === myConsole.showBtn){
            e.preventDefault();
            myConsole.shown = !myConsole.shown;
            myConsole.shown ? myConsoleID.removeAttribute("hidden") : myConsoleID.hidden = "hidden";
        } else if(myConsole.shown && e.code === 'Escape'){
            e.preventDefault();
            myConsole.shown = !myConsole.shown;
            myConsoleID.hidden = "hidden";
        }
    }
});

function myLog(text){
    const line = createConsole();
    if(myConsole.created){
        myLog.count = (myLog.count || 0) + 1;
        line({parent: "#myConsoleLines", id: "myConsoleLineID"+myLog.count, style: "height: 20px; width: 100%;", innerHTML: myLog.count + ". " + text + " - " + new Date().toLocaleTimeString({fractionalSecondDigits: 3})});
        return myLog.count;
    }
}