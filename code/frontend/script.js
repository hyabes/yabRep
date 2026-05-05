// HECTOR YABES
// yab3.dev
// script.js

// --------------------
// ROUTES / COMMANDS
// --------------------
const routes = {
  help: 'help.txt',
  resume: 'resume.html',
  sophia: 'sophia.html',
  jellyfin: 'https://jellyfin.yab3.dev',
};

// --------------------
// ELEMENTS
// --------------------
const input = document.getElementById('key');

// --------------------
// COMMAND HANDLER
// --------------------
input.addEventListener('keydown', (e) => {
  if (e.key !== 'Enter') return;
  
  const value = input.value.trim().toLowerCase();
  
  // Clear input
  input.value = '';
  
  if (!value) return;
  
  // Check if command exists
  const target = routes[value];
  
  if (target) {
    // Valid command - navigate
    if (value === 'help') {
      // Open help in small window
      window.open(
        target,
        'helpWindow',
        'width=420,height=320,resizable=yes,scrollbars=yes'
      );
    } else {
      // Normal navigation
      window.location.href = target;
    }
  }
});

// Focus input on page load
input.focus();
