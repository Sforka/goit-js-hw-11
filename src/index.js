import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';
import { Notify } from 'notiflix';
import ApiSearchImages from './js/fetch-item';
import LoadMoreButton from './js/loadMoreButton';

const refs = {
  searchForm: document.querySelector('.search-form'),
  btnAdd: document.querySelector('.load-more'),
  imgGallery: document.querySelector('.gallery'),
};

const apiSearchImages = new ApiSearchImages();
const loadMoreButton = new LoadMoreButton({ selector: `.load-more`, hidden: true, });

refs.searchForm.addEventListener('submit', searchImages);
loadMoreButton.refs.button.addEventListener('click', addImages);

function searchImages(e) {
  e.preventDefault();
  
  apiSearchImages.query = e.currentTarget.elements.searchQuery.value;
  
  if (apiSearchImages.query.trim() === '') {
    return  Notify.warning(
          'Please write current name'
        );
  }
  clearGallery();
  apiSearchImages.resetpage();
  if (apiSearchImages.query.trim() !== '') {
    apiSearchImages.fetchImages().then(data => {
      if (data.totalHits === 0) {
        loadMoreButton.hide();
        return Notify.warning(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
      loadMoreButton.disable();
      loadMoreButton.show();
      renderPhotoCard(data);
      Notify.info(`Hooray! We found ${data.totalHits} images.`);
      if (data.hits.length < 40) { 
        loadMoreButton.hide();
      }
     loadMoreButton.enable(); 
    });
  }
}

function addImages() {
  apiSearchImages.fetchImages().then(data => {
    if (data.hits.length < 40) {
      renderPhotoCard(data);
      loadMoreButton.hide();
      return Notify.warning(
        "We're sorry, but you've reached the end of search results."
      );
    }
    loadMoreButton.disable();
    renderPhotoCard(data)
    loadMoreButton.enable(); 
  })

}

async function renderPhotoCard(data) {
    console.log(data);
    const markup = await data.hits.map(image => {
      return `
      <div class="photo-card">
  <img class="card-img" src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${image.likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${image.views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${image.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${image.downloads}</b>
    </p>
  </div>
</div>
    `;
    })
    .join('');
  refs.imgGallery.insertAdjacentHTML('beforeend', markup);
}

function clearGallery() {
  refs.imgGallery.innerHTML = "";
}