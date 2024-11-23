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
    if (panel.style.display === "flex") {
      panel.style.display = "none";
    } else {
      panel.style.display = "flex";
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
    iframe.src = iframe.src;
  }
}

// Function to hide navigation elements in iframes
function hideIframeNavigation() {
  const iframes = document.getElementsByTagName('iframe');
  
  Array.from(iframes).forEach(iframe => {
    iframe.addEventListener('load', function() {
      try {
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        const navElements = iframeDocument.getElementsByClassName('nav');
        
        Array.from(navElements).forEach(nav => {
          nav.style.cssText = 'display: none !important';
        });
      } catch (e) {
        console.error('Error accessing iframe content:', e);
      }
    });
  });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', hideIframeNavigation);