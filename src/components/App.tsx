import axios from "axios";
import React, { useEffect, useState } from "react";
import AppRouter from "./router";

function App() {
  useEffect(() => {
    axios
      .get("http://localhost:1234/refreshTokenRequest")
      .then((res) => {
        const { accessToken } = res.data;
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        setIsLogin(true);
        if (res.data.data === null) {
          setIsLogin(false);
        }
      })
      .catch((error) => {
        // 로그인 페이지로 이동
        // ... 에러 처리
      });
  }, []);

  const [isLogin, setIsLogin] = useState(true);

  return (
    <div>
      <AppRouter isLogin={isLogin} />
    </div>
  );
}

export default App;
