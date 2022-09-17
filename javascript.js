const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
const divide = (a, b) => {
                        if(b == 0){error("Zero Divisor")}
                        else{return a / b};
                        }
const nothing = (a, b) => a;

const upperScreen = document.getElementById("upper");
const lowerScreen = document.getElementById("lower");

const charLimit = 12;

var lowerScreenNumber = '';
var storedNumber = '';
var equation = '';
var op = nothing;

var equalsState = false;                                                                           //was the last button pressed equals?
var errorState = false;                                                                            //are we waiting for the user to clear an error?

window.addEventListener('click',(event) => {
    if(!errorState){
        updateScreen();                                                                            //if in errorState, no on-click updates will occur until clearAll is pressed
        logMemory();
    }
})

updateScreen = function(){
    lowerScreen.textContent = lowerScreenNumber;                                               
    upperScreen.textContent = equation;
}

operate = function(pressedEquals = false){
    let answer = (op(Number(storedNumber), Number(lowerScreenNumber)));                            //perform whatever operation is stored in op
    answer = String(parseFloat((answer).toFixed(charLimit-2)));                                    //round decimals to fit to screen
    if(answer.length > charLimit){
        error("Too Long");
    }else{
        if(pressedEquals && equalsState == true){
            return;                                                                                //Equals was previously pressed and was pressed again. Do nothing.
        }else if(pressedEquals){
            setEquation(storedNumber, getOpSymbol(op), lowerScreenNumber, pressedEquals);          //if equals was pressed display answer below and equation above and set eq state.
            lowerScreenNumber = answer;
            storedNumber = answer;                                                                 //we need this is user wants to use answer as input for next calculation
            equalsState = true;
        }else{
            storedNumber = answer;                                                                 //if another op button was pressed store input, update equation with partial answer and await the next number
            lowerScreenNumber = '';  
            setEquation(storedNumber, getOpSymbol(op), lowerScreenNumber, pressedEquals);
        }
        op = nothing;
    }
}

error = function(msg){
    equation = "ERROR";                                                                             //replace screen display with error message and set errorState
    lowerScreenNumber = msg;
    errorState = true;
    updateScreen();                                                                                 //since we are in errorState, screen must be updated manually.
}

clearAll = function(){ 
    storedNumber = '';
    lowerScreenNumber = ''; 
    equation = '';
    op = nothing;
    errorState = false;
    equalsState = false;
    updateScreen();                                                                                 //since we were in an errorState when the button was pressed a manual update is still required
}

store = function(){
    storedNumber = lowerScreenNumber;
    lowerScreenNumber = '';
}

setOperator = function(func){
    equalsState = false;                                                                            //equals was pressed but user wants to use the answer as input for the next calculation. 
    if(storedNumber == ''){                                                                         //if we don't have a stored value, store input and await further input
        store();
    }else if(lowerScreenNumber != ''){                                                              //If we have all the information to perform a calculation then we should do it before changing the operator
        operate();                                                                                  //Note: if equals was pressed the stored number is the previous answer, otherwise it is whatever the user input.
    }
    op = func;                                                                                      //Set the operator
    setEquation(storedNumber, getOpSymbol(op), lowerScreenNumber);
}

setSign = function(){
    if(equalsState){                                                                                //if this function is called while in equalsState, start a new calculation.
        clearAll();
    }
    if(lowerScreenNumber[0] != '-'){                                                                //if a - sign is not present, add one.
        lowerScreenNumber = '-' + lowerScreenNumber;
    }else{
        lowerScreenNumber = lowerScreenNumber.slice(1);                                             //else if a - sign is present, remove it.
    }
}

buildNumber = function(digit){
    if(equalsState){                                                                                //if this function is called while in equalsState, start a new calculation.
        clearAll();
    }
    if(lowerScreenNumber.length <= charLimit){
        lowerScreenNumber += digit;
    }else{
        error("Too Long");
    }
}

deleteDigit = function(){
    lowerScreenNumber = lowerScreenNumber.slice(0,-1);
}

setEquation = function(a = '', symbol = '', b = '', showEquals = false){ 
    equation = a + symbol + b;
    if(showEquals){
        equation += ' = ';
    }
}

getOpSymbol = function(func){
    if(func == add){return ' + '};
    if(func == subtract){return ' - '};
    if(func == multiply){return ' x '};
    if(func == divide){return ' / '};
    return '';
}

logMemory = function(){
    console.log("lsn = " + lowerScreenNumber + "\nstrd = " + storedNumber + "\neq = " + equation + "\nop = " + op + "\ne = " + errorState);     //for testing purposes
}



