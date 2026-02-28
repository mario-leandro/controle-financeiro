import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost/development/controle-financeiro-api",
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers["Authorization"] = "Bearer " + token;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        const response = await axios.post(
          `http://localhost/development/controle-financeiro-api/api/refresh/refreshToken.php`,
          { refresh_token: refreshToken },
        );

        const { access_token, refresh_token } = response.data;

        localStorage.setItem("refresh_token", refresh_token);

        api.defaults.headers["Authorization"] = `Bearer ${access_token}`;

        processQueue(null, access_token);

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        localStorage.removeItem("refresh_token");
        window.location.href = "/";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
