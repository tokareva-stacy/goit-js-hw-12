import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";

import iziToast from 'izitoast';

import { getImagesByQuery } from './js/pixabay-api.js';

import { createGallery, clearGallery, showLoader, hideLoader } from './js/render-functions.js';

const searchForm = document.querySelector('.form');
const searchInput = searchForm.elements['search-text']; 
const gallery = document.querySelector('.gallery'); 

searchForm.addEventListener('submit', onSearchSubmit);

async function onSearchSubmit(event) {
  event.preventDefault();

  const query = searchInput.value.trim(); 

  if (query === '') {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return; 
  }

  clearGallery(); 
  showLoader(); 

  try {
    const data = await getImagesByQuery(query); 

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Information',
        message: 'Sorry, there are no images matching your request. Please try again!',
        position: 'topRight',
      });
    } else {
      createGallery(data.hits);
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later.',
      position: 'topRight',
    });
    console.error('Error while searching images:', error); 
  } finally {
    hideLoader(); 
    searchForm.reset(); 
  }
}