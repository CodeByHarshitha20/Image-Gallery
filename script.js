/*Grab all the elements we need from the page*/
const galleryItems = document.querySelectorAll('.gallery-item');
const filterButtons = document.querySelectorAll('.filter-btn');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;
/*Open the lightbox when an image is clicked */
galleryItems.forEach((item, index) => {
  item.addEventListener('click', () => {
    currentIndex = index;
    openLightbox(currentIndex);
  });
});
function openLightbox(index) {
  const item = galleryItems[index];
  const imgSrc = item.querySelector('img').src;
  const captionText = item.querySelector('.caption').textContent;
  lightboxImg.src = imgSrc;
  lightboxCaption.textContent = captionText;
  lightbox.classList.add('show');
}
/*Close the lightbox*/
closeBtn.addEventListener('click', () => {
  lightbox.classList.remove('show');
});
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.classList.remove('show');
  }
});
/*Next / Previous navigation inside the lightbox */
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  openLightbox(currentIndex);
});
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  openLightbox(currentIndex);
});
/*allow keyboard arrow keys and Escape to control the lightbox */
document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('show')) return;

  if (e.key === 'ArrowRight') nextBtn.click();
  if (e.key === 'ArrowLeft') prevBtn.click();
  if (e.key === 'Escape') lightbox.classList.remove('show');
});
/*Category filter buttons*/
filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const filterValue = button.getAttribute('data-filter');
    galleryItems.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filterValue === 'all' || category === filterValue) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  });
});
