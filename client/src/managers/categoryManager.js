const _apiURL = "/api/category";

export const getCategories = () => {
    return fetch(_apiURL)
        .then((res) => res.json());
};

export const getCategoryById = (id) => {
    return fetch(`${_apiURL}/${id}`)
        .then((res) => res.json());
};

export const createCategory = (category) => {
    return fetch(_apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
    }).then((res) => res.json());
};

export const updateCategory = (id, category) => {
    return fetch(`${_apiURL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
    });
};

export const deleteCategory = (id) => {
    return fetch(`${_apiURL}/${id}`, {
        method: "DELETE"
    });
};