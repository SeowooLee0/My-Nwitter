import axios, { AxiosInstance } from "axios";

const instance = axios.create({
  baseURL: "http://localhost:1234/",
  timeout: 1000,
});

instance.interceptors.request.use(
  function (config) {
    // 요청 바로 직전
    // axios 설정값에 대해 작성합니다.
    return config;
  },
  function (error) {
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },

  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
