document.addEventListener("DOMContentLoaded", () => {
  const startContainer = document.querySelector(".start-container");
  const endContainer = document.querySelector(".end-container");

  const startContainerOffsetHeight = startContainer.offsetHeight;
  const endContainerOffsetHeight = endContainer.offsetHeight;

  const startContainerRectTop = startContainer.getBoundingClientRect().top;

  let lastKnownScrollPosition = 0;
  let ticking = false;

  const animate = (lastKnownScrollPosition) => {
    const startingPoint = lastKnownScrollPosition - startContainerRectTop;
    const endPoint = endContainerOffsetHeight - startContainerOffsetHeight;

    if (startingPoint < 0) {
      startContainer.style.transform = `translateY(0px)`;
    } else if (startingPoint > 0 && startingPoint <= endPoint) {
      startContainer.style.transform = `translateY(${startingPoint}px)`;
    } else if (startingPoint > endPoint) {
      startContainer.style.transform = `translateY(${endPoint}px)`;
    }
  };

  document.addEventListener("scroll", () => {
    lastKnownScrollPosition = window.scrollY;

    if (!ticking) {
      window.requestAnimationFrame(() => {
        animate(lastKnownScrollPosition);
        ticking = false;
      });

      ticking = true;
    }
  });
});
