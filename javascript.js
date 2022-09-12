const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;
const nothing = (a, b) => a;

operate = function(){
    a = op(aSign*a, bSign*b);
    console.log("ans = ", parseFloat(a.toFixed(4)));
    op = nothing;
    b = null;
    bSign = 1;
    decimalPlaces = 0;
}

clearAll = function(){
    a = 0;
    aSign = 1;
    b = null;
    bSign = 1;
    op = nothing;
    decimalPlaces = 0;
}

clearCurrent = function(){
    decimalPlaces = 0;
    console.log("op = ", op);
    if(op != nothing){
        b = 0;
        bSign = 1;
        console.log("b = ", b);
    }else{
        a = 0;
        aSign = 1;
        console.log("a = ", a);
    }
}

setOperator = function(func){
    op = func;
    decimalPlaces = 0;
    if(b != null){
        operate();
    }
}

setSign = function(){
    if(op != nothing){
        bSign *= -1;
    }else{
        aSign *= -1;
    }
}

startDecimal = function(){
    decimalPlaces = decimalPlaces==0 ? 1:decimalPlaces;
}

buildNumber = function(digit){
    if(op != nothing){
        if(decimalPlaces == 0){
            b = 10*b + digit;
        }else{
            b = b + digit * 10**(-decimalPlaces)
            decimalPlaces += 1;
        }
        console.log("b = ", bSign*b);
    }else{
        if(decimalPlaces == 0){
            a = 10*a + digit;
        }else{
            a = a + digit * 10**(-decimalPlaces)
            decimalPlaces += 1;
        }
        console.log("a = ", aSign*a);
    }
}

deleteDigit = function(){
    if(op != nothing){
        if(decimalPlaces == 0){
            b = Math.floor(b/10);
        }else{
            b = Math.floor(b*10)/10
            decimalPlaces -= 1;
        }
        console.log("b = ", bSign*b);
    }
    else{
        if(decimalPlaces == 0){
            a = Math.floor(a/10);
        }else{
            a = Math.floor(a*10)/10
            decimalPlaces -= 1;
        }
        console.log("a = ", aSign*a);
    }
}

var a = 0;
var aSign = 1;
var b = null;
var bSign = 1;
var op = nothing;
var decimalPlaces = 0;
var previousResult = 0;