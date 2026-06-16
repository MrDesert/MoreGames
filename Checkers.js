const sizeBoard = 8;
const checkersBoard = sizeBoard*sizeBoard;
const gameCells = []; 

generateBoard();
function generateBoard(){
    for(let i = 1; i <= checkersBoard; i++){
        let colorCell = (i-Math.floor(i/sizeBoard)-(i % sizeBoard ? 1 : 0)) % 2 == 1 ? "black" : "white";
        document.getElementById("checkersBoard")['append'](Object.assign(document.createElement("div"), {id: "cell"+i, className: "cell", style: "height: " + 50 + "px; width: " + 50 + "px; left:" + i*50 + "px; background: "+ colorCell +";" }));
        if(colorCell == "black")gameCells.push("cell"+i)
    }
}
function newGame(){
    let i = sizeBoard;
    let j = (Math.floor(i/2)-1) * (Math.floor(i/2));
    gameCells.forEach(cell => {
        if(j > 0){
            document.getElementById(cell)['append'](Object.assign(document.createElement("div"), {id: "checkers"+cell, className: "checker", style: "height: " + 40 + "px; width: " + 40 + "px; left:" + 5 + "px; top: 5px; background: white; border-radius: 50%" }));
            j--;
        } else if(i > 0){
            i--;
        } else {
            document.getElementById(cell)['append'](Object.assign(document.createElement("div"), {id: "checkers"+cell, className: "checker", style: "height: " + 40 + "px; width: " + 40 + "px; left:" + 5 + "px; top: 5px; background: white; border-radius: 50%" }));
        }
    })
}