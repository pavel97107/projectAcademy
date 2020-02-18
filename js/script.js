window.addEventListener('DOMContentLoaded', function(){
'use strict';

    // Timer
    function countTimer(deadline){
        let timeHours = document.querySelector('#timer-hours'),
            timeMinutes = document.querySelector('#timer-minutes'),
            timeSeconds = document.querySelector('#timer-seconds');

            function getTimeRemaining(){
            let dateStop = new Date(deadline).getTime(), // крайняя дата
            dateNow = new Date().getTime(), // текущая дата (getTime()-метод преобразует в милисекунды)
            timeRemaining = (dateStop - dateNow) / 1000, // конвертируем мили секунды в секунды
            seconds = Math.floor(timeRemaining % 60), // теперь мы имеем секунды(поулчаем чистые секунды делением на остаток)
            minutes = Math.floor((timeRemaining / 60) % 60), // теперь мы имеем минуты (вычисляем количество минут в часе!!!)
            hours = Math.floor(timeRemaining / 60 / 60 % 24), // получили часы
            day = Math.floor(timeRemaining / 60 / 60 / 24 ); // получили дни
                return {timeRemaining, hours, minutes, seconds};
            }

            function updateClock(){
            let timer = getTimeRemaining();
            timeHours.textContent = timer.hours;
            timeMinutes.textContent = timer.minutes;
            timeSeconds.textContent = timer.seconds;

              if(timer.hours >= 1 && timer.hours <= 9){
                timeHours.textContent = '0' + timer.hours;
              }
              if(timer.minutes >= 1 && timer.minutes<= 9){
                timeMinutes.textContent = '0' + timer.minutes;
              }
              if(timer.seconds  >= 0 && timer.seconds <= 9){
                timeSeconds.textContent = '0' + timer.seconds;
              }

                if (timer.timeRemaining < 0) {
                    let doubleZero = '00';
                    timeHours.textContent = doubleZero;
                    timeMinutes.textContent = doubleZero;
                    timeSeconds.textContent = doubleZero;
                }
            }
            updateClock();
    }
    setInterval(countTimer, 100, '19 feb 2020');
});

// deadline то время до которого функция будет отсчитывать



let dateNew = new Date();

dateNew.setDate(dateNew.getDate() - 1);
console.log('dateNew: ', dateNew); // так мы вычислили какой день был вчера

console.log(dateNew.toDateString()); // получаем дату в виде строки
console.log(dateNew.toTimeString()); // получаем время в виде строки

console.log(dateNew.toLocaleDateString('rus')); // получаем дату в виде строки / можем добавить локализацию
console.log(dateNew.toLocaleTimeString('rus')); // получаем время в виде строки 


console.log(dateNew.toISOString('rus').substr(0, 10)); //  получаем время в iso формате оставляем только первые 10 символов

console.log(Date.now()); // количество мл секунд прошедших с 19070 года 1 января
console.log(Date.parse('24 april 1998')); // количество мл секунд прошедших 1998 года 24 апреля