const add = (a, b) => a + b;
const multiply = (a, b) => a * b;
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;
const nothing = (a, b) => a;

operate = function(){
    a = op(a, b);
    console.log("ans = ", parseFloat(a.toFixed(4)));
    op = nothing;
    b = null;
    decimalPlaces = 0;
}

setOperator = function(func){
    op = func;
    decimalPlaces = 0;
    if(b != null){
        operate();
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
        console.log("b = ", b);
    }else{
        if(decimalPlaces == 0){
            a = 10*a + digit;
        }else{
            a = a + digit * 10**(-decimalPlaces)
            decimalPlaces += 1;
        }
        console.log("a = ", a);
    }
}

var a = 0;
var b = null;
var op = nothing;
var decimalPlaces = 0;