document.addEventListener("DOMContentLoaded", () => {
  const startContainer = document.querySelector(".start-container");
  const endContainer = document.querySelector(".end-container");

  const startContainerOffsetHeight = startContainer.offsetHeight;
  const endContainerOffsetHeight = endContainer.offsetHeight;

  const startContainerRectTop = startContainer.offsetTop;

  let lastKnownScrollPosition = 0;
  let ticking = false;

  const translateElement = (element, y) => {
    element.style.transform = `translateY(${y}px)`;
  };

  const animate = (lastKnownScrollPosition) => {
    const center = window.innerHeight / 2 - startContainerOffsetHeight / 2;
    let startingPoint =
      lastKnownScrollPosition - startContainerRectTop + center;
    const endPoint = endContainerOffsetHeight - startContainerOffsetHeight;

    if (startingPoint < 0) {
      translateElement(startContainer, 0);
    } else if (startingPoint > 0 && startingPoint <= endPoint) {
      translateElement(startContainer, startingPoint);
    } else if (startingPoint > endPoint) {
      translateElement(startContainer, endPoint);
    }
  };

  // Example debounce function
  const debounce = (func, delay) => {
    let timerId;
    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  document.addEventListener(
    "scroll",
    debounce(() => {
      lastKnownScrollPosition = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          animate(lastKnownScrollPosition);
          ticking = false;
        });

        ticking = true;
      }
    }),
    100
  );
});
