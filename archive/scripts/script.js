var acc = document.getElementsByClassName("accordion");
var i;

// Array of iframe sources
const iframeSources = [
  'https://editor.p5js.org/rin-the-designer/full/Ug7KrPrsO',
  'https://editor.p5js.org/rin-the-designer/full/EneGuaIXh',
  'https://editor.p5js.org/rin-the-designer/full/wdZfz3XH9',
  'https://editor.p5js.org/rin-the-designer/full/k2-mY4-Ii',
  'https://editor.p5js.org/rin-the-designer/full/9P0WoqBL9',
  'https://editor.p5js.org/rin-the-designer/full/NhWdU_dkj',
  'https://rin-the-designer.github.io/critical-computation/autobiographical-game/'
];

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    // Get the index of the clicked accordion
    const currentIndex = Array.from(acc).indexOf(this);
    
    // Close all other accordions first
    for (var j = 0; j < acc.length; j++) {
      var otherPanel = acc[j].nextElementSibling;
      if (this !== acc[j]) {
        acc[j].classList.remove("active");
        otherPanel.style.display = "none";
        // Remove src from other iframes when closing
        const otherIframe = otherPanel.querySelector('iframe');
        if (otherIframe) {
          otherIframe.removeAttribute('src');
        }
      }
    }

    // Toggle the clicked accordion
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    
    if (panel.style.display === "flex") {
      panel.style.display = "none";
      // Remove src when closing
      const iframe = panel.querySelector('iframe');
      if (iframe) {
        iframe.removeAttribute('src');
      }
    } else {
      panel.style.display = "flex";
      // Inject the corresponding iframe source
      const iframe = panel.querySelector('iframe');
      if (iframe) {
        iframe.src = iframeSources[currentIndex];
      }
    }
  });
}

// Add this to your existing script file
const modal = document.getElementById('info-modal');
const infoIcon = document.getElementById('info-icon');
const closeBtn = document.querySelector('.close-modal');

infoIcon.onclick = function() {
  modal.style.display = 'flex';
  modal.style.flexDirection = 'column';
}

closeBtn.onclick = function() {
  modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
}

// Function to refresh a specific iframe
function refreshIframe(sketchNumber) {
  const iframe = document.querySelector(`#sketch-${sketchNumber} iframe`);
  if (iframe) {
    iframe.src = iframeSources[sketchNumber - 1];
  }
}