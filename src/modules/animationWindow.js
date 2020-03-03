const animationWindow = () => {
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
};

export default animationWindow;