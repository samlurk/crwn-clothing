const API_URL = import.meta.env.VITE_API_URL; // Replace with your API base URL
const httpService = {
  get: async (url, params, token) => {
    const queryParams = new URLSearchParams(params).toString();
    const requestUrl = `${API_URL}/${url}${
      queryParams ? `?${queryParams}` : ""
    }`;
    return fetch(requestUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return response.json();
    });
  },
  post: async (url, data) => {
    const requestUrl = `${API_URL}/${url}`;
    return fetch(requestUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return response.json();
    });
  },

  put: async (url, data) => {
    const requestUrl = `${API_URL}/${url}`;
    return fetch(requestUrl, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message);
        });
      }
      return response.json();
    });
  },
  delete: async (url) => {
    const requestUrl = `${API_URL}/${url}`;
    return fetch(requestUrl, { method: "DELETE" }).then((response) => {
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
