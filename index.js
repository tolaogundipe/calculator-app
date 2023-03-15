/*This calculating engine works in the following way:
1. There are 3 div containers (hardcoded using html) that houses the enteries
    - The leftEnteries houses and displays letters typed before an operator is typed
    - The operatorEntry houses and displays the operator i.e +-/*
    (there can only be one operator).
    - The rightEnteries houses and displays numbers typed after the operator 
    has been typed 

2. The leftEntryCounter, rightEntryCounter and operatorCounter are incremented when 
    numbers are added to the corresponding containers.
    
3. The decimalMode boolean keep track of when the dot key has been pressed and when the 
    answer is a decimal number
    
4. */



let leftEntryCounter = 0;
let rightEntryCounter = 0;
let operatorCounter = 0;
let decimalMode = false;
let answerGenerated = false;
let input = '';
let inputArray = [];


const keys = document.getElementsByClassName('keys');
let screen = document.getElementById('screen');
let leftEntries = screen.querySelector('#left-entries');
let operatorEntry = screen.querySelector('#operator-entry');
let rightEntries = screen.querySelector('#right-entries');


for(let key of keys)
{
    key.addEventListener('click', ()=>{
        restart();
        input = key.innerHTML;
        // if(hasInputedOperator)
        if(operatorCounter == 1)
        {
           // operatorCounter = 1;
            if(rightEntryCounter < 6)
            {
                writeToScreen(input, rightEntries);
                rightEntryCounter++;
                inputArray.push(input);
            }
              
            if(!decimalMode){ checkInput(rightEntries, rightEntryCounter);}
        } 
        
        if(operatorCounter == 0) 
        {
            //write and compute a maximum of 6 digits for the left side
            if(leftEntryCounter < 6)
            {
                leftEntryCounter++;
                writeToScreen(input, leftEntries);
                inputArray.push(input);  
            }
           
            if(!decimalMode){ checkInput(leftEntries, leftEntryCounter);}
        }       
         
    });
}


// //program the dot key
let dotKey = document.getElementById('dot-key');
dotKey.addEventListener('click',()=>{
    restart();
    let c = null;
    if(!decimalMode && operatorCounter == 0)
    {
        //if dot is pressed when nothing else 
        //is on the screen, add a zero before the dot
        //both on the screen and push 0 into inputArray
        if(leftEntries.childElementCount == 0)
        {
            writeToScreen('0', leftEntries);
            inputArray.push('0');
        }
        c = leftEntries;
        writeToScreen(dotKey.innerHTML, c);
        inputArray.push(dotKey.innerHTML); 
    } 
    if(!decimalMode && operatorCounter == 1)
    {
        if(rightEntries.childElementCount == 0 )
        {
            writeToScreen('0', rightEntries);
            inputArray.push('0');
        }
        c = rightEntries;
        writeToScreen(dotKey.innerHTML, c);
        inputArray.push(dotKey.innerHTML);
    } 
    decimalMode = true;
})

 //program the operator keys + - * /
let operatorKeys = document.getElementsByClassName('operator-keys');
for(let key of operatorKeys)
{
    key.addEventListener('click', ()=>{
        if(operatorCounter == 0)
        {
            input = key.innerHTML;
            if(input == 'x')
            {
                inputArray.push('*');
            } 
            else
            {
                inputArray.push(input);
            }    

            writeToScreen(input, operatorEntry);
            if(answerGenerated)
            {
                answerGenerated = false;
            }
            operatorCounter = 1;
            decimalMode = false;
        }
    })
}

//program the equals key
let equalKey = document.getElementById('equal-key');
equalKey.addEventListener('click', ()=>{
    let userInput = inputArray.join('');
    let solution = Function('return ' + userInput)();
    inputArray = [];
    input = solution;
    inputArray.push(input);
    clearScreen();
    let answerToDisplay = input.toString().slice(0, 11);
   
    if(checkDecimalMode(solution))
    {
        writeToScreen(checkIfDecimalAndNeedsComma(answerToDisplay), leftEntries); 
    }
    else
    {
        answerToDisplay = addCommaToFinalAnswer(solution.toString().slice(0, 12));
        writeToScreen(answerToDisplay, leftEntries); 
        decimalMode = false;
    }
    leftEntryCounter = 1;
    operatorCounter = 0;
    rightEntryCounter = 0;
    answerGenerated = true;
})

 //program the reset key
 let resetKey = document.getElementById('reset-key');
 resetKey.addEventListener('click', ()=>{
     clearScreen();
     reset();
 })

