var readoutElement = document.querySelector(".readout");
var digitsElementArray = document.querySelectorAll(".number");

var operatorsElementArray = document.querySelectorAll(".operator");

var evaluateElement = document.querySelector(".evaluate");

var clearElement = document.querySelector(".clear");

var a = undefined;
var b = undefined;
var overwrite = true;
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
                // readoutElement.innerText = "0";
                overwrite = true;
            } else{
                b = Number(readoutElement.innerText);
                readoutElement.innerText = operators[operator](a, b);
                a = operators[operator](a, b);
                b = undefined;
                overwrite = true;
            }

            operator = this.getAttribute("data-operator");
        });
    });

    evaluateElement.addEventListener("click", function(){
        b = Number(readoutElement.innerText);

        if(a !== undefined && b !== undefined){
            readoutElement.innerText = operators[operator](a, b);
            a = undefined;
            b = undefined;
            overwrite = true;
        }
    });

    clearElement.addEventListener("click", function(){
        readoutElement.innerText = "0";
        a = undefined;
        b = undefined;
        overwrite = true;
        operator = undefined;
    });
}

init();