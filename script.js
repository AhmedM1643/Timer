let localMinutes = localStorage.getItem("minutes") ? localStorage.getItem("minutes") : 5;
let localSeconds = localStorage.getItem("seconds") ? localStorage.getItem("seconds") : 0;

let timerDisplay = document.getElementById("timer")
let configBtn = document.getElementById("config-btn")
let resetBtn = document.getElementById("reset-btn");

class Timer {
    constructor(minutes, seconds) {
        this.minutes = parseInt(minutes);
        this.seconds = parseInt(seconds);
        this.timer = `${this.minutes}:${this.seconds}`;
        this.timerLoop;
    }
    
    update() {
        if (this.seconds < 10) {
            this.timer = `${this.minutes}:0${this.seconds}`;
            timerDisplay.innerText = this.timer;
        } else {
            this.timer = `${this.minutes}:${this.seconds}`
            timerDisplay.innerText = this.timer;
        }
    }

    config(btn) {
        this.timerLoop = setInterval(() => {
            if (this.seconds != 0 & this.minutes != 0 || this.seconds != 0 & this.minutes == 0) {
                this.seconds -= 1
                this.update()
            }
            else if (this.seconds == 0 & this.minutes != 0) {
                this.minutes -= 1
                this.seconds = 59;
                this.update()
            } 
            console.log(timer)
        }, 1000)
        btn.title = "Stop"
        btn.innerHTML = `<i class="fa-solid fa-pause"></i>`
    }

    stop(btn) {
        clearInterval(this.timerLoop)
        btn.title = "Resume"
        btn.innerHTML = `<i class="fa-solid fa-play"></i>`
    }

    reset() {
        this.minutes = parseInt(localMinutes);
        this.seconds = parseInt(localSeconds);
    };
};

const main = new Timer(localMinutes, localSeconds);

configBtn.addEventListener("click", (e) => {
    if (e.target.title == "Start" || e.target.title == "Resume") {
        main.config(e.target)
    } else {
        main.stop(e.target)
    }
})

resetBtn.addEventListener("click", (e) => {
    main.reset(e.target);
    main.update()
});

main.update();