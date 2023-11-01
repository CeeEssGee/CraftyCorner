const _apiURL = "/api/rsvp";

export const getRsvps = () => {
    return fetch(_apiURL)
        .then((res) => res.json());
};

export const getRsvpById = (id) => {
    return fetch(`${_apiURL}/${id}`)
        .then((res) => res.json());
};

export const createRsvp = (rsvp) => {
    return fetch(_apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(rsvp),
    }).then((res) => res.json());
};

export const deleteRsvp = (id) => {
    return fetch(`${_apiURL}/${id}`, {
        method: "DELETE"
    });
};

export const getRsvpsByUserId = (userId) => {
    return fetch(`${_apiURL}/${userId}/userId`)
        .then((res) => res.json());
};

export const getRsvpsByEventId = (eventId) => {
    return fetch(`${_apiURL}/${eventId}/eventId`)
        .then((res) => res.json());
};