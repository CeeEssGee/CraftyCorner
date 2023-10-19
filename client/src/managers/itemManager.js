const _apiURL = "/api/item";

export const getItems = () => {
    return fetch(_apiURL)
        .then((res) => res.json());
};

export const getItemById = (id) => {
    return fetch(`${_apiURL}/${id}`)
        .then((res) => res.json());
};

export const createItem = (item) => {
    return fetch(_apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
    }).then((res) => res.json());
};

export const deleteItem = (id) => {
    return fetch(`${_apiURL}/${id}`, {
        method: "DELETE"
    });
};