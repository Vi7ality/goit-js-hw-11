import Notiflix from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { refs } from './refs';
import { createGalleryMarkup } from './createMarkup';

const { searchForm, gallery, loadMoreBtn } = refs;

const API_KEY = '30692971-b147f9a702170160ab831dd90';

const searchParams = new URLSearchParams({
  key: API_KEY,
  image_type: 'photo',
  q: 'yellow+flowers',
  orientation: 'horizontal',
  safesearch: 'true',
  page: 1,
  per_page: 40,
});

async function getImages() {
  try {
    const response = await fetch(`https://pixabay.com/api/?${searchParams}`);
    const data = await response.json();
    const markup = await createGalleryMarkup(data);
    gallery.innerHTML = markup;
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    console.error(error);
  }
}

getImages();

const lightBox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});
