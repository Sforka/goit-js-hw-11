const API_KEy = '33740646-da4437d8313f84f6f28849903';
import { Notify } from 'notiflix';
export default class ApiSearchImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const URL = `https://pixabay.com/api/?key=${API_KEy}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;
    return fetch(URL)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.status);
        }
        return response.json();
      })
      .then(data => {
        this.page += 1
      return data})
      .catch(error => {
        Notify.failure('Sorry. Please try again.');
      });
  }

  resetpage() {
    this.page = 1;
  }
  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
