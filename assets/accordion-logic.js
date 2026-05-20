function setupProductAccordions() {
  const accordions = document.querySelectorAll('.main-aacrodaian');

  accordions.forEach(accordion => {
    if (accordion.dataset.initialized === 'true') {
      return;
    }
    accordion.dataset.initialized = 'true';

    const head = accordion.querySelector('.acc-head');
    const body = accordion.querySelector('.acc-body');
    const content = accordion.querySelector('.acc_content');

    if (head && body && content) {
      const resizeObserver = new ResizeObserver(() => {
        if (accordion.classList.contains('active')) {
          body.style.maxHeight = content.scrollHeight + 'px';
        }
      });
      resizeObserver.observe(content);

      head.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        
        const isActive = accordion.classList.contains('active');
        
        document.querySelectorAll('.main-aacrodaian.active').forEach(acc => {
          if (acc !== accordion) {
            acc.classList.remove('active');
            acc.querySelector('.acc-body').style.maxHeight = null;
          }
        });
        
        if (isActive) {
          accordion.classList.remove('active');
          body.style.maxHeight = null;
        } else {
          accordion.classList.add('active');
          body.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });
}

function initAccordions() {
  setupProductAccordions();
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1) {
            if (node.classList && node.classList.contains('main-aacrodaian')) {
              setupProductAccordions();
            } else if (node.querySelectorAll) {
              const newAccordions = node.querySelectorAll('.main-aacrodaian');
              if (newAccordions.length) {
                setupProductAccordions();
              }
            }
          }
        });
      }
    });
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAccordions);
} else {
  initAccordions();
}