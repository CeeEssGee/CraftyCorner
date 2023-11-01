const _apiURL = "/api/event";

export const getEvents = () => {
    return fetch(_apiURL)
        .then((res) => res.json());
};

export const getEventById = (id) => {
    return fetch(`${_apiURL}/${id}`)
        .then((res) => res.json());
};

export const createEvent = (event) => {
    return fetch(_apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event),
    }).then((res) => res.json());
};

export const deleteEvent = (id) => {
    return fetch(`${_apiURL}/${id}`, {
        method: "DELETE"
    });
};

export const updateEvent = (id, event) => {
    return fetch(`${_apiURL}/${id}/edit`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(event)
    });
};

export const getEventsByUserId = (userId) => {
    return fetch(`${_apiURL}/${userId}/userId`)
        .then((res) => res.json());
};

