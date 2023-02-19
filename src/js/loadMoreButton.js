import { Loading } from 'notiflix/build/notiflix-loading-aio';

export default class loadMoreButton {
  constructor({ selector, hidden = false }) {
    this.refs = this.getRefs(selector);

    hidden && this.hide();
  }

  getRefs(selector) {
    const refs = {};
    refs.button = document.querySelector(selector);
    return refs;
  }

  enable() {
      this.refs.button.dissable = false;
      Loading.remove(1000);
  }

  disable() {
    this.refs.button.dissable = true;
    Loading.circle('Loading...');
  }

  show() {
    this.refs.button.classList.remove('is-hidden');
  }

  hide() {
    this.refs.button.classList.add('is-hidden');
  }
}
