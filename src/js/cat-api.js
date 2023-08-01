import axios from 'axios';

axios.defaults.headers.common['x-api-key']
    = 'live_bKhxiyQ4CGTPn7oWKzP7L32Rk0dnKuFEz8vNB5dWnfZ52ty4tVQpL7RYYyo42yeu';

const ADDRESS_URL = 'https://api.thecatapi.com/v1';

export class CatApiElement {
    constructor() {
        this.page = 1;
    }

    fetchBreeds() {
        return axios.get(`${ADDRESS_URL}/breeds`)
            .then(response => {
                if (response.status != 200) {
                    throw new Error(response.status);
                }
                return response.data;
            });
    };

    fetchCatByBreed(breedId) {
        return axios.get(`${ADDRESS_URL}/images/search?breed_ids=` + breedId)
            .then(response => {
                if (response.status != 200) {
                    throw new Error(response.status);
                }
                return response.data;
            })
            // .then(console.log)
            .catch(console.log);
    }
}
