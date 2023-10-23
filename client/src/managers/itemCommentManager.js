const _apiURL = "/api/itemComment";

export const getItemComments = (itemId) => {
    return fetch(`${_apiURL}/${itemId}`)
        .then((res) => res.json());
};

export const createItemComment = (itemComment) => {
    return fetch(_apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(itemComment),
    }).then((res) => res.json());
};

export const filteredItemComments = (userId) => {
    return fetch(`${_apiURL}/filtered/${userId}`)
        .then((res) => res.json());
};

export const getAllItemComments = () => {
    return fetch(_apiURL)
        .then((res) => res.json());
};