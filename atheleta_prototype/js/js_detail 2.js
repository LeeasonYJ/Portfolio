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

    //modal
$(".main-img button").click(function(){
    $(".modal").addClass("active");
})
$(".modal-btn").click(function(){
    $(".modal").removeClass("active");
})

$('.fa-heart').click(function () {
    $(this).toggleClass('click');
  });

});