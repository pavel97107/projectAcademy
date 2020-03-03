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

export default toggleMenu;