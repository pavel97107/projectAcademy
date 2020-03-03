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
export default calc;