const _apiURL = "/api/userProfile";

export const getUserProfileById = (id) => {
    return fetch(`${_apiURL}/${id}`)
        .then((res) => res.json());
};

export const getProfiles = () => {
    return fetch(_apiURL + "/withroles").then((res) => res.json());
};

export const getProfileAndRoles = (id) => {
    return fetch(`${_apiURL}/withroles/${id}`).then((res) => res.json());
};

export const editProfile = (id, profile) => {
    return fetch(`${_apiURL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
    });
};