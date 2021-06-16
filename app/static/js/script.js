const pomodoroBtns = document.querySelectorAll('.button')
const pomodoroBtn = document.getElementById('pomodoro-btn')
const shortBreakBtn = document.getElementById('short-break-btn')
const startBtn = document.getElementById('start-btn')
const setSession = document.getElementById('setSessionInterval')
const setBreak = document.getElementById('setBreakInterval')
const countdownTimer = document.getElementById('countdown')
const leisureWork = document.getElementById('leisureActivity')
const audio = document.getElementById('audio')
let minutes = 45
let seconds = 60
let pause = true
let pomodoro = "pomodoro"
let pomodorosCompleted = 0
let selectedTaskElement

// event listener for pomodoro buttons
document.addEventListener('click', e => {
  if (!e.target.matches('.button')) return

  // reset when pomodoro button selected
  pause = true
  seconds = 60
  startBtn.innerHTML = "Start"

  // only selected button has selected class
  pomodoroBtns.forEach(button => {
    button.classList.remove('selected')
  })
  e.target.classList.add('selected')

  // set timer
  if (e.target.matches('#setSessionInterval')) {
    workTime = document.getElementById("workTime").value
    countdownTimer.innerHTML = workTime+':00'
    pomodoro = "pomodoro"
    minutes = workTime
  } else if (e.target.matches('#setBreakInterval')) {
    whatToDo = document.getElementById('whatToDo').value
    breakTime = document.getElementById("breakTime").value
    if (whatToDo.length == 0) {
      leisureWork.innerHTML = 'Please go to break and do something for leisure'
    }
    else {
      leisureWork.innerHTML = 'Please go to break and do '+whatToDo

    }
    countdownTimer.innerHTML = breakTime+':00'
    pomodoro = "short break"
    minutes = breakTime
  }
})

// event listener for start button
startBtn.addEventListener('click', () => {
  // if countdown is paused, start/resume countdown, otherwise, pause countdown
  if (pause) {
    startBtn.innerHTML = "Pause"
    pause = false
    countdown()
  } else if (!pause) {
    startBtn.innerHTML = "Start"
    pause = true
  }
})

// countdown function
function countdown() {
  // return if countdown is paused
  if (pause) return

  // set minutes and seconds
  let currentMins = minutes - 1
  seconds--
  countdownTimer.innerHTML = (currentMins < 10 ? "0" : "") + currentMins.toString() + ':' + (seconds < 10 ? "0" : "") + String(seconds)

  // count down every second, when a minute is up, countdown one minute
  // when time reaches 0:00, reset
  if (seconds > 0) {
    setTimeout(countdown, 1000);
  } else if (currentMins > 0) {
    seconds = 60
    minutes--
    countdown();
  } else if (currentMins === 0) {
    audio.play()
    reset()
  }
}

// reset function when countdown ends
function reset() {
  // set to start the next round    
  startBtn.innerHTML = "Start"
  pause = true

  pomodoroBtns.forEach(button => {
    button.classList.remove('selected')
  })

  // if current round is a break, set for pomodoro
  if (pomodoro === "short break" || pomodoro === "long break") {
    pomodoro = "pomodoro"
    countdownTimer.innerHTML = '45:00'
    minutes = 45
    pomodoroBtn.classList.add('selected')
    return
  }

  // if current round is a pomodoro, set for break
  // if less than four pomodoros have been completed, go to short break
  // if four pomodoros have been completed, go to long break
  if (pomodoro === "pomodoro" && pomodorosCompleted < 4) {
    pomodorosCompleted++
    pomodoro = "short break"
    countdownTimer.innerHTML = '05:00'
    minutes = 5
    shortBreakBtn.classList.add('selected')
  } 

  // if a task has been selected
  if (selectedTaskElement != null) {
    const selectedTaskId = selectedTaskElement.dataset.taskId
    const current = tasks.find(task => task.id === selectedTaskId)
    current.completedPomodoros++
    const pomodoroCount = selectedTaskElement.querySelector('.pomodoro-count')
    pomodoroCount.innerHTML = current.completedPomodoros.toString() + '/' + current.totalPomodoros
  }
}