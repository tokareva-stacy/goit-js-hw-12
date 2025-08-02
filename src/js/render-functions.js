import SimpleLightbox from 'simplelightbox';

const galleryContainer = document.querySelector('.gallery');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt', 
  captionDelay: 250,  
});


export function createGallery(images) {
  if (!galleryContainer) {
    console.error('Gallery container not found. Make sure an element with class "gallery" exists.');
    return;
  }

  const markup = images.map(image => `
    <li class="gallery-item">
      <a class="gallery-link" href="${image.largeImageURL}">
        <img
          class="gallery-image"
          src="${image.webformatURL}"
          alt="${image.tags}"
        />
        <div class="info">
          <p class="info-item"><b>Likes</b> ${image.likes}</p>
          <p class="info-item"><b>Views</b> ${image.views}</p>
          <p class="info-item"><b>Comments</b> ${image.comments}</p>
          <p class="info-item"><b>Downloads</b> ${image.downloads}</p>
        </div>
      </a>
    </li>
  `).join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);

  lightbox.refresh();
}

export function clearGallery() {
  if (galleryContainer) {
    galleryContainer.innerHTML = '';
  }
}

const loader = document.querySelector('.loader');

export function showLoader() {
  if (loader) {
    loader.classList.add('is-visible');
  }
}

export function hideLoader() {
  if (loader) {
    loader.classList.remove('is-visible'); 
  }
}