import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './refs';
import { createGalleryMarkup } from './createMarkup';
import { getImages } from './axiosService';

const { searchForm, gallery, loadMoreBtn } = refs;

// const searchParams = new URLSearchParams({
//   key: '30692971-b147f9a702170160ab831dd90',
//   image_type: 'photo',
//   q: 'yellow+flowers',
//   orientation: 'horizontal',
//   safesearch: 'true',
//   page: 1,
//   per_page: 40,
// });

// async function addMarkup() {
//   try {
//     const response = await fetch(`https://pixabay.com/api/?${searchParams}`);
//     const data = await response.json();
//     const markup = await createGalleryMarkup(data);
//     gallery.innerHTML = markup;
//   } catch (error) {
//     Notiflix.Notify.failure(error.message);
//     console.error(error);
//   }
// }

async function addMarkup() {
  try {
    const data = await getImages();
    const markup = await createGalleryMarkup(data);
    gallery.innerHTML = markup;
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    console.error(error);
  }
}

addMarkup();

// const lightBox = new SimpleLightbox('.gallery a', {
//   captionsData: 'alt',
//   captionDelay: 250,
// });
