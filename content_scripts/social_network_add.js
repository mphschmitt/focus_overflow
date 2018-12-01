(function(){
    let distraction = document.getElementsByClassName("site-footer--copyright");
    if (distraction) {
        for (let i = 0; i < distraction.length; i++) {
            distraction[i].style.display = "flex";
        }
    }
})();