var readoutElement = document.querySelector(".readout");
var digitsElementArray = document.querySelectorAll(".number");

var operatorsElementArray = document.querySelectorAll(".operator");

var evaluateElement = document.querySelector(".evaluate");

var clearElement = document.querySelector(".clear");

var a = undefined;
var b = undefined;
var overwrite = true;
var isEndOfExpression = false;
var operator = undefined;

var operators = {
    add: function(a, b){
        return a + b;
    },

    subtract: function(a, b){
        return a - b;
    },

    multiply: function(a, b){
        return a * b;
    },

    divide: function(a, b){
        return a / b;
    }
};

function init(){
    digitsElementArray.forEach(function(digitElement){
        digitElement.addEventListener("click", function(){
            if(overwrite){
                readoutElement.innerText = this.innerText;
                overwrite = false;
            } else {
                readoutElement.innerText += this.innerText;
            }

        });
    });

    operatorsElementArray.forEach(function(operatorElement){
        operatorElement.addEventListener("click", function(){
            if(a === undefined){
                a = Number(readoutElement.innerText);
                readoutElement.innerText = "0";
                overwrite = true;
            } else{
                b = Number(readoutElement.innerText);
                readoutElement.innerText = operators[operator](a, b);
                a = operators[operator](a, b);
                isEndOfExpression = false;
                b = undefined;
                overwrite = true;
            }

            operator = this.getAttribute("data-operator");
        });
    });

    evaluateElement.addEventListener("click", function(){
        b = Number(readoutElement.innerText);
        readoutElement.innerText = operators[operator](a, b);
        a = undefined;
        b = undefined;
        overwrite = true;
        isEndOfExpression = true;
    });

    clearElement.addEventListener("click", function(){
        readoutElement.innerText = "0";
        a = undefined;
        b = undefined;
        overwrite = true;
        isEndOfExpression = false;
        operator = undefined;
    });
}

init();
