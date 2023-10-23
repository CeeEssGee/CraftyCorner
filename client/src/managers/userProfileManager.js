const _apiURL = "/api/userProfile";

export const getUserProfileById = (id) => {
    return fetch(`${_apiURL}/${id}`)
        .then((res) => res.json());
};

