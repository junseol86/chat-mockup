document.addEventListener('DOMContentLoaded', () => {
  const chatViewport = document.getElementById('chatViewport');
  const chatContent = document.getElementById('chatContent');
  const inputLeft = document.getElementById('inputLeft');
  const inputRight = document.getElementById('inputRight');

  // Function to add a message
  function addMessage(text, type) {
    if (!text.trim()) return;

    const messageEl = document.createElement('div');
    messageEl.classList.add('message', type);
    messageEl.textContent = text;

    chatContent.appendChild(messageEl);
    scrollToBottom();
  }

  // Scroll to bottom
  function scrollToBottom() {
    chatViewport.scrollTop = chatViewport.scrollHeight;
  }

  // Handle Input Events
  function handleInput(input, type) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Prevent newline
        addMessage(input.value, type);
        input.value = '';
        input.style.height = 'auto'; // Reset height
      }
    });

    // Auto-resize
    input.addEventListener('input', () => {
      input.style.height = 'auto';
      input.style.height = input.scrollHeight + 'px';
    });
  }

  handleInput(inputLeft, 'other');
  handleInput(inputRight, 'me');

  // Toggle Control Panel with Tab
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault(); // Prevent focus change
      const controlPanel = document.querySelector('.control-panel');
      controlPanel.classList.toggle('hidden');
    }
  });

  // Initial focus (optional)
  inputLeft.focus();
});
