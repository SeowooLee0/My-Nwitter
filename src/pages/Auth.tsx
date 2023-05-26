import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import { socket } from "../socketio";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { changeState } from "../redux/createSlice/IsLoginSlice";
import customAxios from "../api/CommonAxios";
import "../scss/pages/Auth.scss";
import { changeAccessState } from "../redux/createSlice/GetAccessToken";

const Auth = () => {
  const naviagte = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  // const isLogin = useSelector(
  //   (state: RootState) => state.changeIsLogin.isLogin
  // );

  // const token = useSelector(
  //   (state: RootState) => state.getAccessToken.accessToken
  // );
  const dispatch = useDispatch();

  const onSignIn = (data: any) => {
    customAxios
      .post("/register", {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        alert("회원가입 성공");
      })
      .catch((error: any) => {
        alert("형식을 확인해주세요");
        console.dir(error);
      });
  };

  const onLogin = (data: any) => {
    customAxios
      .post("/login", {
        email: data.email,
        password: data.password,
      })
      .then(async (response) => {
        // dispatch(changeAccessState(response);
        // console.log(token);
        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        //엑세스토큰 -> 쿠키값으로 담기, http-only -> 쿠키값 접근안됨
        console.log(response);
        alert("로그인 성공");
        dispatch(changeState(true));
        socket.emit("login", { email: data.email, socketID: socket.id });
      })

      .catch((error) => {
        // ... 에러 처리
      });
  };

  return (
    <div className="bgauth">
      <div className="flex  items-center">
        <div className="inputBox">
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="loginAuth  "
          >
            <div className="textBox ">
              <div className="w-100">
                {/* <div className="logo">nwitter</div> */}
                <img
                  className=""
                  src="/assets/Nwitter-2.png"
                  alt="Your Company"
                />
                <h2 className=" m-5 mt-7 text-center text-3xl font-bold tracking-tight text-slate-600  ">
                  Sign in to your account
                </h2>
              </div>
            </div>

            <input
              className=" p-6 m-3 mt-7 outline-none border-2 w-full h-10 rounded-2xl "
              {...register("email", {
                required: "이메일은 필수 값입니다.",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                  message: "올바른 이메일 형식으로 작성해주세요",
                },
              })}
              placeholder="EMAIL"
              // name="email"
              // value={email}
              // onChange={onChange}
            />
            <div className="errorMessage">
              {errors.email?.type === "required" &&
                "이메일을 필수 조건으로 입력하시길 바랍니다."}
              {errors.email?.type === "pattern" && errors.email.message}
            </div>
            {/* <div>비밀번호</div> */}
            <input
              className=" outline-none p-6 m-3 mt-8  border-2 w-full h-10  rounded-2xl "
              {...register("password", {
                required: "비밀번호는 필수 값입니다.",
                minLength: {
                  value: 4,
                  message: "비밀번호는 4글자 이상이어야합니다",
                },
              })}
              placeholder="PW"
            />
            <div className="errorMessage">
              {errors.password?.type === "required" &&
                "비밀번호를 필수 조건으로 입력하시길 바랍니다."}
              {errors.password?.type === "minLength" && errors.password.message}
            </div>
            <div className="flex justify-around  p-5">
              <button
                className=" w-40 justify-center rounded-xl border border-transparent bg-slate-600  py-2 px-4 text-sm font-medium text-white hover:bg-pink-600  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit(onSignIn)}
              >
                SignIn
              </button>
              <button
                className=" w-40  rounded-xl border border-transparent  bg-gray-800  py-2 px-4 text-sm font-medium text-white hover:bg-blue-600   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={handleSubmit(onLogin)}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Auth;
