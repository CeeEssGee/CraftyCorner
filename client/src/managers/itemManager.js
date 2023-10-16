const _apiURL = "api/item";

export const getItems = () => {
    return fetch(_apiURL)
        .then((res) => res.json());
};

export const getItemById = (id) => {
    return fetch(`${_apiURL}/${id}`)
        .then((res) => res.json());
};