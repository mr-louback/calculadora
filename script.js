'use strict';
const display = document.getElementById('display')
const numbers = document.querySelectorAll('[id*=tecla]')
const operators = document.querySelectorAll('[id*=operador]')

let numberNew = true
let operator;
let lastNumber;

const operationPending = () => operator !== undefined
function calculate() {
    if (operationPending()) {
        const AtualNumber = parseFloat(display.textContent.replace(',', '.'))
        numberNew = true
        if (operator == '+') {
            updateDisplay(lastNumber + AtualNumber)
        } else if (operator == '-') {
            updateDisplay(lastNumber - AtualNumber)
        } else if (operator == '*') {
            updateDisplay(lastNumber * AtualNumber)
        } else if (operator == '/') {
            updateDisplay(lastNumber / AtualNumber)
        }
    }
}

const updateDisplay = (txt) => {
    if (numberNew) {
        display.textContent = txt.toLocaleString('PT-BR')
        numberNew = false
    } else {
        display.textContent += txt.toLocaleString('PT-BR')

    }

}
function insertNumber(e) {
    return updateDisplay(e.target.textContent)
}

numbers.forEach(number =>
    number.addEventListener('click', insertNumber)
)

function selectOperator(e) {
    if (!numberNew) {
        calculate()
        numberNew = true
        operator = e.target.textContent
        lastNumber = parseFloat(display.textContent.replace(',', '.'))
    }
}
operators.forEach(operator =>
    operator.addEventListener('click', selectOperator)
)

function activeIqual() {
    calculate()
    operator = undefined
}
document.getElementById("igual").addEventListener('click', activeIqual)

function cleanDisplay() {
    display.textContent = ''
}
document.getElementById("limparDisplay").addEventListener('click', cleanDisplay)

function cleanCalculate() {
    cleanDisplay()
    operator = undefined
    numberNew = true
    lastNumber = undefined
}

document.getElementById("limparCalculo").addEventListener('click', cleanCalculate)


function removeLastNumber() {
    display.textContent = display.textContent.slice(0, -1)
}

document.getElementById("backSpace").addEventListener('click', removeLastNumber)

function decimal() {
    return display.textContent.indexOf(',') !== -1
}
function existValue() {
    return display.textContent.length > 0
}

function insertDecimal() {
    if (!decimal()) {
        if (existValue()) {
            updateDisplay(',')
        } else {
            updateDisplay('0,')
        }
    }
}
document.getElementById("decimal").addEventListener('click', insertDecimal)
const keyMap = {
    'c': 'limparDisplay',
    'Escape': 'limparCalculo',
    'Backspace': 'backSpace',
    'Enter': 'igual',
    '/': 'operadorDivisao',
    '*': 'operadorMultiplicacao',
    '-': 'operadorSubtracao',
    '+': 'operadorAdicao',
    ',': 'decimal',
    '0': 'tecla0',
    '1': 'tecla1',
    '2': 'tecla2',
    '3': 'tecla3',
    '4': 'tecla4',
    '5': 'tecla5',
    '6': 'tecla6',
    '7': 'tecla7',
    '8': 'tecla8',
    '9': 'tecla9',
}
function mapKeys(e) {
    const keyButton = e.key
    function keyAvailable() {
        return Object.keys(keyMap).indexOf(keyButton) !== -1
    }
    if (keyAvailable()) {
        document.getElementById(keyMap[keyButton]).click()        
    }
}

document.addEventListener('keydown', mapKeys)