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

export const updateItem = (id, item) => {
    return fetch(`${_apiURL}/${id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item)
    });
};

export const getItemsByUserId = (userId) => {
    return fetch(`${_apiURL}/${userId}/userId`)
        .then((res) => res.json());
};

export const deactivateItem = (id) => {
    return fetch(`${_apiURL}/${id}/deactivate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    });
};

export const reactivateItem = (id) => {
    return fetch(`${_apiURL}/${id}/reactivate`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
    });
};

export const getBorrowedItems = (userId) => {
    return fetch(`${_apiURL}/borrowed/${userId}`)
        .then((res) => res.json());
};