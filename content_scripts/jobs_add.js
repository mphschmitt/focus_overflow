(function() {
    let distraction = document.getElementById("hireme");
    let distraction2 = document.getElementById("dfp-tlb");
    let distraction3 = document.getElementById("dfp-tsb");
    let distraction4 = document.getElementById("clc-tsb");
    let distraction5 = document.getElementById("clc-tlb");
    let distraction6 = document.getElementById("nav-jobs");
    let distraction7 = document.getElementsByTagName('a');
    if (distraction) {
        distraction.style.display = "block";
    }
    if (distraction2) {
        distraction2.style.display = "block";
    }
    if (distraction3) {
        distraction3.style.display = "block";
    }
    if (distraction4) {
        distraction4.style.display = "block";
    }
    if (distraction5) {
        distraction5.style.display = "block";
    }
    if (distraction6) {
        distraction6.style.display = "block";
    }
    if (distraction7) {
        for (let i = 0; i < distraction7.length; i++) {
            if (distraction7[i].href == "https://stackoverflow.com/jobs" ||
                distraction7[i].href == "http://stackoverflow.com/jobs") {
                    distraction7[i].style.display = "block";
                }
        }
    }
})();