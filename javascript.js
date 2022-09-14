const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;
const nothing = (a, b) => a;

window.addEventListener('click',(event) => {
    updateScreen();
    console.log("click");
})

const upperScreen = document.getElementById("upper");
const lowerScreen = document.getElementById("lower");

var active = '';
var stored = '';
var op = nothing;

updateScreen = function(){
    lowerScreen.textContent = active;
    upperScreen.textContent = stored;
}

operate = function(){
    stored = String(op(Number(stored), Number(active)));
    console.log("ans = ", active);
    op = nothing;
}

storeActive = function(){
    stored = active;
    active = '';
}

clearAll = function(){ 
    stored = '';
    active = ''; 
    result = '';
    op = nothing;
}

clearCurrent = function(){
    active = ''; 
}

setOperator = function(func){
    if(stored == ''){
        storeActive();
    }else if(active != ''){
        operate();
    }
    op = func;
    console.log("op = ", op);
}

setSign = function(){
    if(active[0] != '-'){
        active = '-' + active;
    }else{
        active = active.slice(1);
    }
}

buildNumber = function(digit){
    active += digit;
    console.log(active);
}

deleteDigit = function(){
    active = active.slice(0,-1);
}

