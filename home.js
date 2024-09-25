// Redirect to restaurants page
document.getElementById("restaurant").onclick = function() {
    window.location.href = "resturants/restu.html"; 
  };
  
  // Home screen swiper
  var swiper = new Swiper(".swiper", {
    effect: "cube",
    grabCursor: true,
    loop: true,
    speed: 1000,
    cubeEffect: {
      shadow: false,
      slideShadows: true,
      shadowOffset: 10,
      shadowScale: 0.94,
    },
    autoplay: {
      delay: 2600,
      pauseOnMouseEnter: true,
    },
    breakpoints: {
      640: {
        width: 320,
        height: 240,
      },
      768: {
        width: 480,
        height: 320,
      },
      1024: {
        width: 640,
        height: 480,
      },
    },
  });
  
  
