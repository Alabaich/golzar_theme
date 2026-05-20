/**
 * Opens the Shopify chat widget
 */
function openChatBox(event) {
  event.preventDefault();
  try {
    const shopifyChatHost = document.querySelector('inbox-online-store-chat');
    if (shopifyChatHost && shopifyChatHost.shadowRoot) {
      const chatToggleButton = shopifyChatHost.shadowRoot.querySelector('button.chat-toggle');
      if (chatToggleButton) chatToggleButton.click();
    }
  } catch (error) {}
}

/**
 * Opens the Quote Modal and populates data
 */
function openQuoteModal(event) {
    if (event) event.preventDefault();
    const modal = document.getElementById('quote-modal');
    const titleDisplay = document.getElementById('quote-product-title');
    const detailsInput = document.getElementById('quote-product-details-input');
    
    const productForm = document.querySelector('form[action="/cart/add"]');
    const variantIdInput = productForm ? productForm.querySelector('[name="id"]') : null;
    const currentVariantId = variantIdInput ? variantIdInput.value : null;
    
    const variantData = (typeof productVariantsData !== 'undefined' && currentVariantId) ? productVariantsData[currentVariantId] : {};

    if (typeof productData !== 'undefined') {
        if (titleDisplay) titleDisplay.textContent = productData.title;
        if (detailsInput) {
            detailsInput.value = "Product: " + productData.title + " | " +
                                 "Handle: " + productData.handle + " | " +
                                 "Variant ID: " + (currentVariantId || 'N/A') + " | " +
                                 "SKU: " + (variantData.sku || 'N/A');
        }
    }
    
    if(document.getElementById('quote-success-message')) document.getElementById('quote-success-message').style.display = 'none';
    const formEl = document.getElementById('quote-form');
    if(formEl) {
        formEl.reset();
        formEl.style.display = 'block'; 
    }
    if(modal) modal.style.display = 'block';
}

/**
 * Closes the Quote Modal
 */
function closeQuoteModal() {
    const modal = document.getElementById('quote-modal');
    if(modal) modal.style.display = 'none';
}

/**
 * Handles Success Message after page reload
 */
function handleQuoteSuccess() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('form_type') === 'contact' && params.get('success') === 'true') {
        const formEl = document.getElementById('quote-form');
        const msgEl = document.getElementById('quote-success-message');
        const modal = document.getElementById('quote-modal');
        
        if(formEl) formEl.style.display = 'none';
        if(msgEl) msgEl.style.display = 'block';
        if(modal) modal.style.display = 'block';

        if (history.replaceState) {
            const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
            history.replaceState({path: cleanUrl}, '', cleanUrl);
        }
        setTimeout(closeQuoteModal, 5000); 
    }
}

/**
 * Main Logic Function
 */
