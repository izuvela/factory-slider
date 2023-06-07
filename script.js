$(document).ready(() => {
  const $sliderButtons = $(".slider__button");
  const $sliderRow = $(".slider__row");
  const $sliderImagesContainerSecond = $sliderRow
    .last()
    .find(".slider__images-container");
  const animationSpeed = 500;

  const moveSliderElement = ($sliderElement, direction) => {
    const $currentFirstImage = $sliderElement.find(".slider__image").first();
    const $currentLastImage = $sliderElement.find(".slider__image").last();
    const isMovingLeft = direction === "left";
    const $imageToClone = isMovingLeft ? $currentFirstImage : $currentLastImage;
    const animateDirection = isMovingLeft
      ? `-${$imageToClone.width() + 10}px`
      : `${$imageToClone.width() + 10}px`;

    $imageToClone.addClass("slider__image_disappearing");

    $imageToClone.on("transitionend", () => {
      $sliderElement.animate({ left: animateDirection }, animationSpeed, () => {
        const clonedImage = $imageToClone.clone();
        isMovingLeft
          ? $sliderElement.append(clonedImage)
          : $sliderElement.prepend(clonedImage);
        $sliderElement.css("left", 0);

        requestAnimationFrame(() => {
          clonedImage.removeClass("slider__image_disappearing");
        });

        $imageToClone.remove();
        $sliderButtons.removeClass("disabled");
      });
    });
  };

  const areSliderButtonsEnabled = () => {
    return !$sliderButtons.hasClass("disabled");
  };

  $sliderButtons.on("click", function () {
    if (areSliderButtonsEnabled()) {
      $sliderButtons.addClass("disabled");
      const direction = $(this).index() === 0 ? "left" : "right";
      moveSliderElement($sliderRow.first(), direction);
      moveSliderElement($sliderImagesContainerSecond, direction);
    }
  });
});
