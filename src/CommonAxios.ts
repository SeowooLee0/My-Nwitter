import axios, { AxiosInstance } from "axios";
import cookie from "react-cookies";
import { useDispatch, useSelector } from "react-redux";
import router from "./components/router";
import { changeState } from "./redux/createSlice/IsLoginSlice";
import store, { RootState } from "./redux/store";

axios.defaults.withCredentials = true;

let accessToken = cookie.load("accessToken");

console.log(accessToken);
const customAxios = axios.create({
  baseURL: "http://localhost:1234/",
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
  // headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});

console.log(accessToken);
const { dispatch } = store;

customAxios.interceptors.request.use(
  function (config) {
    // 요청 바로 직전
    // axios 설정값에 대해 작성합니다.

    return config;
  },
  function (error) {
    console.log(error);
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  function (response) {
    console.log(response);
    if (
      // 번호값으로 체크, 문자열 체크는 버그가 발생할 , 코드번호부여
      response.data.message === "invalid refresh token, please log in again"
    ) {
      alert("로그인이 만료되었습니다");
      dispatch(changeState(false));
    }

    return response;
  },

  function (error) {
    console.log(error);
    if (error.response.staus === 200) {
      console.log("성공");
    }
    // if (error.data === "login again") {
    //   const dispatch = useDispatch();
    //   alert("로그인이 만료되었습니다");
    //   dispatch(changeState(false));
    // }
    // if (error.data.data === null) {
    //   const dispatch = useDispatch();
    //   alert("로그인이 만료되었습니다");
    //   dispatch(changeState(false));
    // }
    return Promise.reject(error);
  }
);

export default customAxios;