//program del key
let delKey = document.getElementById('key-del');
delKey.addEventListener('click', ()=>{
    let i = tracker();
    editEnteries(tracker());
    screen.children[tracker()].removeChild(screen.children[tracker()].lastChild); 
    inputArray.pop();
    input = '';
})


let writeToScreen = (string, entryContainer) =>{
    let container = document.createElement('div');
    container.innerText =  string;
    entryContainer.appendChild(container);
}

let clearScreen = () =>{
    for(let i = 0; i < 3; i++)
    {
        while(screen.children[i].lastChild )
        { 
            screen.children[i].removeChild(screen.children[i].lastChild);    
        }
    }
}

let reset = ()=>{
    input = '';
     inputArray = [];
     leftEntryCounter = 0;
     rightEntryCounter = 0;
     operatorCounter = 0;
     hasInputedLeftEntries = false;
     decimalMode = false;
}

let addComma = (string, number,container) =>{
    let commaContainer = document.createElement('div');
    commaContainer.className = 'comma';
    commaContainer.innerText = string;
    container.insertBefore(commaContainer, container.children[number]);
}

//while counter is greater than 4, if counter = 4, add a comma
// before the second element in screen, if counter = 5, add comma
// before the third element, if counter = 6, add comma before 
//the fourth screen element. if counter = 7, add comma beofre the
//second element and before the fifth element. if counter = 8,
//add comma before third element and sixth element.

let checkInput = (container, c)=>{
    if(c < 4)
    {
        removeComma(container);
    }
    for(let i = 4; i < 20; i++)
    {
        if(c == i)
        {
            console.log(`c is now ${c}!`)
            //remove any previous comma and add new commas
            removeComma(container);
            let index = i - 3;
            if(c > 3 && c < 7)
            { 
                addComma(',', index, container);
            }
            if(c > 6 && c < 10)
            {
                addComma(',', index, container);
                addComma(',', index - 3, container);
            }
        }
    }
}

let createDivContainers = (id)=>{
    let Container = document.createElement('div');
    Container.id = id;
    screen.appendChild(Container);
 }   

let tracker = ()=>{
    let c = null;
    if(leftEntries.children.length !== 0)
    {
        c = 0;
    }
    if(operatorEntry.children.length !== 0)
    {
        c = 1;
    }
    if(rightEntries.children.length !== 0)
    {
        c = 2
    }
    return c;
}

let addCommaToFinalAnswer = (containerContent)=>{
    //receive a string, turn it into an array and add
    //a comma or commas to it based on the number of elements
    // let string = leftEntries.innerText;
    let string = containerContent;
    let stringArray = string.split('');
    for(let i = 4; i < 10; i++)
    {
        if(stringArray.length == i)
        {
            let index = i - 3;
            if(stringArray.length > 3 && stringArray.length < 7)
            { 
                stringArray.splice(index, 0, ',');
                break;
            }
            if(stringArray.length > 6 && stringArray.length < 10)
            {
                stringArray.splice(index-3, 0, ',');
                stringArray.splice(index+1, 0, ',');
                break;
                
            }
        }
    }
    let newString = stringArray.join('');

    return newString;
}

let editEnteries = (value)=>{
    if(value == 0)
    {
        leftEntryCounter--;
        if(!decimalMode) {checkInput(leftEntries, leftEntryCounter)};
    }
    if(value == 1)
    {
        operatorCounter--;
    }
    if(value == 2)
    {
        rightEntryCounter--;
        if(!decimalMode){checkInput(rightEntries, rightEntryCounter)};
        
    }
}
 
let removeComma = (container)=>{
    for(let child of container.children)
    {
        if (child.innerText == ',')
        {
            child.remove();
        }
    }
}

let checkDecimalMode = (input) =>{
    let n = input.toString();
    if(n.includes('.'))
    {
        decimalMode = true;
    }
    else decimalMode = false
    return decimalMode;
}

let restart = () =>{
    if(answerGenerated)
    {
        clearScreen();
        inputArray = [];
        leftEntryCounter = 0
        answerGenerated = false;
    } 
}

let checkIfDecimalAndNeedsComma = (input) =>{
    const index = input.indexOf('.');
    let before = input.substring(0, index);
    let after = input.substring(index, input.length);
    if(before.length > 3)
    {
        let editedBefore = addCommaToFinalAnswer(before);
        return editedBefore + after;  
    }
    else
    {
        return input;
    }
    
}