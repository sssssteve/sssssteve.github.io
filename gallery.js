const cards = Array.from(document.querySelectorAll('.robots button'));
const viewer = document.querySelector('#viewer');
const image = viewer.querySelector('img');
const name = document.querySelector('#robot-name');
let selected = 0;

function selectRobot(index) {
  selected = (index + cards.length) % cards.length;
  const thumbnail = cards[selected].querySelector('img');
  image.src = thumbnail.src;
  image.alt = thumbnail.alt;
  name.textContent = thumbnail.alt;
}

for (const [index, card] of cards.entries()) {
  card.addEventListener('click', () => {
    selectRobot(index);
    viewer.showModal();
  });
  card.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.setProperty('--x', x * 16 + 'px');
    card.style.setProperty('--y', y * 10 - 4 + 'px');
    card.style.setProperty('--r', x * 6 + 'deg');
  });
}

viewer.querySelector('.prev').onclick = () => selectRobot(selected - 1);
viewer.querySelector('.next').onclick = () => selectRobot(selected + 1);
viewer.querySelector('.close').onclick = () => viewer.close();
viewer.addEventListener('click', event => {
  if (event.target !== viewer) return;
  const box = viewer.getBoundingClientRect();
  if (event.clientX < box.left || event.clientX > box.right ||
      event.clientY < box.top || event.clientY > box.bottom) viewer.close();
});
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') selectRobot(selected - 1);
  if (event.key === 'ArrowRight') selectRobot(selected + 1);
});
