const  cartToggle = event => {
    const addClass = document.querySelector(".cart_toggle");
    const overLay = document.querySelector(".overlay_bg");
    addClass.classList.add("active");
    overLay.style.display = "block";
  };

  export default cartToggle;