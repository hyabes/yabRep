// HECTOR YABES
// yab3.dev

// --------------------
// ROUTES / COMMANDS
// --------------------
const routes = {
  help: 'help.txt',
  resume: 'resume.html',
  sophia: 'sophia.html',
  jellyfin: `http://${window.location.hostname}:8096`,
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
  // If invalid, do nothing - just cleared the input
});

// Focus input on page load
input.focus();
