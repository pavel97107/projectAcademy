const command = () => {
  const commandRow = document.querySelector(".command .row");

  let defaultSrc;
  commandRow.addEventListener("mouseover", event => {
    let target = event.target;
    if (target.closest(".command__photo")) {
      defaultSrc = target.src;
      target.src = target.dataset.img;
    }
  });

  commandRow.addEventListener("mouseout", event => {
    let target = event.target;
    if (target.closest(".command__photo")) {
      target.src = defaultSrc;
    }
  });
};
export default command;