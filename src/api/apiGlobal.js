import axios from "axios";

export const apiGlobal = axios.create({
    baseURL: "http://192.168.100.4:8080/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

//Set token to headers to access to protected backend APIs
apiGlobal.interceptors.request.use(function (config) {
    const token = window.sessionStorage.getItem('token');
    config.headers.Authorization = token;
    return config;
});

//Handle error responses to backend APIs
apiGlobal.interceptors.response.use(
    (response) => response,
    (err) => {

        if (!err.response) {
            return Promise.reject({
                status: 999,
                timestamp: new Date(),
                message: "Unexpected error",
                error: 1
            });
        }
        return Promise.reject({
            message: "Error",
            error: err.response.status
        }
        );
    }
);
