const timer = document.getElementById("w_minutes");

const interval = setInterval(() => {
    timer = timer - 1;
    timer.innerText = timer + "mins";
},60);