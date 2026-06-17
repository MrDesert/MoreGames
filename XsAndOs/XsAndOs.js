const row = 3;
const col = 3;
const sizeBoard = row*col;
const cells = [];

createBoard();

function createBoard(){
    for(let i = 1; i < (sizeBoard+1); i++){
         
        const cellRow = Math.floor(i / row) - (i % row == 0 ? 1 : 0)+1; 
        const cellCol = i % col == 0 ? col : i % col;
        const id = "cell"+cellRow+cellCol;

        document.getElementById("XsAndOsBoard")['append'](Object.assign(document.createElement("div"), {id: id, className: "cell", onclick: () => game(id)}))
        cells.push({id:id, row: cellRow, col: cellCol, content: "void"})
    }
}

function game(cell){

    document.getElementById(cell).textContent = "X";
}
