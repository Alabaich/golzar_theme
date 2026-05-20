document.addEventListener('DOMContentLoaded', () => {
  /**
   * Tries to find and set up the product tabs.
   * @param {number} retriesLeft - The number of remaining attempts.
   */
  function initializeTabs(retriesLeft = 5) {
    const tabLinks = document.querySelectorAll('.product-tab-link');
    const tabPanes = document.querySelectorAll('.product-tab-pane');

    if (tabLinks.length > 0 && tabPanes.length > 0) {
      // Elements found, set up the event listeners
      tabLinks.forEach(link => {
        link.addEventListener('click', (event) => {
          const targetId = event.currentTarget.getAttribute('data-target');

          // Update tab links
          tabLinks.forEach(t => {
            t.classList.remove('active');
            t.setAttribute('aria-selected', 'false');
          });
          event.currentTarget.classList.add('active');
          event.currentTarget.setAttribute('aria-selected', 'true');

          // Update tab panes
          tabPanes.forEach(pane => {
            if (pane.id === targetId) {
              pane.classList.add('active');
            } else {
              pane.classList.remove('active');
            }
          });
        });
      });

    } else if (retriesLeft > 0) {
      // Elements not found, wait 2 seconds and try again
      setTimeout(() => initializeTabs(retriesLeft - 1), 2000);
    }
    // If retries run out, it will simply stop trying.
  }

  // Start the first attempt
  initializeTabs();
});
