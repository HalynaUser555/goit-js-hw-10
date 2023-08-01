import Notiflix from 'notiflix';

const loaderEl = document.querySelector('.loader');

export class Loader {

    show() {
        console.log('show');
        loaderEl.classList.remove('is-hidden');
    }

    hide() {
        console.log('hide');
        loaderEl.classList.add('is-hidden');
    }

    showError() {
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        console.log('error');
    }
}