var readoutElement = document.querySelector(".readout");
var equationElement = document.querySelector(".equation");

var digitsElementArray = document.querySelectorAll(".number");
var operatorsElementArray = document.querySelectorAll(".operator");
var evaluateElement = document.querySelector(".evaluate");
var invertElement = document.querySelector(".invert");
var clearElement = document.querySelector(".clear");

var a = undefined;
var b = undefined;
var overwrite = true;
var operator = undefined;
var enableOperator = true;
var currentOperator = "";

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
    },

    percentage: function(a, b){
        return a * 100 / b;
    }
};

function init(){
    digitsElementArray.forEach(function(digitElement){
        digitElement.addEventListener("click", function(){
            if(overwrite || readoutElement.innerText === '0'){
                readoutElement.innerText = this.innerText;
                overwrite = false;
                if (a !== undefined){
                    equationElement.innerText = a + " " + currentOperator + " ";
                }
            } else {
                readoutElement.innerText += this.innerText;
            }
            enableOperator = true;
        });
    });

    operatorsElementArray.forEach(function(operatorElement){
        operatorElement.addEventListener("click", function(){
            if(enableOperator){
                if(a === undefined){
                    a = Number(readoutElement.innerText);

                    equationElement.innerHTML = a + " ";
                    equationElement.innerHTML += this.innerText + " ";
                } else{
                        b = Number(readoutElement.innerText);
                        readoutElement.innerText = operators[operator](a, b);
                        equationElement.innerText = a + " " + currentOperator + " " + b;
                        a = operators[operator](a, b);
                        b = undefined;
                }
                enableOperator = false;
            }
            else {
                equationElement.innerText = a + " " + this.innerText + " ";
            }

            overwrite = true;
            operator = this.getAttribute("data-operator");
            currentOperator = this.innerText;
        });
    });

    evaluateElement.addEventListener("click", function(){
        b = Number(readoutElement.innerText);

        if(a !== undefined && b !== undefined){
            readoutElement.innerText = operators[operator](a, b);
            equationElement.innerText = a + " " + currentOperator + " " + b;
            a = undefined;
            b = undefined;
            overwrite = true;
        }
    });

    invertElement.addEventListener("click", function(){
        var readout = readoutElement.innerText;
        if (readout.slice(0, 1) == "-"){
            readoutElement.innerText = readout.slice(1, readout.length);
        } else{
            readoutElement.innerText = "-" + readoutElement.innerText;
        }

    });

    clearElement.addEventListener("click", function(){
        readoutElement.innerText = "0";
        equationElement.innerHTML = "&nbsp";
        a = undefined;
        b = undefined;
        overwrite = true;
        operator = undefined;
    });
}

init();
