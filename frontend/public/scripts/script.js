// public/js/script.js
document.addEventListener('DOMContentLoaded', () => {
  const actionButtons = document.querySelectorAll('button');
// potvrda prije deaktivacije ili brisanja
  actionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (button.textContent.includes('Deaktiviraj') || button.textContent.includes('Obriši')) {
        const potvrda = confirm('Jeste li sigurni da želite izvršiti ovu akciju?');
        if (!potvrda) {
          e.preventDefault();
        }
      }
    });
  });
});

