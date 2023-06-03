import axios from "axios";

export const apiGlobal = axios.create({
    baseURL: "http://192.168.100.4:8080/api/",
    headers: {
        "Content-Type": "application/json",
    },
});

// //instancia principal para todas las apis menos las bitacoras
// instance.interceptors.request.use(function (config) {
//     const token = window.sessionStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       ////window.location.href = '/login'
//     }
//     return config;
//   });
  
//   instance.interceptors.response.use(
//     (response) => response,
//     (err) => {
//       //console.log(err)
//       if (!err.response) {
//         // console.log("entra ala error")
//         return Promise.reject({
//           status: 999,
//           timestamp: new Date(),
//           message: "Unexpected error",
//           error: 1
//         });
//       }
  
//       return Promise.reject({
//         message: "Error",
//         error: err.response.status
//       }
//       );
//     }
//   );
  