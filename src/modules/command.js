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
export default command;