function initProductAvailability() {
  if (typeof productVariantsData === 'undefined' || typeof productData === 'undefined') {
    console.error('Product data not found.');
    return;
  }

  // --- 1. ROBUST TAG CHECK (Ignores spaces and case) ---
  const ASK_FOR_QUOTE_TAG = 'ask-for-quote';
  let isAskForQuote = false;

  // Loop through tags, clean them (trim spaces + lowercase), and check
  if (productData.tags && Array.isArray(productData.tags)) {
      for (var i = 0; i < productData.tags.length; i++) {
          var cleanTag = productData.tags[i].toLowerCase().trim();
          if (cleanTag === ASK_FOR_QUOTE_TAG) {
              isAskForQuote = true;
              break;
          }
      }
  }
  
  if (isAskForQuote) {
      // Hide all standard blocks
      const idsToHide = ['buy-buttons-block', 'delivery-time-block', 'in-stock-block', 'discontinued-block', 'chat-block', 'sold-out-block'];
      idsToHide.forEach(function(id) {
          const el = document.getElementById(id);
          if(el) el.style.display = 'none';
      });
      
      const readyShip = document.querySelector('.ready-to-ship-indicator');
      if (readyShip) readyShip.style.display = 'none';

      // FORCE SHOW Quote button
      const quoteBtn = document.getElementById('quote-button-block');
      if(quoteBtn) quoteBtn.style.display = 'block';
      
      return; // STOP execution here
  }
  
  // Ensure quote button is hidden if tag is NOT present
  const quoteBtn = document.getElementById('quote-button-block');
  if(quoteBtn) quoteBtn.style.display = 'none';

  // --- 2. STANDARD AVAILABILITY LOGIC ---
  const productForm = document.querySelector('form[action="/cart/add"]');
  const variantIdInput = productForm ? productForm.querySelector('[name="id"]') : null;
  
  if (!productForm || !variantIdInput) {
    return;
  }

  const blocks = {
    delivery: document.getElementById('delivery-time-block'),
    deliveryValue: document.getElementById('delivery-time-value'),
    discontinued: document.getElementById('discontinued-block'),
    chat: document.getElementById('chat-block'),
    chatButtonText: document.getElementById('chat-button-text'),
    backorderMessage: document.getElementById('backorder-message'),
    backorderText: document.getElementById('backorder-text-content'),
    inStock: document.getElementById('in-stock-block'),
    buyButtons: document.getElementById('buy-buttons-block'),
    soldOut: document.getElementById('sold-out-block')
  };

  const updateAvailability = () => {
    const currentVariantId = variantIdInput.value;
    const variantData = productVariantsData[currentVariantId] || {};

    console.log("--- AVAILABILITY SCRIPT UPDATED ---");
    console.log("Raw call_for_availability:", productData.call_for_availability);
    console.log("Type of call_for_availability:", typeof productData.call_for_availability);

    // Reset
    if(blocks.delivery) blocks.delivery.style.display = 'none';
    if(blocks.discontinued) blocks.discontinued.style.display = 'none';
    if(blocks.chat) blocks.chat.style.display = 'none';
    if(blocks.inStock) blocks.inStock.style.display = 'none';
    if(blocks.soldOut) blocks.soldOut.style.display = 'none';
    if(blocks.buyButtons) blocks.buyButtons.style.display = 'block';
    if(blocks.chatButtonText) blocks.chatButtonText.textContent = 'Check Availability';
    if(blocks.backorderMessage) blocks.backorderMessage.style.display = 'none';

    const readyShip = document.querySelector('.ready-to-ship-indicator');
    if (readyShip) readyShip.style.display = 'none';

    // Vendor Check
    if (productData.vendor === 'Delta') {
      if(blocks.buyButtons) blocks.buyButtons.style.display = 'none';
      if(blocks.backorderMessage) blocks.backorderMessage.style.display = 'none';
      if(blocks.chat) blocks.chat.style.display = 'block';
      if(blocks.chatButtonText) blocks.chatButtonText.textContent = 'Chat For Details';
      return;
    }

    // Discontinued
    if (variantData.discontinued === true) {
      if(blocks.discontinued) blocks.discontinued.style.display = 'flex';
      if(blocks.buyButtons) blocks.buyButtons.style.display = 'none';
      return;
    }

    // Sold Out
    if (variantData.available === false) {
      if(blocks.soldOut) blocks.soldOut.style.display = 'block';
      if(blocks.buyButtons) blocks.buyButtons.style.display = 'none';
      return;
    }

    // Delivery Logic
    const deliveryTime = variantData.delivery || productData.delivery;
    const inStockKeywords = ["1-2 Business Days", "1-2 business days", "1-2 days", "1-2 Days", "3 business days", "3 days", "3 Business Days"];
    let isFastInStockDelivery = false;
    
    if (deliveryTime) {
      for (let i = 0; i < inStockKeywords.length; i++) {
        if (deliveryTime.indexOf(inStockKeywords[i]) !== -1) {
          isFastInStockDelivery = true; break;
        }
      }
    }

    // const isBackOrder = (String(productData.call_for_availability).trim().toLowerCase() !== 'false');

    const cfa = productData.call_for_availability;
    const isBackOrder = (cfa === null || cfa === undefined || cfa === true || cfa === 'true' || cfa === 'True');

    if (deliveryTime) {
      if (isBackOrder && !isFastInStockDelivery) {
        if(blocks.chat) blocks.chat.style.display = 'block';
        if(blocks.backorderMessage) blocks.backorderMessage.style.display = 'flex';
        if(blocks.backorderText) blocks.backorderText.innerHTML = '<b>Available on backorder – Delivery in ' + deliveryTime + '.</b> <br> Our team can provide the most up-to-date delivery timeline, please reach out.';
        // if(blocks.buyButtons) blocks.buyButtons.style.display = 'none';
      } else {
        if(blocks.delivery) blocks.delivery.style.display = 'flex';
        if(blocks.deliveryValue) blocks.deliveryValue.textContent = deliveryTime;
      }
    } else {
      if (isBackOrder) {
        if(blocks.chat) blocks.chat.style.display = 'block';
        if(blocks.backorderMessage) blocks.backorderMessage.style.display = 'flex';
        if(blocks.backorderText) blocks.backorderText.innerHTML = '<b>Available on backorder.</b><br>Our team can provide the most up-to-date delivery timeline, please reach out.';
        // if(blocks.buyButtons) blocks.buyButtons.style.display = 'none';
      } else {
        if(blocks.inStock) blocks.inStock.style.display = 'flex';
      }
    }
  };

  productForm.addEventListener('change', updateAvailability);
  productForm.addEventListener('shopify:variant:change', updateAvailability); 
  updateAvailability();
}


// --- INITIALIZATION ---
let hasAvailabilityInitialized = false;

function tryInitAvailability() {
  if (hasAvailabilityInitialized) return;

  const dataReady = (typeof productVariantsData !== 'undefined' && typeof productData !== 'undefined');

  if (dataReady) {
    initProductAvailability();
    hasAvailabilityInitialized = true;
  }
}

document.addEventListener('DOMContentLoaded', function() {
    tryInitAvailability();
    handleQuoteSuccess();
});

setTimeout(function() {
    tryInitAvailability();
    handleQuoteSuccess();
}, 2000);

window.addEventListener('keydown', function(event) { if (event.key === 'Escape') closeQuoteModal(); });
window.onclick = function(event) { if (event.target === document.getElementById('quote-modal')) closeQuoteModal(); }