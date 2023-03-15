const root = document.querySelector(':root');
const rootStyles = getComputedStyle(root);
let toggleButton = document.getElementById('toggle-btn');
const theme1ToggleControl = document.getElementById('theme-1');
const theme2ToggleControl = document.getElementById('theme-2');
const theme3ToggleControl = document.getElementById('theme-3');

let lightTheme = ()=>{
    root.style.setProperty( '--body-background', 'hsl(0, 0%, 90%)' );
    root.style.setProperty('--toggle-background', 'hsl(0, 5%, 81%)');
    root.style.setProperty('--keypad-background', 'hsl(0, 5%, 81%)');
    root.style.setProperty('--screen-background', 'hsl(0, 0%, 93%)');
    root.style.setProperty('--toggle-button', 'hsl(25, 98%, 40%)');
    root.style.setProperty('--del-reset-key', 'hsl(185, 42%, 37%)');
    root.style.setProperty('--del-reset-key-shadow', 'hsl(185, 58%, 25%)');
    root.style.setProperty('--equals-key', 'hsl(25, 98%, 40%)');
    root.style.setProperty('--equals-key-shadow', 'hsl(25, 99%, 27%)');
    root.style.setProperty('--other-keys', 'hsl(45, 7%, 89%)');
    root.style.setProperty('--other-keys-shadow', 'hsl(35, 11%, 61%)');
    root.style.setProperty('--other-colors', 'hsl(60, 10%, 19%)');
    root.style.setProperty('--other-key-text', 'hsl(60, 10%, 19%)');
    root.style.setProperty('--del-key-text', 'hsl(0, 0, 100%)');
    root.style.setProperty('--reset-key-text', 'hsl(0, 0, 100%)');
    root.style.setProperty('--equals-key-text', 'hsl(0, 0, 100%)');
    root.style.setProperty('--equals-key-text', 'hsl(0, 0, 100%)');
}

let darkTheme = ()=>{
    root.style.setProperty( '--body-background', 'hsl(268, 75%, 9%)');
    root.style.setProperty('--toggle-background', 'hsl(268, 71%, 12%)');
    root.style.setProperty('--keypad-background', 'hsl(268, 71%, 12%)');
    root.style.setProperty('--screen-background', 'hsl(268, 71%, 12%)');
    root.style.setProperty('--toggle-button', 'hsl(176, 100%, 44%)');
    root.style.setProperty('--del-reset-key', 'hsl(281, 89%, 26%)')
    root.style.setProperty('--del-reset-key-shadow', 'hsl(285, 91%, 52%)');
    root.style.setProperty('--equals-key', 'hsl(176, 100%, 44%)');
    root.style.setProperty('--equals-key-shadow', 'hsl(177, 92%, 70%)');
    root.style.setProperty('--other-keys', 'hsl(268, 47%, 21%)');
    root.style.setProperty('--other-keys-shadow', 'hsl(290, 70%, 36%)');
    root.style.setProperty('--other-colors', 'hsl(52, 100%, 62%)');
    root.style.setProperty('--other-key-text', 'hsl(52, 100%, 62%)');
    root.style.setProperty('--del-key-text', 'hsl(0, 0, 100%)');
    root.style.setProperty('--reset-key-text', 'hsl(0, 0, 100%)');
}
let getUsersPreferredTheme = ()=>{
    if(window.matchMedia('(prefers-color-scheme: light)').matches)
    {
    console.log(`i prefer light`)
    //move toggle button to the middle
    toggleButton.className = 'toggle-middle';
    //change the colors to theme 2's colors
    lightTheme();
    }
    else if(window.matchMedia('(prefers-color-scheme: dark)').matches)
    {
    console.log(`i prefer dark`)
    toggleButton.className = 'toggle-end';
    darkTheme();
    }
    else
    {
    toggleButton.className = 'toggle-btn'
    root.style = rootStyles;
    }
}

getUsersPreferredTheme();

theme1ToggleControl.addEventListener('click', ()=>{
    toggleButton.className = 'toggle-btn'
    root.style = rootStyles;
})

theme2ToggleControl.addEventListener('click', ()=>{
    //move toggle button to the middle
    toggleButton.className = 'toggle-middle';
    //change the colors to theme 2's colors
    lightTheme();  
})

theme3ToggleControl.addEventListener('click', ()=>{

    //move toggle button to the end
    toggleButton.className = 'toggle-end';

     //change the colors to theme 3's colors
    darkTheme();
})


 
