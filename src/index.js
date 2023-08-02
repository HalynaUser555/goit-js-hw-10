import { CatApiElement as CatApi } from "./js/cat-api.js";
import { Loader as LoaderApi } from "./js/loader.js";
import SlimSelect from 'slim-select';

const selectEl = document.querySelector('.breed-select');
const catInfoEl = document.querySelector('.cat-info');

const catApiInstance = new CatApi();
const loaderApiInstance = new LoaderApi();

catApiInstance.fetchBreeds()
    .then(response => {
        createElementMarkup(response);
        new SlimSelect({
            select: selectEl,
        });
    })
    .catch(data => loaderApiInstance.showError());

function createElementMarkup(data) {
    const defaultOption = `<option disabled selected>--- Select cat breed ---</option>`;
    const elementMarkup = data
        .map(({ id, name }) => `<option value=${id}>${name}</option>`)
        .join("");
    console.dir(elementMarkup);
    selectEl.insertAdjacentHTML("afterbegin", defaultOption + elementMarkup);
}

selectEl.addEventListener('change', () => {
    catInfoEl.innerHTML = ' ';
    loaderApiInstance.show();
    catApiInstance.fetchCatByBreed(selectEl.value)
        .then(data => {
            const catInfo = data[0];
            const url = catInfo.url;
            const breed = catInfo.breeds[0];
            const catEl =
                `<img class="cat-cart" src=${url} alt=${breed.name}>
                <h1 class="cat-name">${breed.name}</h1>
                <h2 class = "cat-description">${breed.description}</h2>
                <p class= "cat-temperament"><span class= "cat-span">Temperament:</span> ${breed.temperament}</p>`;
            catInfoEl.insertAdjacentHTML("beforeend", catEl);
            loaderApiInstance.hide()
        })
        .catch(data => loaderApiInstance.showError())

});


