const THEME_STORAGE_KEY = 'chat-mockup-theme';

function applyTheme(theme) {
  const root = document.documentElement;
  if (theme === 'light') {
    root.dataset.theme = 'light';
  } else {
    delete root.dataset.theme;
  }
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    /* ignore */
  }
}

function loadStoredTheme() {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      applyTheme(stored);
    }
  } catch {
    /* ignore */
  }
}

function toggleTheme() {
  const isLight = document.documentElement.dataset.theme === 'light';
  applyTheme(isLight ? 'dark' : 'light');
}

function themeToggleFromContextMenu(e) {
  const t = e.target;
  if (t instanceof HTMLTextAreaElement || t instanceof HTMLInputElement || t instanceof HTMLSelectElement) {
    return;
  }
  if (t instanceof HTMLElement && t.isContentEditable) {
    return;
  }
  e.preventDefault();
  toggleTheme();
}

loadStoredTheme();

document.querySelector('.app-container')?.addEventListener('contextmenu', themeToggleFromContextMenu);

document.addEventListener('DOMContentLoaded', () => {
  const chatViewport = document.getElementById('chatViewport');
  const chatContent = document.getElementById('chatContent');
  const inputLeft = document.getElementById('inputLeft');
  const inputRight = document.getElementById('inputRight');

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
      if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
        e.preventDefault();
        addMessage(input.value, type);
        input.value = '';
        input.style.height = 'auto';
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

  // Toggle Control Panel with Shift+Tab
  const controlPanel = document.querySelector('.control-panel');
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab' && e.shiftKey) {
      e.preventDefault();
      controlPanel.classList.toggle('hidden');
      if (!controlPanel.classList.contains('hidden')) {
        inputLeft.focus();
      }
    }
  });

  inputLeft.focus();
});
