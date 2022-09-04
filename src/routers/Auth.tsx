import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function Auth() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onSubmit" });

  const onSignIn = (data: any) => {
    axios
      .post(
        "http://localhost:1234/register",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        alert("회원가입 성공");
      })
      .catch((error: any) => {
        alert("형식을 확인해주세요");
        console.dir(error);
      });
  };

  const onLogin = (data: any) => {
    axios
      .post("http://localhost:1234/login", {
        email: data.email,
        password: data.password,
      })
      .then((response) => {
        const { accessToken } = response.data;
        console.log(accessToken);
        // API 요청하는 콜마다 헤더에 accessToken 담아 보내도록 설정
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
        alert("로그인 성공");
        // console.log(Headers);
        window.location.reload();
        // accessToken을 localStorage, cookie 등에 저장하지 않는다!
      })
      .catch((error) => {
        // ... 에러 처리
      });
  };
  console.log(errors);
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="mt-8 space-y-6 "
      >
        <div className="w-full max-w-md space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/assets/twitter.png"
              alt="Your Company"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
        </div>

        <input
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
        <button
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-400 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleSubmit(onSignIn)}
        >
          SignIn
        </button>
        <button
          className="group relative flex w-full justify-center rounded-md border border-transparent  bg-blue-400 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleSubmit(onLogin)}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Auth;
