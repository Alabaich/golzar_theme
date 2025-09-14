if (!customElements.get('product-modal')) {
  customElements.define(
    'product-modal',
    class ProductModal extends ModalDialog {
      constructor() {
        super();

        // Добавляем обработчик pointerup на фазе capture, чтобы остановить событие до родителя
        this._stopPointerUp = (event) => {
          // Проверяем, если клик вне deferred-media или product-model — блокируем закрытие
          if (
            event.pointerType === 'mouse' &&
            !event.target.closest('deferred-media, product-model')
          ) {
            event.stopImmediatePropagation();
            // Можно также event.preventDefault();
          }
        };

        this.addEventListener('pointerup', this._stopPointerUp, { capture: true });
      }

      disconnectedCallback() {
        if (super.disconnectedCallback && typeof super.disconnectedCallback === 'function') {
          super.disconnectedCallback();
        }
        this.removeEventListener('pointerup', this._stopPointerUp, { capture: true });
      }

      show(opener) {
        super.show(opener);
        this.showActiveMedia();
      }

      showActiveMedia() {
        this.querySelectorAll(
          `[data-media-id]:not([data-media-id="${this.openedBy.getAttribute('data-media-id')}"])`
        ).forEach((element) => {
          element.classList.remove('active');
        });
        const activeMedia = this.querySelector(`[data-media-id="${this.openedBy.getAttribute('data-media-id')}"]`);
        const activeMediaTemplate = activeMedia.querySelector('template');
        const activeMediaContent = activeMediaTemplate ? activeMediaTemplate.content : null;
        activeMedia.classList.add('active');
        activeMedia.scrollIntoView();

        const container = this.querySelector('[role="document"]');
        container.scrollLeft = (activeMedia.width - container.clientWidth) / 2;

        if (
          activeMedia.nodeName == 'DEFERRED-MEDIA' &&
          activeMediaContent &&
          activeMediaContent.querySelector('.js-youtube')
        ) {
          activeMedia.loadContent();
        }
      }
    }
  );
}
