const _apiURL = "/api/itemComment";

export const getItemComments = () => {
    return fetch(_apiURL)
        .then((res) => res.json());
};