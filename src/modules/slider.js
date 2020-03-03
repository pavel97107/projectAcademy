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

export default slider;