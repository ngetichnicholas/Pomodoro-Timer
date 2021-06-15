const timerElement = document.getElementById("w_minutes");
const progressbar = document.getElementById("w_minutes");

let timerCounter = progressbar.max;

const interval = setInterval(() => {
    if (timerCounter<=1){
        window.location.href = "/work";
        clearInterval(interval);
    }
    timerCounter = timerCounter - 1;
    timer.innerText = timerCounter + "mins";
    progressbar.value = timerCounter;
},60);