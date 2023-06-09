export const dragStart = (event) => {
  event.dataTransfer.setData(
    "text",
    event.target.getAttribute("data-image-name")
  );
};

export const dragEnter = (event) => {
  if (
    event.target.classList &&
    event.target.classList.contains("droppable") &&
    !event.target.classList.contains("dropped")
  ) {
    event.target.classList.add("droppable-hover");
  }
};

export const dragOver = (event) => {
  if (
    event.target.classList &&
    event.target.classList.contains("droppable") &&
    !event.target.classList.contains("dropped")
  ) {
    event.preventDefault();
  }
};

export const dragLeave = (event) => {
  if (
    event.target.classList &&
    event.target.classList.contains("droppable") &&
    !event.target.classList.contains("dropped")
  ) {
    event.target.classList.remove("droppable-hover");
  }
};
