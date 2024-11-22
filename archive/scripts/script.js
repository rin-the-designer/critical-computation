var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    // Close all other accordions first
    for (var j = 0; j < acc.length; j++) {
      var otherPanel = acc[j].nextElementSibling;
      if (this !== acc[j]) {
        acc[j].classList.remove("active");
        otherPanel.style.display = "none";
      }
    }

    // Toggle the clicked accordion
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}