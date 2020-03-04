function countTimer(deadline) {
    let timeHours = document.querySelector("#timer-hours"),
        timeMinutes = document.querySelector("#timer-minutes"),
        timeSeconds = document.querySelector("#timer-seconds");

    function getTimeRemaining() {
        let dateStop = new Date(deadline).getTime(), // крайняя дата
            dateNow = new Date().getTime(), // текущая дата (getTime()-метод преобразует в милисекунды)
            timeRemaining = (dateStop - dateNow) / 1000, // конвертируем мили секунды в секунды
            seconds = Math.floor(timeRemaining % 60), // теперь мы имеем секунды(поулчаем чистые секунды делением на остаток)
            minutes = Math.floor((timeRemaining / 60) % 60), // теперь мы имеем минуты (вычисляем количество минут в часе!!!)
            hours = Math.floor((timeRemaining / 60 / 60) % 24); // получили часы
        return {
            timeRemaining,
            hours,
            minutes,
            seconds
        };
    }

    function updateClock() {
        let timer = getTimeRemaining();
        timeHours.textContent = timer.hours;
        timeMinutes.textContent = timer.minutes;
        timeSeconds.textContent = timer.seconds;

        if (timer.hours <= 9) {
            timeHours.textContent = "0" + timer.hours;
        }
        if (timer.minutes <= 9) {
            timeMinutes.textContent = "0" + timer.minutes;
        }
        if (timer.seconds <= 9) {
            timeSeconds.textContent = "0" + timer.seconds;
        }

        if (timer.timeRemaining < 0) {
            let doubleZero = "00";
            timeHours.textContent = doubleZero;
            timeMinutes.textContent = doubleZero;
            timeSeconds.textContent = doubleZero;
        }

        setTimeout(countTimer, 100, "24 april 2020");
    }
    updateClock();
}

export default countTimer;