const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
const divide = (a, b) => {
                        if(b == 0){error("Zero Divisor")}
                        else{return a / b};
                        }
const nothing = (a, b) => b;

const upperScreen = document.getElementById("upper");
const lowerScreen = document.getElementById("lower");

const charLimit = 12;

var upperScreenDisplay = '';
var lowerScreenDisplay = '';
var storedNumber = '';
var op = nothing;

var lastPressEquals = false;                                                                       //was the last button pressed equals?
var errorState = false;                                                                            //are we waiting for the user to clear an error?

window.addEventListener('click',(event) => {
    if(!errorState){
        updateScreen();                                                                            //if in errorState, no automatic updates will occur
        logMemory();
    }
})

updateScreen = function(){
    lowerScreen.textContent = lowerScreenDisplay;                                               
    upperScreen.textContent = upperScreenDisplay;
}

operate = function(pressedEquals = false){
    let answer = (op(Number(storedNumber), Number(lowerScreenDisplay)));                            //perform whatever operation is stored in op
    let nBeforeDecimal = (answer.toFixed(0)).length;                         
    answer = String(parseFloat((answer).toFixed(Math.max(0,charLimit-nBeforeDecimal-1))));          //round decimals to fit to screen
    if(answer.length > charLimit){
        error("Too Long");
    }else{
        if(pressedEquals && lastPressEquals == true){
            return;                                                                                //Equals was previously pressed and was pressed again. Do nothing.
        }else if(pressedEquals){
            setEquation(storedNumber, getOpSymbol(op), lowerScreenDisplay, pressedEquals);         //if equals was pressed display answer below and upperScreenDisplay above and set eq state.
            lowerScreenDisplay = answer;
            storedNumber = answer;                                                                 //we need this is user wants to use answer as input for next calculation
            lastPressEquals = true;
        }else{
            storedNumber = answer;                                                                 //if another op button was pressed store input, update upperScreenDisplay with partial answer and await the next number
            lowerScreenDisplay = '';  
            setEquation(storedNumber, getOpSymbol(op), lowerScreenDisplay, pressedEquals);
        }
        op = nothing;
    }
}

error = function(msg){
    upperScreenDisplay = "ERROR";                                                                   //replace screen display with error message and set errorState
    lowerScreenDisplay = msg;
    errorState = true;
    updateScreen();                                                                                 //since we are in errorState, screen must be updated manually.
}

clearCurrent = function(){
    if(lastPressEquals){
        clearAll();
    }else{
        lowerScreenDisplay = '';
    }
}

clearAll = function(){ 
    storedNumber = '';
    lowerScreenDisplay = ''; 
    upperScreenDisplay = '';
    op = nothing;
    errorState = false;
    lastPressEquals = false;
    updateScreen();                                                                                 //since we were in an errorState when the button was pressed a manual update is still required
}

store = function(){
    storedNumber = lowerScreenDisplay;
    lowerScreenDisplay = '';
}

setOperator = function(func){
    lastPressEquals = false;                                                                        //equals was pressed but user wants to use the answer as input for the next calculation. 
    if(storedNumber == ''){                                                                         //if we don't have a stored value, store input and await further input
        store();
    }else if(lowerScreenDisplay != ''){                                                              //If we have all the information to perform a calculation then we should do it before changing the operator
        operate();                                                                                              //Note: if equals was pressed the stored number is the previous answer, otherwise it is whatever the user input.
    }
    op = func;                                                                                      //Set the operator
    setEquation(storedNumber, getOpSymbol(op), lowerScreenDisplay);
}

setSign = function(){
    if(lastPressEquals){                                                                             //if this function is called while lastPressEquals, start a new calculation.
        clearAll();
    }
    if(lowerScreenDisplay[0] != '-'){                                                                //if a - sign is not present, add one.
        lowerScreenDisplay = '-' + lowerScreenDisplay;
    }else{
        lowerScreenDisplay = lowerScreenDisplay.slice(1);                                            //else if a - sign is present, remove it.
    }
}

buildNumber = function(digit){
    if(lastPressEquals){                                                                                //if this function is called while lastPressEquals, start a new calculation.
        clearAll();
    }
    if(lowerScreenDisplay.length >= charLimit || (digit == '.' && lowerScreenDisplay.includes('.'))){   //only add digits if we have space. This isn't specially indicated to the user since it should be obvious
        return;                                                                                                 //that no further numbers are being added. Maybe add some indication?
    }else{
        lowerScreenDisplay += digit;   
    }
}

deleteDigit = function(){
    lowerScreenDisplay = lowerScreenDisplay.slice(0,-1);
}

setEquation = function(a = '', symbol = '', b = '', showEquals = false){ 
    if(a.slice(-1) == '.'){a = a.slice(0,-1)}                                                           //remove extrainious decimal points.
    if(b.slice(-1) == '.'){b = b.slice(0,-1)}
    upperScreenDisplay = a + symbol + b;
    if(showEquals){
        upperScreenDisplay += ' = ';
    }
}

getOpSymbol = function(func){
    if(func == add){return ' + '};
    if(func == subtract){return ' - '};
    if(func == multiply){return ' x '};
    if(func == divide){return ' / '};
    return '';
}

getOpName = function(opSymbol){
    if(opSymbol == '+'){return add};
    if(opSymbol == '-'){return subtract};
    if(opSymbol == '*'){return multiply};
    if(opSymbol == '/'){return divide};
    return nothing;
}

window.addEventListener("keypress", function(e) {                                                        //keyboard input functionality
    if (e.key >= "0" && e.key <= "9"){
        buildNumber(e.key);
    }else if(e.key == '-' && (lowerScreenDisplay == '' || lowerScreenDisplay == '-')){                  //since - means both minus and negative we have so ambiguity. We will take it as negative if
        setSign();                                                                                          //the lower screen is blank or contains only a - sign and minus in all other cases.
    }else if(e.key == '+' || e.key == '-' || e.key == '*' || e.key == '/'){
        setOperator(getOpName(e.key));
    }else if(e.key == '=' || e.key == 'Enter'){
        operate(true);
    }
    updateScreen();
  }, true);

logMemory = function(){
    console.log("ls = " + lowerScreenDisplay + "\nstrd = " + storedNumber + "\nus = " + upperScreenDisplay + "\nop = " + op + "\ne = " + errorState);     //for testing purposes
}



