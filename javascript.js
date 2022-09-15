const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;
const nothing = (a, b) => a;

const upperScreen = document.getElementById("upper");
const lowerScreen = document.getElementById("lower");

window.addEventListener('click',(event) => {
    updateScreen();
    logMemory();
    console.log("click");
})

var lowerScreenNumber = '';
var storedNumber = '';
var equation = '';
var op = nothing;

updateScreen = function(){
    lowerScreen.textContent = lowerScreenNumber;
    upperScreen.textContent = equation;
}

operate = function(pressedEquals = false){
    let answer = String(op(Number(storedNumber), Number(lowerScreenNumber)));

    if(!pressedEquals){
        storedNumber = answer;
        lowerScreenNumber = '';  
        setEquation(storedNumber, getOpSymbol(op), lowerScreenNumber, pressedEquals);
    }else{
        setEquation(storedNumber, getOpSymbol(op), lowerScreenNumber, pressedEquals);
        lowerScreenNumber = answer;
        storedNumber = answer;
    }
    op = nothing;
}

store = function(){
    storedNumber = lowerScreenNumber;
    lowerScreenNumber = '';
}

clearAll = function(){ 
    storedNumber = '';
    lowerScreenNumber = ''; 
    equation = '';
    op = nothing;
}

clearCurrent = function(){
    lowerScreenNumber = ''; 
}

setOperator = function(func){
    if(storedNumber == ''){
        store();
    }else if(lowerScreenNumber != ''){
        operate();
    }
    op = func;
    setEquation(storedNumber, getOpSymbol(op), lowerScreenNumber);
}

setSign = function(){
    if(lowerScreenNumber[0] != '-'){
        lowerScreenNumber = '-' + lowerScreenNumber;
    }else{
        lowerScreenNumber = lowerScreenNumber.slice(1);
    }
}

getOpSymbol = function(func){
    if(func == add){return ' + '};
    if(func == subtract){return ' - '};
    if(func == multiply){return ' x '};
    if(func == divide){return ' / '};
    return '';
}

setEquation = function(a = '', symbol = '', b = '', showEquals = false){ 
    equation = a + symbol + b;
    if(showEquals){
        equation += ' = ';
    }
}

logMemory = function(){
    console.log("lsn = " + lowerScreenNumber + "\nstrd = " + storedNumber + "\neq = " + equation + "\nop = ", op);
}

buildNumber = function(digit){
    lowerScreenNumber += digit;
}

deleteDigit = function(){
    lowerScreenNumber = lowerScreenNumber.slice(0,-1);
}

