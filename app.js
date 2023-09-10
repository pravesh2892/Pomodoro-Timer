//Tabs 
const pomodoroTab = document.getElementById("pomodoro-tab");
const shortBreakTab = document.getElementById("short-break-tab");
const longBreakTab = document.getElementById("long-break-tab");

const timer = document.getElementById("timer");
const pause = document.getElementById("pause");
const timerFill = document.getElementById("timer-fill");

//Settings 
const settingsIcon = document.getElementById("settings");
const settingPage = document.getElementById("setting-pg");

//HTML elements to change the font of the body
const poppinsFont = document.getElementById("poppins");
const mclarenFont = document.getElementById("mclaren");
const cursiveFont = document.getElementById("cursive");

//HMTL elements to change the timer of the app
const pomodoroTimer = document.getElementById("pomodoro");
const shortTimer = document.getElementById("short");
const longTimer = document.getElementById("long");

//HTML elements to change the colour of the app
const Cycles = document.getElementById("cycles");

//Apply btn
const applyBtn = document.getElementById("apply");

//Body Tag
const body = document.getElementsByTagName("body");

//active className
const active = document.querySelector(".active-tab");

//User input for timer
let pomodoroMinutes = 25; 
let shortBreakMinutes = 5 ; 
let longBreakMinutes = 10; 

//Initial values
let seconds;
let minutes;
let currentTimer;
let paused = false;
let currentCycle;
let cycle = 0; 
let userNoOfCycles = Cycles.value;



// Timer for pomodoro 
let pomodoro = (minute, second) => {
    pomodoroTab.classList.add("active-tab");
    shortBreakTab.classList.remove("active-tab");
    longBreakTab.classList.remove("active-tab");

    currentCycle = "pomodoro";
    userNoOfCycles = Cycles.value;

    seconds = second;
    minutes = minute;

    function counter(){
        seconds--;

        if(seconds === -1){
            minutes--;
            seconds = 59; 
        }
       
        let checkSeconds ;
        if(seconds < 10){
            checkSeconds = seconds;
            seconds = "0" + seconds;
        }

        let checkMinutes;
        if(minutes < 10){
            let count = minutes.toString().length;
            checkMinutes = minutes;
            if(count > 1){
                minutes = minutes;
            }else{
                minutes = "0" + minutes;
            }
        }

        //Display the time
        currentTimer = `${minutes}:${seconds}`;
        timer.innerText = currentTimer;
        
        //Check for ending
        if(checkSeconds === 0 && checkMinutes == 0){
            clearInterval(intervalCounter);
            cycle++;
            if(cycle > userNoOfCycles ){
                setTimeout(() => {
                    longBreak(longBreakMinutes, 0)
                }, 1000);
            }else{
                setTimeout(() => {
                    shortBreak(shortBreakMinutes, 0)
                }, 1000);
            }
            
        }
    }

    return intervalCounter = setInterval(counter, 1000) ;

}


// Timer for short break
let shortBreak = (minute, second) => {
    pomodoroTab.classList.remove("active-tab");
    shortBreakTab.classList.add("active-tab");
    longBreakTab.classList.remove("active-tab");

    currentCycle = "shortBreak";

    seconds = second;
    minutes = minute;

    function counter(){
        seconds--;

        if(seconds === -1){
            minutes--;
            seconds = 59; 
        }

        let checkSeconds ;
        if(seconds < 10){
            checkSeconds = seconds;
            seconds = "0" + seconds;
        }


        let checkMinutes;
        if(minutes < 10){
            let count = minutes.toString().length;
            checkMinutes = minutes;
            if(count > 1){
                minutes = minutes;
            }else{
                minutes = "0" + minutes;
            }
        }

        currentTimer = `${minutes}:${seconds}`;
        timer.innerText = currentTimer;

        if(checkSeconds === 0 && checkMinutes == 0){
            clearInterval(intervalCounter);
            cycle++;
            
            if(cycle > userNoOfCycles ) {
                setTimeout(() => {
                   longBreak(longBreakMinutes, 0)  
                }, 1000);
                
            }else{
                setTimeout(() => {
                    pomodoro(pomodoroMinutes, 0)
                }, 1000);
                
            }
        }
    }

    return intervalCounter = setInterval(counter, 1000) ;

}

