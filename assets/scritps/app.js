const usrInput = document.querySelector('input');
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
        console.log(operationHistory)
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
            .replace(/^([+*/^\.])/, '') //Zezwala tylko na minus na poczatku działania
            .replace(/(\d*\.\d*)\./g, '$1') //Usuwa wielokrotne kropki
            .replace(/([+\-*/^])\./g, '$1'); //Usuwa kropke przed cyfrą
        if(event.key == 'Enter')
            {   //Wykonywanie operacji poprzez naciśnięcie entera na klawiaturze
                this.mathOperation();
            };
    }
    //Wykonywanie operacji | uzupełnianie historii
    operationHisHandler(){
        if(usrInput.value){
            operationHistory.push(usrInput.value.replace(/([+\-*/^\.])(?=$)/, ''));
            console.log(operationHistory);
        }
    }
    mathOperation(){
        console.log(eval(usrInput.value.replace(/([+\-*/^\.])(?=$)/, '')));//Usuwa pusty operator na końcu
        this.operationHisHandler();
    };
}




class Rendering extends CalcManagment{
    constructor(){
        
        super()
        
        this.render();
    }
    render(){
        const calc = new CalcManagment();
        const operationHis = document.querySelector('.operationHis');
        const numBtn = document.querySelectorAll('.num');
        const subBtn = document.querySelector('.submit')
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
            const clear = document.querySelector('.clear');
            const operationHisList = document.querySelector('.operationHisList');
            const backspace = document.querySelector('.backspace');
            backspace.addEventListener('click', this.undoValue);
            clear.addEventListener('click', this.clearCalculator);

    }

}

class App{
    static init(){
        const render = new Rendering();
    }
}

App.init();