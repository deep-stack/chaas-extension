/*
 * Copyright (c) 2024 DeepStack Software Pvt. Ltd.
 */

const CHATBOT_URL = 'https://chaas.site';

(function () {
  const iframe = document.createElement('iframe');

  iframe.src = `${CHATBOT_URL}/chat`;
  // TODO: Inject css
  iframe.style.position = 'fixed';
  iframe.style.bottom = '20px';
  iframe.style.right = '20px';
  iframe.style.zIndex = '999999';
  iframe.style.width = '168px';
  iframe.style.height = '42px';
  iframe.style.border = 'none';
  iframe.style.display = 'none';
  iframe.style.borderRadius = '11px';
  iframe.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
  iframe.style.overflow = 'hidden';
  iframe.style.transition = 'width 0.3s ease, height 0.3s ease';

  document.body.appendChild(iframe);

  window.addEventListener('message', (event) => {
    if (event.origin !== CHATBOT_URL) return;

    if (event.data.type === 'REQUEST_PARENT_URL') {
      const currentURL = window.location.href;

      iframe.contentWindow.postMessage(
        { type: 'PARENT_URL', url: currentURL },
        CHATBOT_URL,
      );
    }

    if (event.data.type === 'CHATBOT_STYLES') {
      iframe.style.width = event.data.isChatOpen ? '800px' : '168px';
      iframe.style.height = event.data.isChatOpen ? '70vh' : '42px';
      iframe.style.display = 'block';
    }
  });
})();
