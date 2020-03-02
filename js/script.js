window.addEventListener("DOMContentLoaded", function () {
    "use strict";

    // Timer
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
                hours = Math.floor((timeRemaining / 60 / 60) % 24), // получили часы
                day = Math.floor(timeRemaining / 60 / 60 / 24); // получили дни
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

            if (timer.hours >= 1 && timer.hours <= 9) {
                timeHours.textContent = "0" + timer.hours;
            }
            if (timer.minutes >= 1 && timer.minutes <= 9) {
                timeMinutes.textContent = "0" + timer.minutes;
            }
            if (timer.seconds >= 0 && timer.seconds <= 9) {
                timeSeconds.textContent = "0" + timer.seconds;
            }

            if (timer.timeRemaining < 0) {
                let doubleZero = "00";
                timeHours.textContent = doubleZero;
                timeMinutes.textContent = doubleZero;
                timeSeconds.textContent = doubleZero;
            }
        }
        updateClock();
    }
    setInterval(countTimer, 1000, "28 feb 2020");

    //Меню
    const toggleMenu = () => {
        const btnMenu = document.querySelector(".menu"),
            menu = document.querySelector("menu"),
            closeBtn = document.querySelector(".close-btn"),
            menuItems = menu.querySelectorAll("ul>li"),
            body = document.querySelector("body");

        const handlerMenu = () => {
            menu.classList.toggle("active-menu");
        };

        btnMenu.addEventListener("click", handlerMenu);
        menu.addEventListener("click", event => {
            let target = event.target;
            if (target === closeBtn) {
                handlerMenu();
                return;
            }
            menuItems.forEach(item => {
                target = target.closest("ul>li");
                if (item === target) {
                    handlerMenu();
                }
                return;
            });
        });
    };
    toggleMenu();
    //Модульное окно

    let popUpContent = document.querySelector(".popup-content");
    //Всплывашка
    function popUpShow() {
        let start = Date.now();
        const timer = setInterval(function () {
            let timerRemaining = Date.now() - start;
            if (timerRemaining >= 250) {
                clearInterval(timer);
                return;
            }
            draw(timerRemaining);
        }, 2);

        function draw(timerRemaining) {
            popUpContent.style.left = timerRemaining * 2.5 + "px";
        }

        if (window.innerWidth <= 768) {
            popUpContent.style.left = "30%";
            clearInterval(timer);
        }
    }

    const togglePopUp = () => {
        const popUp = document.querySelector(".popup"),
            btnPopUp = document.querySelectorAll(".popup-btn");

        btnPopUp.forEach(elem => {
            elem.addEventListener("click", () => {
                popUp.style.display = "block";
                popUpShow();
            });
        });

        popUp.addEventListener("click", event => {
            let target = event.target;

            if (target.classList.contains("popup-close")) {
                popUp.style.display = "none";
                popUpContent.style.left = "-400px";
            } else {
                target = target.closest(".popup-content");
                if (!target) {
                    popUp.style.display = "none";
                }
            }
        });
    };
    togglePopUp();

    // Табы
    const tabs = () => {
        const tabHeader = document.querySelector(".service-header"),
            tab = tabHeader.querySelectorAll(".service-header-tab"),
            tabContent = document.querySelectorAll(".service-tab");
        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add("active");
                    tabContent[i].classList.remove("d-none");
                } else {
                    tab[i].classList.remove("active");
                    tabContent[i].classList.add("d-none");
                }
            }
        };
        tabHeader.addEventListener("click", event => {
            let target = event.target;
            target = target.closest(".service-header-tab");
            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };
    tabs();

    //Пишем слайдер
    const slider = () => {
        const slide = document.querySelectorAll(".portfolio-item"),
            btn = document.querySelectorAll(".portfolio-btn"),
            slider = document.querySelector(".portfolio-content"),
            dotsPortfolio = document.querySelector(".portfolio-dots");

        let currentSlide = 0, // переменная счетчик (отслеживает какой слайд сейчас активен)
            interval;

        const createDot = () => {
            let newDot = document.createElement("li");
            newDot.classList.add("dot");
            dotsPortfolio.appendChild(newDot);
        };
        const appDot = () => {
            for (let i = 0; i < slide.length; i++) {
                createDot();
            }
        };

        appDot();

        let dot = document.querySelectorAll(".dot");

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {
            prevSlide(slide, currentSlide, "portfolio-item-active");
            prevSlide(dot, currentSlide, "dot-active");
            currentSlide++; // добавляем 1
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, "portfolio-item-active"); // к следующему слайду добовляем active
            nextSlide(dot, currentSlide, "dot-active");
        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener("click", event => {
            event.preventDefault();

            let target = event.target;

            if (!target.matches(".portfolio-btn, .dot")) {
                return;
            }

            prevSlide(slide, currentSlide, "portfolio-item-active");
            prevSlide(dot, currentSlide, "dot-active");

            if (target.matches("#arrow-right")) {
                currentSlide++;
            } else if (target.matches("#arrow-left")) {
                currentSlide--;
            } else if (target.matches(".dot")) {
                dot.forEach((elem, index) => {
                    if (elem === target) {
                        currentSlide = index;
                    }
                });
            }
            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }
            nextSlide(slide, currentSlide, "portfolio-item-active"); // к следующему слайду добовляем active
            nextSlide(dot, currentSlide, "dot-active");
        });

        slider.addEventListener("mouseover", event => {
            if (
                event.target.matches(".portfolio-btn") ||
                event.target.matches(".dot")
            ) {
                stopSlide();
            }
        });
        slider.addEventListener("mouseout", event => {
            if (
                event.target.matches(".portfolio-btn") ||
                event.target.matches(".dot")
            ) {
                startSlide();
            }
        });
        startSlide(1500);
    };

    slider();

    //Валидация инпутов

    const calc = (price = 100) => {
        let calcBlock = document.querySelector(".calc-block");
        let inputCalc = document.querySelectorAll(".calc-block input");
        const calcType = document.querySelector(".calc-type");
        const calcSquare = document.querySelector(".calc-square");
        const calcDay = document.querySelector(".calc-day");
        const calcCount = document.querySelector(".calc-count");
        const totalValue = document.getElementById("total");

        calcBlock.addEventListener("input", () => {
            inputCalc.forEach(item => {
                item.value = item.value.replace(/\D/g, "");
            });
        });

        const countSum = () => {
            let total = 0;
            let countValue = 1;
            let dayValue = 1;
            const typeValue = calcType.options[calcType.selectedIndex].value;
            const squareValue = +calcSquare.value;

            if (calcCount.value > 1) {
                countValue += (calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue *= 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue *= 1.5;
            }

            if (typeValue && squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }

            totalValue.textContent = total;
        };

        calcBlock.addEventListener("change", event => {
            const target = event.target;

            if (target.matches("select") || target.matches("input")) {
                countSum();
            }
        });
    };
    calc(100);

    // Команда

    const command = () => {
        const commandRow = document.querySelector(".command .row");
        const imgCommand = document.querySelectorAll(".command__photo");
        let key1 = imgCommand[0].src;
        let key2 = imgCommand[1].src;
        let key3 = imgCommand[2].src;
        let key4 = imgCommand[3].src;
        let key5 = imgCommand[4].src;
        let key6 = imgCommand[5].src;

        commandRow.addEventListener("mouseover", event => {
            let target = event.target;
            target = target.closest(".command__photo");
            if (target) {
                target.src = target.dataset.img;
            }
        });

        commandRow.addEventListener("mouseout", event => {
            let target = event.target;
            target = target.closest(".command__photo");

            if (target === imgCommand[0]) {
                target.src = key1;
            }
            if (target === imgCommand[1]) {
                target.src = key2;
            }
            if (target === imgCommand[2]) {
                target.src = key3;
            }
            if (target === imgCommand[3]) {
                target.src = key4;
            }
            if (target === imgCommand[4]) {
                target.src = key5;
            }
            if (target === imgCommand[5]) {
                target.src = key6;
            }
        });
    };

    command();

    // send-ajax-form

    const sendForm = (selector, selectorInput) => {
        const loadMessage = "Загрузка...";
        const form = document.getElementById(selector);
        const inputForm = document.querySelectorAll(selectorInput);
        const statusMessage = document.createElement("div");

        form.addEventListener("input", () => {
            const validForm = () => {
                inputForm.forEach(item => {
                    let textInput = item.value;
                    if (item.name === "user_phone") {
                        item.value = textInput.replace(/[^0-9\+]/g, "");
                    }
                    if ((item.name === "user_name") | (item.name === "user_message")) {
                        item.value = textInput.replace(/[^а-яА-Я\s]/g, "");
                    }
                });
            };
            validForm();
        });

        const resetForm = () => {
            inputForm.forEach((item) => {
                item.value = '';
            });
        };

        const successMessage = (response) => {
            if (response.status !== 200) {
                statusMessage.textContent = 'Ошибка, что то пошло не так';
                throw new Error('status network not 200');
            } else {
                resetForm();
                statusMessage.textContent = "Спасибо! Мы скоро с вами свяжемся";
            }
        };

        form.addEventListener("submit", event => {
            event.preventDefault();
            form.appendChild(statusMessage);
            statusMessage.textContent = loadMessage;

            const formData = new FormData(form);
            let body = {};
            formData.forEach((val, key) => {
                body[key] = val;
            });
            postData(body)
                .then(successMessage)
                .catch();
        });

        const postData = body => {
            return fetch("./server.php", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            });

        };
    };

    sendForm("form1", "input");
    sendForm("form2", "input");
    sendForm("form3", "input");
});