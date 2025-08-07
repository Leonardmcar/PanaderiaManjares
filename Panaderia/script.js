const slider = document.getElementById('slider');
const cards = document.querySelectorAll('.card');

function detectActiveCard() {
  let center = slider.scrollLeft + slider.offsetWidth / 2;
  let closestCard = null;
  let closestDistance = Infinity;

  cards.forEach(card => {
    const cardCenter = card.offsetLeft + card.offsetWidth / 2;
    const distance = Math.abs(center - cardCenter);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestCard = card;
    }
  });

  cards.forEach(card => card.classList.remove('active'));
  if (closestCard) {
    closestCard.classList.add('active');
  }
}

// Detectar carta activa al cargar y al hacer scroll
window.addEventListener('load', () => {
  detectActiveCard();
  // Centrar carta del medio al inicio
  const middleIndex = Math.floor(cards.length / 2);
  cards[middleIndex].scrollIntoView({ behavior: 'smooth', inline: 'center' });
});

slider.addEventListener('scroll', () => {
  // Usamos `setTimeout` para mejorar el rendimiento durante scroll rápido
  clearTimeout(slider._scrollTimeout);
  slider._scrollTimeout = setTimeout(detectActiveCard, 100);
});