//Timer for long break
let longBreak = (minute, second) => {
    pomodoroTab.classList.remove("active-tab");
    shortBreakTab.classList.remove("active-tab");
    longBreakTab.classList.add("active-tab");

    currentCycle = "longBreak";

    cycle = 0;

    seconds = second;
    minutes = minute;

    function counter(){
        seconds--;

        if(seconds === -1){
            minutes--;
            seconds = 59;
        }

        let checkSeconds ;
        if(seconds < 10){
            checkSeconds = seconds;
            seconds = "0" + seconds;
        }

        
        let checkMinutes;
        if(minutes < 10){
            let count = minutes.toString().length;
            checkMinutes = minutes;
            if(count > 1){
                minutes = minutes;
            }else{
                minutes = "0" + minutes;
            }
        }

        currentTimer = `${minutes}:${seconds}`;
        timer.innerText = currentTimer;

        if(checkSeconds === 0 && checkMinutes == 0){
            clearInterval(intervalCounter);
            
            setTimeout(() => {
                pomodoro(pomodoroMinutes, 0);
            }, 1000);
            
        }
    }

    return intervalCounter = setInterval(counter, 1000) ;

}

pomodoro(pomodoroMinutes, 0 );// START



let pauseTimer = () => {
    if(paused == false){
        if(currentCycle == "pomodoro"){
            clearInterval(intervalCounter);
        }else if(currentCycle == "shortBreak"){
            clearInterval(intervalCounter);
        }else if(currentCycle == "longBreak"){
            clearInterval(intervalCounter);
        }
    }

    if(paused == true){
       
        if(currentCycle == "pomodoro"){
            pomodoro(minutes, seconds);
 
        }else if(currentCycle == "shortBreak"){
            shortBreak(minutes, seconds);
 
        }else if(currentCycle == "longBreak"){
            longBreak(minutes, seconds);
        }
    }

    paused = !paused
}

let checkPauseButton = setInterval(() => {
    if(paused){
        pause.innerText = "start";
    }else{
        pause.innerText = "pause";
    }  
}, 400);


//Adding stop and start to the timer
pause.addEventListener("click", pauseTimer);

//To restart the particular event
pomodoroTab.addEventListener("click", () => {
    if(currentCycle == 'pomodoro'){
        clearInterval(intervalCounter);
        pomodoro(pomodoroMinutes, 0);
    }
})

shortBreakTab.addEventListener("click", () => {
    if(currentCycle == "shortBreak"){
        clearInterval(intervalCounter);
        shortBreak(shortBreakMinutes, 0);
    }
})

longBreakTab.addEventListener("click", () => {
    if(currentCycle == "longBreak"){
        clearInterval(intervalCounter);
        longBreak(longBreakMinutes, 0);
    }
})

// Using setting icon to open the settings page
settingsIcon.addEventListener("click", () => {
    settingPage.classList.add("scale");
})

//Change the time settings using Settings app
let changeTimerPomodoro = () => {
    if(pomodoroTimer.name == "pomodoro-time"){
        pomodoroMinutes = pomodoroTimer.value;
        clearInterval(intervalCounter);
        paused = false;
        pomodoro(pomodoroTimer.value, 0);
    }
}

let changeTimerShort = () => {
    if(shortTimer.name = "short-break"){
        shortBreakMinutes = shortTimer.value;
        clearInterval(intervalCounter);
        paused = false;
        shortBreak(shortBreakMinutes, 0);
    }
}

let changeTimerLong = () => {
    if(longTimer.name = "long-break"){
        longBreakMinutes = longTimer.value;
        clearInterval(intervalCounter);
        paused = false;
        longBreak(longBreakMinutes, 0);
    }
}

//Click on the tab to swtich the timings
pomodoroTab.addEventListener("click", () => {
    clearInterval(intervalCounter);
    paused = false;
    pomodoro(pomodoroMinutes, 0);
})

shortBreakTab.addEventListener("click", () => {
    clearInterval(intervalCounter);
    paused = false;
    shortBreak(shortBreakMinutes, 0);
})

longBreakTab.addEventListener("click", () => {
    clearInterval(intervalCounter);
    paused = false;
    longBreak(longBreakMinutes, 0);
})

// Settings to change the font family of the document
poppinsFont.addEventListener("click", () => {
    body[0].style.fontFamily = 'Poppins';
})

mclarenFont.addEventListener("click", () => {
    body[0].style.fontFamily = 'Mclaren';
    applyBtn.style.fontFamily = 'Mclaren';
})

cursiveFont.addEventListener("click", () => {
    body[0].style.fontFamily = 'Delicious Handrawn';
    applyBtn.style.fontFamily = 'Delicious Handrawn';
})

//Settings to change the cycle of the app
let noOfCycles =  function (){
    userNoOfCycles = Cycles.value;
    clearInterval(intervalCounter);
    pomodoro(pomodoroMinutes, 0)
}


// Apply button to close the settings page 
applyBtn.addEventListener("click", () => {
    settingPage.classList.remove("scale");
})

//Close the settings page 
document.getElementById("close-settings").addEventListener("click", () => {
    settingPage.classList.remove("scale");
})