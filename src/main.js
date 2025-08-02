import "izitoast/dist/css/iziToast.min.css";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from 'izitoast';
import { getImagesByQuery } from './js/pixabay-api.js';
import { 
  createGallery, 
  clearGallery, 
  showLoader, 
  hideLoader,
  showLoadMoreBtn, 
  hideLoadMoreBtn 
} from './js/render-functions.js';

let page = 1;
let currentQuery = '';
const perPage = 15; 

const searchForm = document.querySelector('.form');
const searchInput = searchForm.elements['search-text']; 
const gallery = document.querySelector('.gallery'); 
const loadMoreBtn = document.querySelector('.load-more-btn');

searchForm.addEventListener('submit', onSearchSubmit);
loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function fetchImages() {
  showLoader(); 
  hideLoadMoreBtn(); 
  
  try {
    const data = await getImagesByQuery(currentQuery, page, perPage); 
    
    if (data.hits.length === 0) {
      iziToast.info({
        title: 'Information',
        message: "Sorry, there are no images matching your request. Please try again!",
        position: 'topRight',
      });

      if (page > 1) {
        iziToast.info({
            title: 'Information',
            message: "We're sorry, but you've reached the end of search results.",
            position: 'topRight',
        });
      }
      return;
    }
    
    createGallery(data.hits);
    
    if (page > 1) {
      const cardHeight = gallery.firstElementChild.getBoundingClientRect().height;
      window.scrollBy({
        top: 2 * cardHeight,
        behavior: 'smooth',
      });
    }

    const totalPages = Math.ceil(data.totalHits / perPage);
    if (page < totalPages) {
      showLoadMoreBtn(); 
    } else {
      iziToast.info({
        title: 'Information',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong! Please try again later.',
      position: 'topRight',
    });
    console.error('Error while fetching images:', error); 
  } finally {
    hideLoader(); 
  }
}

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

  currentQuery = query;
  page = 1;
  clearGallery();
  hideLoadMoreBtn();

  await fetchImages();

  searchForm.reset(); 
}

async function onLoadMoreClick() {
  page += 1; 
  await fetchImages();
}