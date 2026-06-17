const sizeBoard = 8;
const checkersBoard = sizeBoard*sizeBoard;
const gameCells = [];
const whiteCheckers = [];
const blackCheckers = [];
const checkersBoardID = document.getElementById("checkersBoard"); 

generateBoard();
function generateBoard(){
    for(let i = 1; i <= checkersBoard; i++){
        let colorCell = (i-Math.floor(i/sizeBoard)-(i % sizeBoard ? 1 : 0)) % 2 == 1 ? "black" : "white";
        checkersBoardID['append'](Object.assign(document.createElement("div"), {id: "cell"+i, className: "cell", style: "height: " + 50 + "px; width: " + 50 + "px; left:" + i*50 + "px; background: "+ colorCell +";" }));
        if(colorCell == "black")gameCells.push("cell"+i)
    }
}
function newGame(){
    let i = sizeBoard;
    let j = (Math.floor(i/2)-1) * (Math.floor(i/2));
    gameCells.forEach(cell => {
        const cellID = document.getElementById(cell);
        if(j > 0){
            checkersBoardID['append'](Object.assign(document.createElement("div"), {id: "checkers"+cell, className: "checker", style: "left: 0px; top: 0px; background: white;" }));
            objectToObject(document.getElementById("checkers"+cell), cellID);
            j--;
            whiteCheckers.push("checkers"+cell);
        } else if(i > 0){
            i--;
        } else {
            checkersBoardID['append'](Object.assign(document.createElement("div"), {id: "checkers"+cell, className: "checker", style: "left: 0px; top: 0px; background: rgb(94, 39, 0);" }));
            objectToObject(document.getElementById("checkers"+cell), cellID)
            blackCheckers.push("checkers"+cell);
        }
    })
}

function objectToObject(idObject, idTarget){
    const object = idObject.getBoundingClientRect();
    const objectX = object.left + (object.width/2);
    const objectY = object.top + (object.height/2);
    const target = idTarget.getBoundingClientRect();
    const targetX = target.left + (target.width/2);
    const targetY = target.top + (target.height/2);
    const moveX = targetX - objectX;
    const moveY = targetY - objectY;
    idObject.style.left = moveX + "px";
    idObject.style.top = moveY + "px";
}