// Pocetak za dohvat podataka sa backenda
export async function getPapers() {
  try {
    const response = await fetch('/api/papers');
    return await response.json();
  } catch (error) {
    console.error('Greška pri dohvatu radova:', error);
    return [];
  }
}