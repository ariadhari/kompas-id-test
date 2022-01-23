$(document).ready(function () {
  $(".wrapper__back-to-top").on("click", function () {
    $("html, body").animate({ scrollTop: 0 }, 500);
    return false;
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 175) {
      $(".wrapper__back-to-top").fadeIn("slow");
      $(".wrapper__share-btn").fadeIn("slow");
    } else {
      $(".wrapper__back-to-top").fadeOut("slow");
      $(".wrapper__share-btn").fadeOut("slow");
    }
  });

  // tooltip
  $(function () {
    $('[data-toggle="popover"]').popover();
  });

  $(window).scroll(function () {});
});
