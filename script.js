class Calculator {
    constructor(previousOperandTextE, currentOperandTextE) {
        this.previousOperandTextE = previousOperandTextE
        this.currentOperandTextE = currentOperandTextE
        this.clear()
    } 

    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }
    //delete for single key
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNum(number) {
        if (number === '.' && this.currentOperand.includes('.')) 
            return
        this.currentOperand = this.currentOperand.toString() + number.toString()
        // this.previousOperand = number
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') 
            return
        if (this.previousOperand !== '') {
            this.compute()
        }

        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    //return a single value on display screen
    compute() {
        let computation 
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current))
            return
        switch(this.operation) {
            case '+': 
                computation = prev + current
                break;
            case '-': 
                computation = prev - current
                break;
            case 'x': 
                computation = prev * current
                break;
            case '/': 
                computation = prev / current
                break;
            default: 
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        } 
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextE.innerText = this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextE.innerText = `${this.previousOperand} ${this.operation}`
        } else {
            this.previousOperandTextE.innerText = ''
        }
    }
}

const $$ = document.querySelectorAll.bind(document)
const $ = document.querySelector.bind(document)

const numberBtns = $$('[data-number]')
const operationBtns = $$('[data-operation]')
const deleteBtn = $('[data-clear-entry]')
const allClearBtn = $('[data-clear-all]')
const equalBtn = $('[data-equal]')

const previousOperandTextE = $('[data-previous-operand]')
const currentOperandTextE = $('[data-current-operand]')

const calculator = new Calculator(previousOperandTextE, currentOperandTextE)

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalBtn.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearBtn.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteBtn.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})
