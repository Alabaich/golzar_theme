document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-show-more-container]').forEach(container => {
    const limit = parseInt(container.dataset.showMoreContainer, 10) || 2;
    const items = container.querySelectorAll('[data-show-more-item]');
    const toggle = container.querySelector('[data-show-more-toggle]');

    if (items.length > limit) {
      for (let i = limit; i < items.length; i++) {
        items[i].classList.add('hidden');
      }

      const hiddenCount = items.length - limit;
      toggle.textContent = `Show ${hiddenCount} more`;
      toggle.classList.add('visible');

      toggle.addEventListener('click', () => {
        for (let i = limit; i < items.length; i++) {
          items[i].classList.remove('hidden');
        }
        toggle.classList.remove('visible');
      }, { once: true });
    }
  });
});