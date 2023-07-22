const API_URL = import.meta.env.VITE_API_URL; // Replace with your API base URL
const httpService = {
  get: async (url, auth) => {
    const requestUrl = `${API_URL}/${url}`;
    return fetch(requestUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
    }).then(async (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return response.json();
    });
  },
  post: async (url, data, auth) => {
    const requestUrl = `${API_URL}/${url}`;
    return fetch(requestUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return response.json();
    });
  },

  put: async (url, data, auth) => {
    const requestUrl = `${API_URL}/${url}`;
    return fetch(requestUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(async (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return response.json();
    });
  },
  delete: async (url, auth) => {
    const requestUrl = `${API_URL}/${url}`;
    return fetch(requestUrl, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${auth}` },
    }).then(async (response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return response.json();
    });
  },
};

export default httpService;
