import axios, { AxiosInstance } from "axios";
import { request } from "http";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import router from "../router";
import { changeState } from "../redux/createSlice/IsLoginSlice";
import store, { RootState } from "../redux/store";
import cookie from "react-cookies";
import { useEffect } from "react";

axios.defaults.withCredentials = true;

const customAxios = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
  // headers: {
  //   Authorization: `Bearer ${accessToken}`,
  // },
  // headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 10000,
});

const { dispatch } = store;

customAxios.interceptors.request.use(
  function (config) {
    let accessToken = cookie.load("accessToken");

    if (accessToken) {
      config.headers.common["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;

    // 요청 바로 직전
    // axios 설정값에 대해 작성합니다.
  },
  function (error) {
    console.log(error);
    // 요청 에러 처리를 작성합니다.
    return Promise.reject(error);
  }
);

customAxios.interceptors.response.use(
  function (response) {
    if (
      // 번호값으로 체크, 문자열 체크는 버그가 발생할 , 코드번호부여
      response.data.message === "invalid refresh token, please log in again"
    ) {
      alert("로그인이 만료되었습니다");
      console.log("반응");
      dispatch(changeState(false));
    }

    if (response.status === 200) {
      // console.log("정상");
    }
    if (response.status === 201) {
      window.alert("created");
    }

    return response;
  },

  function (error: any) {
    console.log(error.response.data);

    console.log(error.response.status);

    if (error.response.status === 419) {
      console.log("재발급 필요");
      customAxios.get("/refreshTokenRequest").then((res) => {
        window.alert("엑세스토큰 재발급 완료");
      });
    }

    if (error.response.status === 500) {
      console.log("로그인이 만료되었습니다");
      alert("재로그인 필요");
      dispatch(changeState(false));
      const navigate = useNavigate();
      navigate("/");
    }
    return Promise.reject(error);
  }
);

export default customAxios;
