(function() {
    let distraction = document.getElementsByTagName('a');
    let footer = document.getElementsByClassName('site-footer--categories-nav');
    if (distraction) {
        for (let i = 0; i < distraction.length; i++) {
            if (distraction[i].href == "https://stackexchange.com/" ||
                distraction[i].href == "http://stackexchange.com/") {
                    distraction[i].style.display = "inline-flex";
            }
        }
    }
    if (footer) {
        for (let i = 0; i < footer.length; i++) {
            footer[i].style.display = "block";
        }
    }
})();