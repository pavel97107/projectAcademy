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
    setInterval(countTimer, 1000, '28 feb 2020');

    //Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector('.menu'),
            menu = document.querySelector('menu'),
            closeBtn = document.querySelector('.close-btn'),
            menuItems = menu.querySelectorAll('ul>li'),
            body = document.querySelector('body');

            const handlerMenu = () => {
                menu.classList.toggle('active-menu');
            };



        btnMenu.addEventListener('click', handlerMenu);
        menu.addEventListener('click', (event) =>{
            let target = event.target;
            if(target === closeBtn){
                handlerMenu();
                return;
            }
            menuItems.forEach((item)=>{
                target = target.closest('ul>li');
                if(item === target){
                    handlerMenu();
                }
                return;
            });
            });
    };
    toggleMenu();
    //Модульное окно


    let popUpContent = document.querySelector('.popup-content');
    //Всплывашка
    function popUpShow(){
       
        let start = Date.now();
        const timer = setInterval(function(){
            let timerRemaining = Date.now() - start;
            if(timerRemaining >= 250){
                clearInterval(timer);
                return;
            }
            draw(timerRemaining);
        }, 2);
        
        function draw(timerRemaining){
            popUpContent.style.left = timerRemaining *2.7 + 'px';
        }
        
        if(window.innerWidth <= 768) {
            popUpContent.style.left = '30%';
            clearInterval(timer);
        }


}

     const togglePopUp = () => {
        const popUp = document.querySelector('.popup'),
        btnPopUp = document.querySelectorAll('.popup-btn');

        btnPopUp.forEach((elem) => {
            elem.addEventListener('click', () => {
                popUp.style.display = 'block';
                popUpShow();
            });
        });
        

        popUp.addEventListener('click', (event) => {
            let target = event.target;
            
            if(target.classList.contains('popup-close')){
                popUp.style.display = 'none';
                popUpContent.style.left = '-400px';
            } else {
                 target = target.closest('.popup-content');
                if(!target){
                    popUp.style.display = 'none';
                } 
            }

           
        });
     };
     togglePopUp();


    // Табы 
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');
        const toggleTabContent = (index) => {
            for( let i = 0; i < tabContent.length; i++){
                if(index === i){
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else{
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };
            tabHeader.addEventListener('click',(event) => {
                let target = event.target;
                    target = target.closest('.service-header-tab');
                    if(target){
                        tab.forEach((item, i) => {
                            if(item === target){
                                toggleTabContent(i);
                            }
                        });
                        
                    }
            });
    };
    tabs();


    //Пишем слайдер
    const slider = () => {
        const slide = document.querySelectorAll('.portfolio-item'),
            btn = document.querySelectorAll('.portfolio-btn'),
            slider = document.querySelector('.portfolio-content'),
            dotsPortfolio = document.querySelector('.portfolio-dots');

            let currentSlide = 0,// переменная счетчик (отслеживает какой слайд сейчас активен)
                interval;

            const createDot = () => {
                 let newDot = document.createElement('li');
                 newDot.classList.add('dot');
                 dotsPortfolio.appendChild(newDot);

            };
            const appDot = () => {
                for( let i = 0; i < slide.length; i++){
                    createDot();
                }
            };

            appDot();

            let dot = document.querySelectorAll('.dot');

            const prevSlide = (elem, index, strClass) => {
                elem[index].classList.remove(strClass);
            };

            const nextSlide = (elem, index, strClass) => {
                elem[index].classList.add(strClass);
            };

            const autoPlaySlide = () => {
                prevSlide(slide, currentSlide, 'portfolio-item-active');
                prevSlide(dot, currentSlide, 'dot-active');
                currentSlide++; // добавляем 1
                if(currentSlide >= slide.length){
                    currentSlide = 0;
                }
                nextSlide(slide, currentSlide, 'portfolio-item-active'); // к следующему слайду добовляем active
                nextSlide(dot, currentSlide, 'dot-active');
            };

            const startSlide = (time = 3000) => {
                interval = setInterval(autoPlaySlide, time);
            };

            const stopSlide = () => {
                clearInterval(interval);
            };

            slider.addEventListener('click', (event) => {
               event.preventDefault();

               let target = event.target;

               if(!target.matches('.portfolio-btn, .dot')){
                    return;
               }

               prevSlide(slide, currentSlide, 'portfolio-item-active');
               prevSlide(dot, currentSlide, 'dot-active');

               if(target.matches('#arrow-right')){
                   currentSlide++;
               } else if(target.matches('#arrow-left')){
                   currentSlide--;
               } else if (target.matches('.dot')){
                   dot.forEach((elem, index)=>{
                    if(elem === target){
                        currentSlide = index;
                    }
                   });
               }
               if(currentSlide >= slide.length){
                   currentSlide = 0;
               }

               if(currentSlide < 0){
                currentSlide = slide.length - 1;
            }
               nextSlide(slide, currentSlide, 'portfolio-item-active'); // к следующему слайду добовляем active
               nextSlide(dot, currentSlide, 'dot-active');
            });

            slider.addEventListener('mouseover', (event) => {
                if(event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')){
                    stopSlide();
                }
            });
            slider.addEventListener('mouseout', (event) => {
                if(event.target.matches('.portfolio-btn') ||
                event.target.matches('.dot')){
                    startSlide();
                }
            });
            startSlide(1500);
    };
      
    slider();
});