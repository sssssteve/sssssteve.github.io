for (const gallery of document.querySelectorAll('.trial-gallery')) {
  const picker = gallery.querySelector('select');
  const video = gallery.querySelector('video');
  picker.addEventListener('change', () => {
    video.src = picker.value;
    video.setAttribute('aria-label', picker.selectedOptions[0].textContent);
    video.load();
  });
}
