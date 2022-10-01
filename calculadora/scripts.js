var botoes = document.querySelectorAll(".calc_botao"); // Guarda os elementos dos botões de números
var botoesOp = document.querySelectorAll(".calc_botao_op"); // Guarda os elementos dos botões de operadores
var botaoRes = document.querySelector(".calc_botao_res"); // Guarda o elemento do botão de resposta
var botoesFun = document.querySelectorAll(".calc_botao_fun"); // Guarda os elementos dos botões de função
var resposta = document.querySelector("#res"); // Guarda o elemento do input
var lastResposta = document.querySelector("#lres"); // Guarda o elemento do input
var num = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]; // Array para guardar os somente números 
var virgula = false;
var operacoes = [];
var operadores = [];
var tempResultado = null;
var continuar;
var conta;

function digitar(n, origem){
    if(tempResultado == resposta.value && n == "."){
        return
    }
    if(resposta.value == "0" && origem != "botao"){
        return
    }
    if(origem == "resultado"){
        tempResultado = n;
    }
    if(n == "." && virgula == false){
        resposta.value = resposta.value + n;
        virgula = true;
    }
    if(n in num){
        if(tempResultado == null){
            resposta.value = resposta.value + n;
        }
        if(tempResultado != null && origem == "botao"){
            lastResposta.value = lastResposta.value + tempResultado;
            resposta.value = n;
            tempResultado = null;
        }
    }
    if(resposta.value.length > 1 && resposta.value[0] == "0"){
        if(n != "." && !(resposta.value.includes("0."))){
            resposta.value = resposta.value[1];
        }
        else{
            if(resposta.value.includes("0.")){
                continuar = null;
            }
            else{
                resposta.value = "0.";
            }
        }
    }
    if(n == "c"){
        resposta.value = "0";
        virgula = false;
    }
    if(resposta.value[0] == "0" && resposta.value != "."){
        if(resposta.value[1] == "0"){
            resposta.value = "0";
        }
        if(n != "0" && n != "c"){
            continuar = null;
        }
        if(resposta.length == 1){
            virgula = false;
        }
    }
    if(n == "ce"){
        tempResultado = null;
        operacoes = [];
        operadores = [];
        lastResposta.value = "";
        digitar("c");
        digitar("x", "resetVirgula");
    }
    if(n == "bk"){
        if(resposta.value.length == 1 && resposta.value[0] == "0"){
            return
        }
        if(resposta.value.includes(".") && resposta.value[resposta.value.length - 1] == "."){
            return
        }
        resposta.value = resposta.value.substring(0, resposta.value.length - 1);
        if(resposta.value == ""){
            resposta.value = "0";
        }
    }
    if(resposta.value.length <= 2 && resposta.value[0] == "0"){
        digitar("x", "resetVirgula");
    }
    if(origem == "resetVirgula"){
        virgula = false;
    }
}

function op(o){
    digitar("x", "resetVirgula");
    if(resposta.value == ""){
        continuar = null;
    }
    else{
        if(tempResultado == resposta.value){
            lastResposta.value = lastResposta.value.split("= ")[1];
            operacoes = [];
            tempResultado = null;
        }
        else{
            if(lastResposta.value.includes(" = ")){
                lastResposta.value = ""
                operacoes = [];
            }
        }
        if(o == "+"){
            operacoes.push(resposta.value);
            operadores.push("+");
            lastResposta.value = lastResposta.value + resposta.value + " + ";
            resposta.value = "0";
        }
        if(o == "-"){
            operacoes.push(resposta.value);
            operadores.push("-");
            lastResposta.value = lastResposta.value + resposta.value + " - ";
            resposta.value = "0";
        }
        if(o == "x"){
            operacoes.push(resposta.value);
            operadores.push("x");
            lastResposta.value = lastResposta.value + resposta.value + " x ";
            resposta.value = "0";
        }
        if(o == "/"){
            operacoes.push(resposta.value);
            operadores.push("/");
            lastResposta.value = lastResposta.value + resposta.value + " ÷ ";
            resposta.value = "0";
        }
        if(o == "%"){
            operacoes.push(resposta.value);
            operadores.push("%");
            lastResposta.value = lastResposta.value + resposta.value + " % ";
            resposta.value = "0";
        }
    }
    if (lastResposta.value.length > 25){
        for(i = lastResposta.value.length; i > 25; i--){
            lastResposta.value = lastResposta.value.substring(1, lastResposta.value.length);
        }
        lastResposta.value = "..." + lastResposta.value;
    }
}

function resultado(){
    if(operacoes.length < 1 || (lastResposta.value.includes("=") && operacoes.length < 3)){
        return
    }
    digitar("x", "resetVirgula");
    var resultado = 0;
    operacoes.push(resposta.value);
    lastResposta.value = lastResposta.value + resposta.value;
    for(i = 0; i < operacoes.length; i++){
        if(i == 0){
            if(operadores[i] == "+"){
                resultado = parseFloat(operacoes[i]) + parseFloat(operacoes[i + 1]);
            }
            if(operadores[i] == "-"){
                resultado = parseFloat(operacoes[i]) - parseFloat(operacoes[i + 1]);
            }
            if(operadores[i] == "x"){
                resultado = parseFloat(operacoes[i]) * parseFloat(operacoes[i + 1]);
            }
            if(operadores[i] == "/"){
                resultado = parseFloat(operacoes[i]) / parseFloat(operacoes[i + 1]);
            }
            if(operadores[i] == "%"){
                resultado = parseFloat(operacoes[i]) % parseFloat(operacoes[i + 1]);
            }
        }
        else{
            if(operadores[i] == "+"){
                if(operadores[i] == "+"){
                    resultado = resultado + parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "-"){
                    resultado = resultado - parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "x"){
                    resultado = resultado * parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "/"){
                    resultado = resultado / parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "%"){
                    resultado = resultado / parseFloat(operacoes[i + 1]);
                }
            }
            if(operadores[i] == "-"){
                if(operadores[i] == "+"){
                    resultado = resultado + parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "-"){
                    resultado = resultado - parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "x"){
                    resultado = resultado * parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "/"){
                    resultado = resultado / parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "%"){
                    resultado = resultado / parseFloat(operacoes[i + 1]);
                }
            }
            if(operadores[i] == "x"){
                if(operadores[i] == "+"){
                    resultado = resultado + parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "-"){
                    resultado = resultado - parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "x"){
                    resultado = resultado * parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "/"){
                    resultado = resultado / parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "%"){
                    resultado = resultado / parseFloat(operacoes[i + 1]);
                }
            }
            if(operadores[i] == "/"){
                if(operadores[i] == "+"){
                    resultado = resultado + parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "-"){
                    resultado = resultado - parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "x"){
                    resultado = resultado * parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "/"){
                    resultado = resultado / parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "%"){
                    resultado = resultado / parseFloat(operacoes[i + 1]);
                }
            }
            if(operadores[i] == "%"){
                if(operadores[i] == "+"){
                    resultado = resultado + parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "-"){
                    resultado = resultado - parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "x"){
                    resultado = resultado * parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "/"){
                    resultado = resultado / parseFloat(operacoes[i + 1]);
                }
                if(operadores[i] == "%"){
                    resultado = resultado / parseFloat(operacoes[i + 1]);
                }
            }
        }
    }
    lastResposta.value = lastResposta.value + " = ";
    resposta.value = resultado;
    digitar(resultado, "resultado");
    operadores = [];
}