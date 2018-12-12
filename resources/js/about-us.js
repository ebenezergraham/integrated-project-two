

$(".aboutus-water").ripples({
    // Image Url
    imageUrl: "img/heroimage1.jpeg",
    // The width and height of the WebGL texture to render to.
    // The larger this value, the smoother the rendering and the slower the ripples will propagate.
    resolution: 500,
    // The size (in pixels) of the drop that results by clicking or moving the mouse over the canvas.
    dropRadius: 20,
    // Basically the amount of refraction caused by a ripple.
    // 0 means there is no refraction.
    perturbance: 1,
    // Whether mouse clicks and mouse movement triggers the effect.
    interactive: true,
    // The crossOrigin attribute to use for the affected image.
    crossOrigin: "true"
});

/*
* Authors slide
* ====================================
* */

$(document).ready(function(){
    $("#testimonial-slider").owlCarousel({
        items:3,
        itemsDesktop:[1000,3],
        itemsDesktopSmall:[979,2],
        itemsTablet:[768,2],
        itemsMobile:[650,1],
        pagination:true,
        autoPlay:true
    });
});
