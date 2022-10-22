import Notiflix, { Notify } from 'notiflix';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { refs } from './refs';

import { createGalleryMarkup } from './createMarkup';
import { getImages, getMoreImages, searchParams } from './axiosService';
import { spinnerPlay, spinnerStop } from './spinner';

const lightbox = new SimpleLightbox('.gallery a');

const { searchForm, gallery, loadMoreBtn } = refs;

const onFormSubmit = function (event) {
  event.preventDefault();
  const {
    elements: { searchQuery },
  } = event.target;
  const searchQ = searchQuery.value.trim().toLowerCase();
  if (!searchQ) {
    Notify.failure('Search field is empty!');
    resetGallery();
    return;
  }
  searchImages(searchQ);
};

const onLoadMoreClick = async function (event) {
  spinnerPlay();
  event.preventDefault();
  try {
    loadMoreBtn.classList.add('is-hidden');
    const data = await getMoreImages();
    const markup = await createGalleryMarkup(data);
    gallery.insertAdjacentHTML('beforeend', markup);
    spinnerStop();
    isLoadMoreavailible(data.totalHits);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    console.error(error);
  }
};

async function searchImages(searchQ) {
  try {
    spinnerPlay();
    const data = await getImages(searchQ);

    if (data.hits.length === 0) {
      console.log(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      spinnerStop();
      resetGallery();
      return;
    }
    const markup = await createGalleryMarkup(data);
    console.log(data);
    Notify.success(`Hooray! We found ${data.totalHits} images.`);
    gallery.innerHTML = markup;
    lightbox.refresh();
    spinnerStop();
    isLoadMoreavailible(data.totalHits);
  } catch (error) {
    Notiflix.Notify.failure(error.message);
    console.error(error);
    spinnerStop();
  }
}

const resetGallery = function () {
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('is-hidden');
};

const isLoadMoreavailible = function (totalHits) {
  availiblePages = Math.round(totalHits / 40);
  console.log('page#', searchParams.page, 'availible Pages', availiblePages);
  if (searchParams.page < availiblePages) {
    loadMoreBtn.classList.remove('is-hidden');
  } else if (totalHits > 40) {
    console.log("We're sorry, but you've reached the end of search results.");
    Notify.info("We're sorry, but you've reached the end of search results.");
  }
};

loadMoreBtn.addEventListener('click', onLoadMoreClick);
searchForm.addEventListener('submit', onFormSubmit);
