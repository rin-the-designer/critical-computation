var acc = document.getElementsByClassName("accordion");
const iframeSources = [
  '../lost-and-found/index.html',
  '../face-generator/index.html',
  '../experimental-clock/index.html',
  '../exquisite-corpse/index.html',
  '../optical-illusion/index.html',
  '../data-portrait/index.html',
  '../autobiographical-game/index.html'
];

for (let i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    // Get the index of the clicked accordion
    const currentIndex = Array.from(acc).indexOf(this);
    
    // Close all other accordions first
    for (let j = 0; j < acc.length; j++) {
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

const modal = document.getElementById('info-modal');
const infoIcon = document.getElementById('info-icon');
const closeBtn = document.querySelector('.close-modal');

infoIcon.onclick = function() {
  modal.style.display = 'flex';
  modal.style.flexDirection = 'column';
  
  // Inject the iframe source when opening the modal
  const archiveGameIframe = document.querySelector('.archive-game iframe');
  if (archiveGameIframe && !archiveGameIframe.src) {
    archiveGameIframe.src = '../archive-game/index.html';
  }
}

closeBtn.onclick = function() {
  modal.style.display = 'none';
  
  // Optionally, remove the iframe source when closing
  const archiveGameIframe = document.querySelector('.archive-game iframe');
  if (archiveGameIframe) {
    archiveGameIframe.removeAttribute('src');
  }
}

// Function to refresh a specific iframe
function refreshIframe(sketchNumber) {
  const iframe = document.querySelector(`#sketch-${sketchNumber} iframe`);
  if (iframe) {
    iframe.src = iframeSources[sketchNumber - 1];
  }
}

// Add viewport size change detection and reload
let previousWidth = window.innerWidth;
let previousHeight = window.innerHeight;
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

window.addEventListener('resize', function() {
    // First check if dimensions actually changed
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    
    // Skip height-only changes on mobile devices (likely due to scroll)
    if (isMobile && currentWidth === previousWidth) {
        return;
    }
    
    if (currentWidth !== previousWidth || currentHeight !== previousHeight) {
        // Check if size changed significantly (more than 25px to avoid minor changes)
        if (Math.abs(previousWidth - currentWidth) > 25 || 
            Math.abs(previousHeight - currentHeight) > 25) {
            
            // Find currently active accordion
            const activeAccordion = document.querySelector('.accordion.active');
            if (activeAccordion) {
                const currentIndex = Array.from(acc).indexOf(activeAccordion);
                const panel = activeAccordion.nextElementSibling;
                const iframe = panel.querySelector('iframe');
                
                // Reload the iframe if it exists
                if (iframe) {
                    iframe.src = iframeSources[currentIndex];
                }
            }

            // Also reload the modal iframe if modal is visible
            const modal = document.getElementById('info-modal');
            if (modal.style.display === 'flex') {
                const archiveGameIframe = document.querySelector('.archive-game iframe');
                if (archiveGameIframe) {
                    archiveGameIframe.src = '../archive-game/index.html';
                }
            }
        }
        
        // Update previous dimensions
        previousWidth = currentWidth;
        previousHeight = currentHeight;
    }
});