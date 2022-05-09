import React, { useEffect, useState } from "react";
import AppRouter from "./router";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setIsLogin(true);
  //     } else {
  //       setIsLogin(false);
  //     }
  //   });
  // });

  return (
    <div>
      <AppRouter isLogin={isLogin} />
    </div>
  );
}

export default App;
