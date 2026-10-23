// public/js/script.js
document.addEventListener('DOMContentLoaded', () => {
  // Primjer jednostavne interaktivnosti: potvrda prije deaktivacije ili brisanja
  const actionButtons = document.querySelectorAll('button');

  actionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      if (button.textContent.includes('Deaktiviraj') || button.textContent.includes('Obriši')) {
        const potvrda = confirm('Jeste li sigurni da želite izvršiti ovu akciju?');
        if (!potvrda) {
          e.preventDefault(); // Prekida akciju ako korisnik klikne "Odustani"
        }
      }
    });
  });
});