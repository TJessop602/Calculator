add = (a, b) => a + b;
multiply = (a, b) => a * b;
subtract = (a, b) => a - b;
divide = (a, b) => a / b;
nothing = (a, b) => a;

var a = '';
var b = '';
var op = nothing;

operate = function(){
    a = String(op(Number(a), Number(b)));
    console.log("ans = ", a);
    op = nothing;
    b = '';
}

clearAll = function(){
    a = '';
    b = '';
    op = nothing;

}

clearCurrent = function(){
    console.log("op = ", op);
    if(op != nothing){
        b = '';
        console.log("b = ", b);
    }else{
        a = '';
        console.log("a = ", a);
    }
}

setOperator = function(func){
    op = func;
    if(b != ''){
        operate();
    }
}

setSign = function(){
    if(op != nothing){
        if(b[0] != '-'){
            b = '-' + b;
        }else{
            b = b.slice(1);
        }
    }else{
        if(a[0] != '-'){
            a = '-' + a;
        }else{
            a = a.slice(1);
        }
    }
}

buildNumber = function(digit){
    if(op != nothing){
        b += digit;
    }else{
        a += digit;
    }
}

deleteDigit = function(){
    if(op != nothing){
        b = b.slice(0,-1);
    }
    else{
        a = a.slice(0,-1);
    }
}

