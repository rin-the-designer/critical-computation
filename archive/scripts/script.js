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
        setupIframeForMobile(iframe);
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

// Add a debounce timer variable
let resizeTimer;

// Replace the existing resize event listener
window.addEventListener('resize', function() {
    // Clear any existing timer
    clearTimeout(resizeTimer);
    
    const currentWidth = window.innerWidth;
    const currentHeight = window.innerHeight;
    
    // Skip height-only changes on mobile devices (likely due to scroll)
    if (isMobile && currentWidth === previousWidth) {
        return;
    }
    
    // Wait for resize to finish before reloading
    resizeTimer = setTimeout(() => {
        // Only reload if the size changed significantly
        if (Math.abs(previousWidth - currentWidth) > 50 || 
            Math.abs(previousHeight - currentHeight) > 50) {
            
            const activeAccordion = document.querySelector('.accordion.active');
            if (activeAccordion) {
                const currentIndex = Array.from(acc).indexOf(activeAccordion);
                const panel = activeAccordion.nextElementSibling;
                const iframe = panel.querySelector('iframe');
                
                // Only reload if iframe exists and source is set
                if (iframe && iframe.src) {
                    iframe.src = iframeSources[currentIndex];
                }
            }

            // Only reload modal iframe if modal is visible
            const modal = document.getElementById('info-modal');
            if (modal.style.display === 'flex') {
                const archiveGameIframe = document.querySelector('.archive-game iframe');
                if (archiveGameIframe && archiveGameIframe.src) {
                    archiveGameIframe.src = '../archive-game/index.html';
                }
            }
            
            // Update previous dimensions
            previousWidth = currentWidth;
            previousHeight = currentHeight;
        }
    }, 250); // Wait 250ms after resize ends before reloading
});

// Add this function to set proper iframe attributes
function setupIframeForMobile(iframe) {
    if (iframe) {
        // Enable touch interactions while preventing scrolling
        iframe.style.pointerEvents = 'auto';
        iframe.style.overflow = 'hidden';
        // Prevent any iOS bounce effects
        iframe.style.overscrollBehavior = 'none';
    }
}