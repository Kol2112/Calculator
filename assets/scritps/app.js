const body = document.querySelector('.calc-body');
const usrInput = document.querySelector('input');
const operationResult = document.querySelector('.operationResult');
const loggedOperationListBtn = document.querySelector('.operationHisListBtn');
const loggedOperationList = document.querySelector('#loggedOperation');
const numBtn = document.querySelectorAll('.num');
const subBtn = document.querySelector('.submit');
const mathResult = document.querySelector('.math');
const clear = document.querySelector('.clear');
const backspace = document.querySelector('.backspace');
const button = document.querySelectorAll('.btn'); 
let operationHistory = [];
//   TO KURWA DO
//Stworzenie wrzucającej operacje to operationHis i w inputcie wyświetlającej wynik wykonywanej operacji
//Zrobienie walidacji kolejności oraz ilości nawiasów
class MemoryManagment{
    constructor(){
    }

    //Funkcja czyszcząca kalkulator (z historii operacji oraz inputa)
    clearCalculator(){
        operationHistory = [];
        usrInput.value = '';
        operationResult.textContent ='';
    }


    //Funkcja obsługująca przycisk backspace na klawiaturze kalkulatora
    undoValue(){
        let newArr = usrInput.value.split('');
        newArr.pop();
        usrInput.value = newArr.join('');
    }

}


class CalcManagment extends MemoryManagment{
    
    constructor() {
        super();
    }   
    inputHandler(event){
        usrInput.value = usrInput.value
            .replace(/[^0-9+\-*/()^\.]/g, '') //Usuwa nielegalne znaki
            .replace(/([+\-*/^]){2,}/g, '$1') //Zezwala tylko na pojedyńczy operator
            .replace(/^([+*/^\.])/g, '') //Zezwala tylko na minus na poczatku działania
            .replace(/(\d*\.\d*)\./g, '$1') //Usuwa wielokrotne kropki
            .replace(/([+\-*/^])\./g, '$1'); //Usuwa kropke przed cyfrą
        if(event.key == 'Enter')
            {   //Wykonywanie operacji poprzez naciśnięcie entera na klawiaturze
                this.mathOperation();
            };
    }
    bracketVerify() {
        const str = usrInput.value;
        let stack = [];

        for (let char of str) {
            if (char === '(') {
                stack.push(char);
            } else if (char === ')') {
                if (stack.length === 0 || stack.pop() !== '(') {
                    return false;
                }
            }
        }
        return stack.length === 0;
    }
    //Wykonywanie operacji | uzupełnianie historii
    logOperationHandler(){
        if(usrInput.value){
            operationHistory.push(usrInput.value.replace(/([+\-*/^\.])(?=$)/, ''));
        }
    }
    mathOperation(){
        if (!this.bracketVerify()) {
            alert("Błąd: Nieprawidłowe nawiasy!");
            return;
        }
        let result = eval(usrInput.value.replace(/([+\-*/^\.])(?=$)/, ''));//Usuwa pusty operator na końcu
        this.logOperationHandler();
        operationResult.textContent = usrInput.value;
        usrInput.value = result;
    };
    showOperationsLogs(){
        loggedOperationList.style.display='block';
        mathResult.style.display='none';
        body.style.gridTemplateRows= "10% calc(100% - 10%)";
        usrInput.style.marginTop='1rem';
        for(let i=0; i<button.length; i++){
            button[i].style.display='none';
        }
        operationHistory.forEach((el)=>{
            const p = document.createElement('p');
            loggedOperationList.append(p);
            p.textContent=el;
        })
    }
    closeOperationsLogs(){
        loggedOperationList.style.display='none';
        mathResult.style.display='';
        body.style.gridTemplateRows= "auto";
        usrInput.style.marginTop='';
        for(let i=0; i<button.length; i++){
            button[i].style.display='';
        }
        operationHistory.forEach(()=>{
            loggedOperationList.innerHTML='';
        })
    }
}




class Rendering extends CalcManagment{
    constructor(){
        
        super()

        this.render();
    }
    render(){
        const calc = new CalcManagment();


        numBtn.forEach(button => button.addEventListener('click', ()=>{
            const fixedInput =usrInput.value
            .replace(/[^0-9+\-*/()^\.]/g, '') //Usuwa nielegalne znaki
            .replace(/([+\-*/^]){2,}/g, '$1') //Zezwala tylko na pojedyńczy operator
            .replace(/^([+*/^\.])/, '') //Zezwala tylko na minus na poczatku działania
            .replace(/(\d*\.\d*)\./g, '$1') //Usuwa wielokrotne kropki
            .replace(/([+\-*/^])\./g, '$1'); //Usuwa kropke przed cyfrą
            usrInput.value = fixedInput + button.textContent;
        }));

        subBtn.addEventListener('click',this.mathOperation.bind(calc));

        //Nasłuch inputa wpisywanego z klawiatury
        usrInput.addEventListener('keyup',this.inputHandler.bind(calc));
        backspace.addEventListener('click', this.undoValue);
        clear.addEventListener('click', this.clearCalculator);
        loggedOperationListBtn.addEventListener('click',this.showOperationsLogs);
        loggedOperationList.addEventListener('click', this.closeOperationsLogs)
    }

}

class App{
    static init(){
        const render = new Rendering();
    }
}

App.init();