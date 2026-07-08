
/* 

    $('.bxslider').bxSlider({
  infiniteLoop: flase,
  hideControlOnEnd: true,
  slideWidth: 600
    });

$(document).ready(function(){
    $(".icons i").click(function(){
        if ($(this).hasClass("click")) {
            $(this).removeClass("click");}
    else {$(this).addClass("click")}
        });

$(".filter-title").click(function(){
    if($(this).hasClass("close")){
        $(this).removeClass("close");
    }else {$(this).addClass("close")}
});
});
 */
$(document).ready(function () {

  $('.pd-list-div-img.bxslider').bxSlider({
    auto: false,
    pager: false,
    controls: true
  });

  $('.filter-btn').click(function () {
    $(this).closest('.filter-title').toggleClass('close');
    $(this).closest('.filter').find('.filter-list').slideToggle(200);
  });

  $('.subtitle a').click(function (e) {
    e.preventDefault();

    var $icon = $(this).find('i');
    var $de   = $(this).closest('li').find('.de');
    if ($de.length) {
      $de.slideToggle(200);
      $icon.toggleClass('open-icon');
    }
  });


  $('.stock .subtitle a').click(function (e) {
    e.preventDefault();
    var $icon = $(this).find('i');
    if ($icon.hasClass('fa-toggle-off')) {
      $icon.removeClass('fa-toggle-off').addClass('fa-toggle-on');
    } else {
      $icon.removeClass('fa-toggle-on').addClass('fa-toggle-off');
    }
  });


  $('.icons i').click(function () {
    $(this).toggleClass('click');
  });

$(function(){
    $(window).on("scroll", function(){
        var windowH = $(window).height();
        var scrollY = $(this).scrollTop();

        $(".up").each(function(){
            var thisPosition = 50; 
            var thisHeight = $(this).height();

            if(scrollY >= thisPosition){
                $(this).addClass("top");
            } else{
                $(this).removeClass("on");
                $(this).removeClass("top");
            }
        });
    });
});
})