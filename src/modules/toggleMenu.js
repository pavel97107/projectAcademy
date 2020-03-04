const toggleMenu = () => {

  const menu = document.querySelector("menu"),
    closeBtn = document.querySelector(".close-btn"),
    menuItems = menu.querySelectorAll("ul>li"),
    body = document.querySelector("body");

  const handlerMenu = () => {
    menu.classList.toggle("active-menu");
  };

  body.addEventListener("click", event => {
    let target = event.target;

    if (target.closest(".menu")) {
      handlerMenu();
      return;
    }
    if (menu.className === "active-menu") {
      if (target.closest("body") && target !== menu) {
        handlerMenu();
        return;
      }
    }
    if (target === closeBtn) {
      handlerMenu();
      return;
    }
    menuItems.forEach(item => {
      target = menuItems;
      if (item === target) {
        handlerMenu();
      }
      return;
    });
  });
};

export default toggleMenu;