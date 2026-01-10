function toDefineSelector(name){
    let selector = name.substring(0, 1);
    let type;
    switch (selector){
        case "#":
            type = "id";
            break;
        case ".":
            type = "class";
            break;
        default:
            type = "tag";
    }
    return type;
}

function toCompactNotation(number){
    let units = ['', 'k', 'M', 'B', 'T'];
    let alphabet = ['A', 'B', 'C'];
    var exponent = Math.floor(Math.log10(number)/3);
    let shortNumber = 0;
    if (number != 0){ //Если приходит число 0, то и уходит 0, что бы небыло ошибки деления на ноль.
        shortNumber = Math.floor(number/(10**(exponent*3))*10)/10 +  units[exponent]; 
    }
    return shortNumber;
}

function colorNumbers(id, color){
    document.getElementById(id).style.color = color;
    document.getElementById(id).style.filter = "blur(0.3px)"
    setTimeout(function(){
        document.getElementById(id).style.color = "black"
        document.getElementById(id).style.filter = "none"
    }, (400));
}

function toRoundoff(number){
    number = Math.round(number);                                            //Само число, округление что бы не было дробей, только целые числа.
    let length = number.toString().length;                                  //Количество символов в числе.
    let magnitude = 10**(length - 1);                                       //Разряды. Приведение к числам кратным 10. Например 10, 100, 1000 и т.д. 
    let roundNumber = Math.round(number/(10**(length-2)))*(magnitude/10);   //Результат округлённое число, с двумя знаками дальше только нули.
    // Консоли для проверки;
    // console.log(number + " - Само число");
    // console.log(length + " - Количество символов в числе");
    // console.log(magnitude + " - Приведение к кратным числам");
    // console.log(number/magnitude + " - Число делим на разряды");
    return roundNumber;
}

const consoleBold = "font-weight: bold;";
const consoleNormal = "font-weight: normal;";

//Родитель: имя с селектором; Ребёнок: Тэг, ID, классы, текст; Тех. Инфо: Код поиска.
function toCreateTag(name, tag, ID, classes, text, trackCode){
    let typeSelector = toDefineSelector(name);
    if (!trackCode){trackCode = "Не указан кода для отслеживания!"}             //Если код поиска пустой, то он заполняеться об этом
    switch (typeSelector){
        case "id": 
        // console.log(ID);                                                             //Создаёт элемент на основе ID родителя - Всегда 1 шт
            document.querySelector(name).append(
		        Object.assign(document.createElement(tag), {id: ID, className: classes, innerHTML: text})
	        );
            break;
        case "class":                                                           //Создаёт элемент на основе class родителя - создаёт во всех элементах с этим классом
            document.querySelectorAll(name).forEach(element => {element.append(
		        Object.assign(document.createElement(tag), {id: ID, className: classes, innerHTML: text})
            )});
            break;
        case "tag":                                                             //Создаёт элемент на основе tag родителя - создаёт во всех элементах с этим классом
            document.querySelectorAll(name).forEach(element => {element.append(
		        Object.assign(document.createElement(tag), {id: ID, className: classes, innerHTML: text})
            )});
            break;
        default: 
            console.log("Ошибка данный тип селектора: %c" + typeSelector + "%c не соответствет ни одному из этих: id, class, tag. Необходимо указать правильный тип. " + "Код поиска: %c" + trackCode, consoleBold, consoleNormal, consoleBold);
    }
}

function simulateClick(selector){
    const element = document.querySelector(selector);
    if (element) {
         element.dispatchEvent(new MouseEvent('click', {bubbles: true}));
    }
    // simulateClick('#bossLevelBonusID' + Math.round(Math.random()*trw.length)); // пример использования
}

function softProgress (original, rate){
    // console.log(original + " original")
    let lenght = Math.floor(original).toString().length; //Округляем что бы не считались знаки после запятой
    let result = original + 2**(lenght+rate);
    return result;
}

function toChangeText(id, text){
    document.getElementById(id).innerHTML = text;
}

function toStyle(name, typeValue, value){
    name = toDefineSelector(name) == "id" ? document.querySelector(name) : document.querySelectorAll(name);
    name.style[typeValue] = value;
    // console.log(typeValue+ " такого свойства нет! ");
}

function toHide(id){
    document.getElementById(id).hidden = "hidden";
}

function toSeeable(id){
    document.getElementById(id).removeAttribute("hidden");
}